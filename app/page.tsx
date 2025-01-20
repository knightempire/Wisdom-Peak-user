import UserList from "@/components/UserList"
import { getUsers } from "@/lib/api"

export default async function Home() {
  const users = await getUsers()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Directory</h1>
      <UserList initialUsers={users} />
    </main>
  )
}

