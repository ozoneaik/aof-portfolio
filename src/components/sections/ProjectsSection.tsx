import { ui, type Lang } from "@/data/portfolio";
import type { ProjectView } from "@/lib/projects";
import { SectionHead } from "@/components/ui/Decor";
import { ProjectsGrid } from "@/components/ui/ProjectsGrid";

// ข้อมูลผลงานมาจาก database (page.tsx ดึงด้วย getProjects แล้วส่งมา) และแปลเป็นภาษาปัจจุบันแล้ว
export function ProjectsSection({ lang, projects }: { lang: Lang; projects: ProjectView[] }) {
    const t = (v: Record<Lang, string>) => v[lang];

    return (
        <section
            id="projects"
            className="scroll-mt-20 bg-gradient-to-b from-white via-blue-50 to-white py-24 dark:from-ink dark:via-blue-950/30 dark:to-ink"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <SectionHead eyebrow={t(ui.nav.projects)} title={t(ui.projectsTitle)} />
                <ProjectsGrid
                    items={projects}
                    labels={{
                        all: t(ui.filterAll),
                        work: t(ui.filterWork),
                        personal: t(ui.filterPersonal),
                        featured: t(ui.featured),
                        viewDetails: t(ui.viewDetails),
                        close: t(ui.close),
                        role: t(ui.projectRole),
                        impact: t(ui.projectImpact),
                        stack: t(ui.projectStack),
                        screenshots: t(ui.screenshots),
                        prevImage: t(ui.prevImage),
                        nextImage: t(ui.nextImage),
                        viewCode: t(ui.viewCode),
                        visitWebsite: t(ui.visitWebsite),
                    }}
                />
            </div>
        </section>
    );
}
