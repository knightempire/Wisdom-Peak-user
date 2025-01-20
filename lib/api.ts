import type { User } from "@/types"

const API_URL = "https://jsonplaceholder.typicode.com/users"

export async function getUsers(): Promise<User[]> {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("Failed to fetch users")
  return res.json()
}

export async function getUser(id: string): Promise<User | null> {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) return null
  return res.json()
}

