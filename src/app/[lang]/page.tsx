import { notFound } from "next/navigation";
import { isLang } from "@/data/portfolio";
import { getProjects } from "@/lib/projects";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechStrip } from "@/components/sections/TechStrip";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutBanner } from "@/components/sections/AboutBanner";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { RevealObserver } from "@/components/ui/RevealObserver";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    if (!isLang(lang)) notFound();

    // ดึงผลงานจาก database (มี cache 1 ชั่วโมง) แล้วส่งต่อให้ทุก section ที่ใช้
    const projects = await getProjects(lang);

    return (
        <>
            <Navbar lang={lang} />
            <main id="top">
                <HeroSection lang={lang} projects={projects} />
                <TechStrip lang={lang} />
                <ServicesSection lang={lang} />
                <AboutBanner lang={lang} projectCount={projects.length} />
                <ExperienceSection lang={lang} />
                <ProjectsSection lang={lang} projects={projects} />
                <SkillsSection lang={lang} />
                <ContactSection lang={lang} />
            </main>
            <Footer lang={lang} />
            <RevealObserver />
        </>
    );
}
