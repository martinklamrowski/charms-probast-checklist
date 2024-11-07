// components/CreateProjectModal.tsx
import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { Project } from "@prisma/client";

import { useProject } from "~/contexts/ProjectContext";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose
}) => {
  const { handleCreateProject } = useProject();
  const session = useSession();
  const isLoggedIn = !!session.data;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAtDate, setCreatedAtDate] = useState("");
  const [charms, setCharms] = useState(false);
  const [probast, setProbast] = useState(false);
  const [tripod, setTripod] = useState(false);
  const [memberEmails, setMemberEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");

  const addEmail = () => {
    if (emailInput && !memberEmails.includes(emailInput)) {
      setMemberEmails([...memberEmails, emailInput]);
      setEmailInput(""); // Clear input field
    }
  };

  const handleSubmit = () => {
    if (session.data?.user.id) {
      handleCreateProject({
        name: name,
        description: description,
        createdAt: new Date(),
        charms: charms,
        probast: probast,
        tripod: tripod,
        memberEmails: memberEmails
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-lg font-bold mb-4">Create New Project</h3>
        <label className="label">Project Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full mb-4"
          placeholder="Enter project name"
        />

        <label className="label">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full mb-4"
          placeholder="Enter project description"
        />

        <label className="label">Due Date</label>
        <input
          type="date"
          value={createdAtDate}
          onChange={(e) => setCreatedAtDate(e.target.value)}
          className="input input-bordered w-full mb-4"
        />

        <label className="label cursor-pointer">
          <input
            type="checkbox"
            checked={charms}
            onChange={(e) => setCharms(e.target.checked)}
            className="checkbox mr-2"
          />
          Charms
        </label>

        <label className="label cursor-pointer">
          <input
            type="checkbox"
            checked={probast}
            onChange={(e) => setProbast(e.target.checked)}
            className="checkbox mr-2"
          />
          Probast
        </label>

        <label className="label cursor-pointer">
          <input
            type="checkbox"
            checked={tripod}
            onChange={(e) => setTripod(e.target.checked)}
            className="checkbox mr-2"
          />
          Tripod
        </label>

        <label className="label">Add Members by Email</label>
        <div className="flex space-x-2 mb-4">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter member's email"
          />
          <button type="button" onClick={addEmail} className="btn btn-primary">
            Add
          </button>
        </div>

        <ul className="list-disc pl-5 mb-4">
          {memberEmails.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>

        <div className="modal-action">
          <button onClick={onClose} className="btn btn-secondary">Cancel</button>
          <button onClick={handleSubmit} className="btn btn-primary">Create Project</button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
