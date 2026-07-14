"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Building2,
  Briefcase,
  CalendarDays,
  Pencil,
  Trash2,
} from "lucide-react";

type JobCardProps = {
  id: string;
  company: string;
  role: string;
  status: string;
  date?: string;
};

export default function JobCard({
  id,
  company,
  role,
  status,
  date,
}: JobCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this job application?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("job_applications")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      alert("Job deleted successfully 🗑️");
      window.location.reload();
    }
  };

  const statusColor =
    status === "Applied"
      ? "bg-blue-500"
      : status === "Interview"
      ? "bg-yellow-500"
      : status === "Selected"
      ? "bg-green-500"
      : "bg-red-500";

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100">
      {/* Company */}
      <div className="flex items-center gap-2 mb-3">
        <Building2 className="text-blue-600" size={22} />
        <h2 className="text-2xl font-bold text-gray-800">{company}</h2>
      </div>

      {/* Role */}
      <div className="flex items-center gap-2 text-gray-600 mb-4">
        <Briefcase size={18} />
        <p>{role}</p>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-semibold text-gray-700">Status:</span>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${statusColor}`}
        >
          {status}
        </span>
      </div>

      {/* Date */}
      {date && (
        <div className="flex items-center gap-2 text-gray-500 mb-5">
          <CalendarDays size={18} />
          <span>Applied: {date}</span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => router.push(`/edit-job/${id}`)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        >
          <Pencil size={18} />
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  );
}