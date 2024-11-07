import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { OpenAI } from "openai";
import AWS from "aws-sdk";

import { Icon } from '@prisma/client'

import { env } from "~/env.mjs";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY
  },
  region: "us-east-2"
})

const BUCKET_NAME = "prediction-model-checklists";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY
});

async function generateIcon(prompt: string): Promise<string | undefined> {

  if (env.MOCK_OPENAI === "true") {
    return "hello";
  } else {

    const image = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json"
    });
    return image.data[0]?.b64_json;
  }
}

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure.input(
    z.object({
      prompt: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    // ctx is a context object, and it has the
    //  prisma model and the session on it
    // The prisma model is what you can do to query
    //  in the right stuff to the database
    // You can use the session to do things like get
    //  the real user id
    // Note: session is undefined with publicProcedure

    // TODO: Verify user has enough credits
    const { count } = await ctx.prisma.user.updateMany({
      where: {
        id: ctx.session.user.id,
        credits: {
          gte: 1
        }
      },
      data: {
        credits: {
          decrement: 1
        }
      }
    });

    if (count <= 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You do not have enough credits."
      });
    }

    const base64EncodedImage = await generateIcon(input.prompt);
    const icon = await ctx.prisma.icon.create({
      data: {
        prompt: input.prompt,
        userId: ctx.session.user.id
      }
    });

    // TODO: Save the images to the S3 bucket
    await s3.putObject({
      Bucket: BUCKET_NAME,
      Body: Buffer.from(base64EncodedImage!, "base64"),
      Key: icon.id, // TODO: Generate a random id
      ContentEncoding: "base64",
      ContentType: "image/png"
    }).promise();
    // We are .promise()-ing so that we can await for this thing
    //  to be stored before we return the image back to the user

    return {
      imageURL: `https://${BUCKET_NAME}.s3.amazonaws.com/${icon.id}`
    };
  })
});
