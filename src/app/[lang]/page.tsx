import { notFound } from "next/navigation";
import { isLang } from "@/data/portfolio";
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

    return (
        <>
            <Navbar lang={lang} />
            <main id="top">
                <HeroSection lang={lang} />
                <TechStrip lang={lang} />
                <ServicesSection lang={lang} />
                <AboutBanner lang={lang} />
                <ExperienceSection lang={lang} />
                <ProjectsSection lang={lang} />
                <SkillsSection lang={lang} />
                <ContactSection lang={lang} />
            </main>
            <Footer lang={lang} />
            <RevealObserver />
        </>
    );
}
