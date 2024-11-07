import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";


export const projectsRouter = createTRPCRouter({
  getProjects: protectedProcedure.query(async ({ ctx, input }) => {
    // ctx is a context object, and it has the
    //  prisma model and the session on it
    // The prisma model is what you can do to query
    //  in the right stuff to the database
    // You can use the session to do things like get
    //  the real user id
    // Note: session is undefined with publicProcedure

    // Type check to ensure session and user are present
    if (!ctx.session?.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    try {
      // Fetch projects where the current user is either the owner or a member
      const ownedProjects = await ctx.prisma.project.findMany({
        where: {
          ownerId: ctx.session.user.id
        },
      });
      const memberProjects = await ctx.prisma.project.findMany({
        where: {
          members: {
            some: {
              id: ctx.session.user.id
            }
          }
        }
      });

      return {
        owned: ownedProjects,
        member: memberProjects,
      };
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch projects" });
    }
  }),


  createProject: protectedProcedure.input(
    z.object({
      name: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    // Type check to ensure session and user are present
    if (!ctx.session?.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const userId = ctx.session.user.id;

    try {
      // Create a new project with the provided name and set the current user as the owner
      const newProject = await ctx.prisma.project.create({
        data: {
          name: input.name,
          ownerId: userId,
          members: {
            connect: { id: userId }, // Add the owner as an initial member
          },
        },
      });

      return newProject;
    } catch (error) {
      console.error("Failed to create project:", error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create project" });
    }
  }),
});
