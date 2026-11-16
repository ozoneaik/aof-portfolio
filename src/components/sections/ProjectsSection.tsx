import { ui, type Lang } from "@/data/portfolio";
import type { ProjectView } from "@/lib/projects";
import { ProjectsPanel } from "@/components/ui/ProjectsPanel";

// แผงผลงานสีน้ำเงินที่ "ซ้อน" ขอบล่างของ Hero (-mt-32) แบบแผงข่าวของเว็บเกม
// ข้อมูลผลงานมาจาก database (page.tsx ดึงด้วย getProjects แล้วส่งมา) และแปลเป็นภาษาปัจจุบันแล้ว
export function ProjectsSection({ lang, projects }: { lang: Lang; projects: ProjectView[] }) {
    const t = (v: Record<Lang, string>) => v[lang];

    return (
        <section id="projects" className="relative z-10 -mt-32 scroll-mt-24 px-5 sm:px-6">
            <div className="reveal mx-auto max-w-6xl">
                <ProjectsPanel
                    items={projects}
                    labels={{
                        heading: t(ui.featuredProjects),
                        subheading: t(ui.projectsTitle),
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
                        confidential: t(ui.confidentialNote),
                    }}
                />
            </div>
        </section>
    );
}
