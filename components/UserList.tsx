"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import type { User } from "@/types"
import Pagination from "./Pagination"

type UserListProps = {
  initialUsers: User[]
}

const USERS_PER_PAGE = 5

export default function UserList({ initialUsers }: UserListProps) {
  const [users] = useState(initialUsers)
  const [search, setSearch] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      })
  }, [users, search, sortOrder])

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
        </button>
      </div>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedUsers.map((user) => (
          <li
            key={user.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <Link href={`/user/${user.id}`} className="block p-6">
              <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">{user.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-1">{user.email}</p>
              <p className="text-gray-500 dark:text-gray-400">{user.address.city}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}

