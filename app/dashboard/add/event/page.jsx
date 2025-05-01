import { redirect } from "next/navigation"
import AddEventForm from "@/components/add-event-form"
import { getSession } from "@/lib/auth"

export default async function AddEvent() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Post a New Event</h1>
      <AddEventForm />
    </div>
  )
}
