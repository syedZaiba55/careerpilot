import { supabase } from "@/lib/supabase";

type JobApplication = {
  id: string;
  company: string;
  role?: string;
  position?: string;
  location?: string;
  status: string;
  applied_date?: string;
  created_at?: string;
};

export default async function JobsPage() {
  const { data: jobs, error } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-xl">
          Error: {error.message}
        </p>
      </main>
    );
  }

  const applications: JobApplication[] = jobs || [];

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        My Job Applications
      </h1>

      {applications.length === 0 ? (

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <p className="text-gray-600">
            No job applications found.
          </p>
        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">

            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Applied Date</th>
              </tr>
            </thead>

            <tbody>

              {applications.map((job) => (

                <tr key={job.id} className="border-b">

                  <td className="p-4">
                    {job.company}
                  </td>

                  <td className="p-4">
                    {job.role || job.position || "-"}
                  </td>

                  <td className="p-4">
                    {job.location || "-"}
                  </td>

                  <td className="p-4">
                    {job.status}
                  </td>

                  <td className="p-4">
                    {job.applied_date || "-"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </main>
  );
}