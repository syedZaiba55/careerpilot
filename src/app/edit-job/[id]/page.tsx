"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/lib/supabase";

type JobApplication = {
  company: string;
  role: string;
  status: string;
  notes?: string;
};

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");

  const fetchJob = async () => {
    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
    } else if (data) {
      const job = data as JobApplication;

      setCompany(job.company);
      setRole(job.role);
      setStatus(job.status);
      setNotes(job.notes || "");
    }
  };

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id]);

  const updateJob = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const { error } = await supabase
      .from("job_applications")
      .update({
        company,
        role,
        status,
        notes,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      alert("Application updated successfully 🚀");
      router.push("/applications");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 p-8">

        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            Edit Job Application ✏️
          </h1>

          <form
            onSubmit={updateJob}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-3 border rounded-lg text-gray-800"
            />

            <input
              type="text"
              placeholder="Job Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-lg text-gray-800"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border rounded-lg text-gray-800"
            >
              <option value="Applied">
                Applied
              </option>

              <option value="Interview">
                Interview
              </option>

              <option value="Selected">
                Selected
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>


            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border rounded-lg text-gray-800"
              rows={4}
            />


            <button
              type="submit"
              className="
                w-full
                bg-blue-600
                text-white
                p-3
                rounded-lg
                hover:bg-blue-700
                transition
              "
            >
              Update Application
            </button>

          </form>

        </div>

      </main>
    </>
  );
}