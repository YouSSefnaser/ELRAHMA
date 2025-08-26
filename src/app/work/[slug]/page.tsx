import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyHero } from '@/components/work/case-study-hero';
import { CaseStudyContent } from '@/components/work/case-study-content';
import { CaseStudyGallery } from '@/components/work/case-study-gallery';
import { RelatedProjects } from '@/components/work/related-projects';

import { projects } from '@/data/portfolio';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = projects[params.slug as keyof typeof projects];
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | El Rahama Photography`,
    description: project.objective,
    keywords: [...project.tags, 'Dubai photography', 'luxury photography'],
    openGraph: {
      title: project.title,
      description: project.objective,
      images: [project.image],
    },
  };
}

export default function WorkDetailPage({ params }: PageProps) {
  const project = projects[params.slug as keyof typeof projects];

  if (!project) {
    notFound();
  }

  return (
    <>
      <CaseStudyHero project={project} />
      <CaseStudyContent project={project} />
      <CaseStudyGallery project={project} />
      <RelatedProjects currentProject={project} />
    </>
  );
}
