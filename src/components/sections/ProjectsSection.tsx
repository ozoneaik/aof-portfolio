import { projects, ui, type Lang } from "@/data/portfolio";
import { SectionHead } from "@/components/ui/Decor";
import { ProjectsGrid, type ProjectView } from "@/components/ui/ProjectsGrid";

export function ProjectsSection({ lang }: { lang: Lang }) {
    const t = (v: Record<Lang, string>) => v[lang];

    // แปลงข้อมูลโปรเจกต์เป็นภาษาปัจจุบันก่อนส่งให้ฝั่ง client
    const items: ProjectView[] = projects.map((p) => ({
        slug: p.slug,
        category: p.category,
        featured: Boolean(p.featured),
        title: t(p.title),
        desc: t(p.desc),
        details: p.details && t(p.details),
        role: p.role && t(p.role),
        impact: (p.impact ?? []).map(t),
        tags: p.tags,
        image: p.image,
    }));

    return (
        <section
            id="projects"
            className="scroll-mt-20 bg-gradient-to-b from-white via-blue-50 to-white py-24 dark:from-ink dark:via-blue-950/30 dark:to-ink"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <SectionHead eyebrow={t(ui.nav.projects)} title={t(ui.projectsTitle)} />
                <ProjectsGrid
                    items={items}
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
                    }}
                />
            </div>
        </section>
    );
}
