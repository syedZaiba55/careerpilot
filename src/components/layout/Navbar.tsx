import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-lg border-b border-blue-500">
      <div className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          {/* Logo */}
          <h1 className="text-2xl font-bold tracking-wide text-center md:text-left">
            CareerPilot 🚀
          </h1>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 font-medium">

            <Link
              href="/"
              className="transition-colors duration-300 hover:text-blue-200"
            >
              Home
            </Link>

            <Link
              href="/signup"
              className="transition-colors duration-300 hover:text-blue-200"
            >
              Sign Up
            </Link>

            <Link
              href="/login"
              className="transition-colors duration-300 hover:text-blue-200"
            >
              Login
            </Link>

            <Link
              href="/dashboard"
              className="transition-colors duration-300 hover:text-blue-200"
            >
              Dashboard
            </Link>

            <Link
              href="/add-job"
              className="transition-colors duration-300 hover:text-blue-200"
            >
              Add Job
            </Link>

            <Link
              href="/jobs"
              className="transition-colors duration-300 hover:text-blue-200"
            >
              Jobs
            </Link>

          </div>

        </div>

      </div>
    </nav>
  );
}