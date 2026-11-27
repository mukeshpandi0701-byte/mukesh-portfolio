/** Verified profile facts and optional publishing destinations. Keep unknown links null. */
export const profile = {
  name: "Mukesh",
  alias: "Mukizzz",
  biography: "Computer Science Engineering student, software developer, and product builder interested in full-stack development, AI, SaaS, and entrepreneurship.",
  education: {
    program: "Computer Science Engineering",
    institution: "Coimbatore Institute of Engineering and Technology",
  },
  experience: [{
    organization: "Invenzo AI Solutions",
    role: "Team member",
    details: "Exact dates, responsibilities, and deliverables are pending confirmation.",
  }],
  technicalSkills: ["Full-stack development", "Applied AI", "Product engineering", "SaaS"],
  projectContributions: {
    classygenz: "Mukesh’s specific role, scope, and deliverables are pending confirmation.",
    resync: "Mukesh’s specific role, scope, and deliverables are pending confirmation.",
    "invenzo-ai": "Exact project responsibilities and deliverables are pending confirmation.",
  },
  contact: {
    email: null as string | null,
    github: null as string | null,
    linkedIn: null as string | null,
    resume: null as string | null,
  },
} as const;

export type ProfileLink = keyof typeof profile.contact;

export function configuredProfileLinks() {
  return Object.entries(profile.contact).filter((entry): entry is [ProfileLink, string] => Boolean(entry[1]));
}
