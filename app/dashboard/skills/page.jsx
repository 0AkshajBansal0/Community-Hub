import { redirect } from "next/navigation"
import SkillsPage from "@/components/skills-page"
import { getSession } from "@/lib/auth"

export default async function Skills() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return <SkillsPage />
}
