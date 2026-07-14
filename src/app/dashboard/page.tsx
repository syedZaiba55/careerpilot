"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import JobCard from "@/components/dashboard/JobCard";
import StatusChart from "@/components/dashboard/StatusChart";
import { supabase } from "@/lib/supabase";
import {
  Briefcase,
  Send,
  CalendarCheck,
  BadgeCheck,
  XCircle,
} from "lucide-react";

type JobApplication = {
  id: string;
  company: string;
  role: string;
  status: string;
  applied_date?: string;
  created_at?: string;
};

export default function Dashboard() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

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

    setLoading(false);
  };

  const totalApplications = applications.length;

  const applied = applications.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviews = applications.filter(
    (job) => job.status === "Interview"
  ).length;

  const offers = applications.filter(
    (job) => job.status === "Selected"
  ).length;

  const rejected = applications.filter(
    (job) => job.status === "Rejected"
  ).length;

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen flex items-center justify-center bg-slate-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>

            <p className="mt-6 text-xl font-semibold text-blue-600">
              Loading Dashboard...
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 p-8">

        <h1 className="text-4xl font-bold text-blue-600">
          CareerPilot Dashboard 🚀
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome! Track all your job applications in one place.
        </p>


        {/* Statistics Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-gray-500 font-medium">
                Applications
              </h2>

              <p className="text-4xl font-bold text-blue-600 mt-2">
                {totalApplications}
              </p>
            </div>

            <Briefcase size={40} className="text-blue-600" />
          </div>


          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-gray-500 font-medium">
                Applied
              </h2>

              <p className="text-4xl font-bold text-indigo-600 mt-2">
                {applied}
              </p>
            </div>

            <Send size={40} className="text-indigo-600" />
          </div>


          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-gray-500 font-medium">
                Interviews
              </h2>

              <p className="text-4xl font-bold text-yellow-500 mt-2">
                {interviews}
              </p>
            </div>

            <CalendarCheck size={40} className="text-yellow-500" />
          </div>


          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-gray-500 font-medium">
                Offers
              </h2>

              <p className="text-4xl font-bold text-green-600 mt-2">
                {offers}
              </p>
            </div>

            <BadgeCheck size={40} className="text-green-600" />
          </div>


          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-gray-500 font-medium">
                Rejected
              </h2>

              <p className="text-4xl font-bold text-red-600 mt-2">
                {rejected}
              </p>
            </div>

            <XCircle size={40} className="text-red-600" />
          </div>

        </div>


        {/* Chart */}

        <StatusChart
          applied={applied}
          interview={interviews}
          selected={offers}
          rejected={rejected}
        />


        {/* Recent Applications */}

        <div className="bg-white rounded-xl shadow-lg mt-10 p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Recent Applications
          </h2>


          {applications.length === 0 ? (

            <div className="text-center py-16">

              <div className="text-6xl mb-4">
                📂
              </div>

              <h3 className="text-2xl font-bold text-gray-700">
                No applications yet
              </h3>

              <p className="text-gray-500 mt-2">
                Click <strong>Add Job</strong> to begin tracking your applications.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {applications.map((job) => (

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

          )}

        </div>

      </main>
    </>
  );
}