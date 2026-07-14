import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data, error } = await supabase
    .from("job_applications")
    .select("*");

  if (error) {
    console.error("Supabase Error:", error);
  } else {
    console.log("Job Applications:", data);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
        <h1 className="text-5xl font-bold text-blue-600">
          CareerPilot 🚀
        </h1>

        <p className="mt-4 text-xl text-gray-700">
          Supabase Connected Successfully
        </p>
      </main>
    </>
  );
}