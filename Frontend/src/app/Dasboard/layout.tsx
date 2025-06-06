"use client";
import Link from "next/link";
import { PlusCircle, MinusCircle, LayoutDashboard } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <div className="text-2xl font-bold text-green-700 mb-10">
          🍃 Chiya Batauli
        </div>
        <nav className="space-y-4">
          {/* Dashboard */}
          <Link
            href="/Dasboard"
            className="flex items-center gap-2 px-4 py-3 rounded-md text-white bg-gray-600 hover:bg-gray-700 transition"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>

          {/* Add Tea */}
          <Link
            href="/Dasboard/createItems"
            className="flex items-center gap-2 px-4 py-3 rounded-md text-white bg-green-600 hover:bg-green-700 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Add Items
          </Link>

          <Link
            href="/admin/remove-product"
            className="flex items-center gap-2 px-4 py-3 rounded-md text-white bg-red-500 hover:bg-red-600 transition"
          >
            <MinusCircle className="w-5 h-5" />
            Manage Items
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
