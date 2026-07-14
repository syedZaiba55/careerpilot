"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import JobCard from "@/components/dashboard/JobCard";
import { supabase } from "@/lib/supabase";

type JobApplication = {
  id: string;
  company: string;
  role: string;
  status: string;
  applied_date?: string;
  created_at?: string;
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setApplications(data || []);
    }
  };

  const filteredApplications = applications.filter((job) => {
    const matchesSearch =
      job.company?.toLowerCase().includes(search.toLowerCase()) ||
      job.role?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 p-8">

        <h1 className="text-4xl font-bold text-blue-600">
          All Applications 📋
        </h1>

        <p className="mt-2 text-gray-600">
          Manage all your job applications here.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-8">

          <input
            type="text"
            placeholder="Search company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 rounded-lg border bg-white text-gray-800"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-3 rounded-lg border bg-white text-gray-800"
          >
            <option value="All">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>

        </div>

        <div className="mt-8 space-y-4">

          {filteredApplications.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              company={job.company}
              role={job.role}
              status={job.status}
              date={job.applied_date}
            />
          ))}

        </div>

      </main>
    </>
  );
}