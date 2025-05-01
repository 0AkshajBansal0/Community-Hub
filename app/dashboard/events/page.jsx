import { redirect } from "next/navigation"
import EventsPage from "@/components/events-page"
import { getSession } from "@/lib/auth"

export default async function Events() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return <EventsPage />
}
