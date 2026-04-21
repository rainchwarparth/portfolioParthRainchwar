import { Metadata } from "next";
import { notFound } from "next/navigation";
import { builderProjects, getBuilderProject } from "@/data";
import ProjectDetailLayout from "@/components/portfolio/ProjectDetailLayout";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { navLinks } from "@/lib/navLinks";

// Revalidate every 1 hour in dev, cache aggressively
export const revalidate = 3600;

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return builderProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getBuilderProject(resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The project you're looking for doesn't exist.",
    };
  }

  return {
    title: `${project.title} | Builder Project`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} | Technical Project`,
      description: project.tagline,
      type: "article",
      url: `https://parthrainchwar.vercel.app/project/${resolvedParams.slug}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.tagline,
      images: ["/og-image.png"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getBuilderProject(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar links={navLinks} />
      <ProjectDetailLayout project={project} />
      <Footer />
    </>
  );
}
