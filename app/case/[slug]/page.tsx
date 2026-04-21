import { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/data";
import CaseStudyLayout from "@/components/portfolio/CaseStudyLayout";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { navLinks } from "@/lib/navLinks";

// Revalidate every 1 hour in dev, cache aggressively
export const revalidate = 3600;

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const study = getCaseStudy(resolvedParams.slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
      description: "The case study you're looking for doesn't exist.",
    };
  }

  return {
    title: `${study.title} | Case Study`,
    description: study.summary,
    openGraph: {
      title: `${study.title} | Research Case Study`,
      description: study.summary,
      type: "article",
      url: `https://parthrainchwar.vercel.app/case/${resolvedParams.slug}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.summary,
      images: ["/og-image.png"],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const resolvedParams = await params;
  const idx = caseStudies.findIndex((cs) => cs.slug === resolvedParams.slug);
  const study = getCaseStudy(resolvedParams.slug);

  if (!study) {
    notFound();
  }

  const next = caseStudies[idx + 1] ?? null;
  const prev = caseStudies[idx - 1] ?? null;
  const spawnedChildren = caseStudies.filter(
    (cs) => cs.spawnedFrom?.slug === study.slug
  );

  return (
    <>
      <Navbar links={navLinks} />
      <CaseStudyLayout
        study={study}
        prev={prev}
        next={next}
        spawnedChildren={spawnedChildren}
      />
      <Footer />
    </>
  );
}
