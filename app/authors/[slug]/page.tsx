import { AuthorHero } from "@/components/authors/AuthorHero";
import { AuthorProfileLayout } from "@/components/authors/AuthorProfileLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildAuthorMetadata,
  buildAuthorSchema,
} from "@/lib/authors/author-page";
import { getAuthorBySlug, getAuthorSummaries } from "@/lib/authors/profiles";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAuthorSummaries().map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildAuthorMetadata(slug);
}

export default async function AuthorProfilePage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  return (
    <>
      <JsonLd data={buildAuthorSchema(author)} />
      <AuthorHero author={author} />
      <AuthorProfileLayout author={author} />
    </>
  );
}
