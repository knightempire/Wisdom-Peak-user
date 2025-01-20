import { getUser } from "@/lib/api"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Mail, Phone, Globe, Briefcase, MapPin } from "lucide-react"

export default async function UserDetail({ params }: { params: { id: string } }) {
  const user = await getUser(params.id)

  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Home
      </Link>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-semibold mb-6 text-gray-800 dark:text-white">{user.name}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="h-5 w-5 mr-3 text-blue-500" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone className="h-5 w-5 mr-3 text-green-500" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
  <Globe className="h-5 w-5 mr-3 text-purple-500" />
  <a
    href={`http://${user.website}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
  >
    {user.website}
  </a>
</div>

            </div>
            <div className="space-y-6">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Briefcase className="h-5 w-5 mr-3 text-yellow-500" />
                <span>{user.company.name}</span>
              </div>
              <div className="flex items-start text-gray-600 dark:text-gray-300">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-red-500" />
                <div>
                  <p>{user.address.street}, {user.address.suite}</p>
                  <p>{user.address.city}, {user.address.zipcode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
