import { AnswerHero } from "@/components/answers/AnswerHero";
import { AnswerPageLayout } from "@/components/answers/AnswerPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildAnswerMetadata, buildAnswerSchema } from "@/lib/answers/answer-page";
import { answerArticles, getAnswerBySlug } from "@/lib/answers/registry";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return answerArticles.map((answer) => ({ slug: answer.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildAnswerMetadata(slug);
}

export default async function AnswerSlugPage({ params }: Props) {
  const { slug } = await params;
  const answer = getAnswerBySlug(slug);
  if (!answer) notFound();

  return (
    <>
      <JsonLd data={buildAnswerSchema(answer)} />
      <AnswerHero
        title={answer.title}
        description={answer.description}
        pillar={answer.pillar}
        subtopic={answer.subtopic}
        lastReviewed={answer.lastReviewed}
        authorSlug={answer.authorSlug}
      />
      <AnswerPageLayout answer={answer} />
    </>
  );
}
