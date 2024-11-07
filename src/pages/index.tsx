import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import { useBuyCredits } from "~/hooks/useBuyCredits";

import { Input } from "~/components/Input";
import { FormGroup } from "~/components/FormGroup";
import { Button } from "~/components/Button";
import LandingHero from "~/components/LandingHero";


interface Project {
  id: string;
  name: string;
}

const LandingPage: NextPage = () => {
  const session = useSession();
  const isLoggedIn = !!session.data;

  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState("");

  const getProjects = api.projects.getProjects.useQuery(undefined, {
    enabled: isLoggedIn,
    onSuccess: (data) => {
      setProjects([...data.owned, ...data.member].filter((value, index, self) => self.findIndex(v => v.id === value.id) === index));
    },
    onError: (error) => {
      console.error("Failed to fetch projects", error);
    },
  });

  const createProjectMutation = api.projects.createProject.useMutation({
    onSuccess: (newProject) => {
      setProjects((prevProjects) => [...prevProjects, newProject]);
      setNewProjectName("");
    },
    onError: (error) => {
      console.error("Failed to create project", error);
    },
  });

  const handleCreateProject = () => {
    if (newProjectName.trim() === "") return;
    createProjectMutation.mutate({ name: newProjectName });
  };

  return (
    <>
      <Head>
        <title>Systematic Review App</title>
        <meta name="description" content="Systematic review project management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col justify-center items-center">
        {!isLoggedIn && (
          <LandingHero signIn={signIn}>
            Nothing
          </LandingHero>
        )}
        {isLoggedIn && (
          <>
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl font-bold">Welcome, {session.data?.user?.name}</h1>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  signOut().catch(console.error);
                }}
              >
                LOGOUT
              </button>

              <div className="mt-8 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
                {projects.length === 0 ? (
                  <p className="text-gray-500">No projects available. Create a new project to get started.</p>
                ) : (
                  <ul className="list-disc pl-5">
                    {projects.map((project) => (
                      <li key={project.id} className="mb-2">
                        {project.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 w-full max-w-md">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="New Project Name"
                  className="input input-bordered w-full mb-2"
                />
                <button className="btn btn-accent w-full" onClick={handleCreateProject}>
                  Create New Project
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default LandingPage;