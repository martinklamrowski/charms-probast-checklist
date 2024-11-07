import Link from "next/link";
import React, { ReactNode } from "react";


interface UserOverviewProps {
  children: ReactNode;
}

const UserOverview: React.FC<UserOverviewProps> = ({
  children,
}) => {


  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Systematic Review Data Extraction Tool</h1>
          <p className="py-6">
            Hello. This is a prototype of a systematic review data extraction tool, specifically geared towards summarizing study characteristics and predictive modeling checklist compliance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserOverviewProps;