export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold">CareerPilot 🚀</h1>

        <div className="space-x-6">
          <button className="hover:text-gray-200">Home</button>
          <button className="hover:text-gray-200">Dashboard</button>
          <button className="hover:text-gray-200">Login</button>
        </div>
      </div>
    </nav>
  );
}