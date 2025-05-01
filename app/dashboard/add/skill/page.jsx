import { redirect } from "next/navigation"
import AddSkillForm from "@/components/add-skill-form"
import { getSession } from "@/lib/auth"

export default async function AddSkill() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Share Your Skill</h1>
      <AddSkillForm />
    </div>
  )
}
