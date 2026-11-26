import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import "./cinematic.css";
import "./experience-assets.css";
export const metadata: Metadata = { title: "Mukesh — Software Engineer & Product Thinker", description: "A cinematic portfolio by Mukesh: software developer, product builder, CSE student, and Invenzo AI Solutions team member." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body><ThemeProvider>{children}</ThemeProvider></body></html>; }
