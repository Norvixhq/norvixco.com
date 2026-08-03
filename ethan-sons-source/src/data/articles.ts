import type { Article } from './types';
import { troubleshootingArticles } from './article-content/troubleshooting';
import { upgradeArticles } from './article-content/upgrades';

export const articles: Article[] = [...troubleshootingArticles, ...upgradeArticles].sort(
  (a, b) => (a.published < b.published ? 1 : -1),
);

export const articlesBySlug = Object.fromEntries(articles.map((a) => [a.slug, a])) as Record<
  string,
  Article | undefined
>;

export function getArticle(slug: string) {
  return articlesBySlug[slug];
}

export const articleTopics = Array.from(new Set(articles.map((a) => a.topic))).sort();

export function articlesInTopic(topic: string) {
  return articles.filter((a) => a.topic === topic);
}

export function relatedArticlesFor(slugs: string[]) {
  return slugs.map((s) => articlesBySlug[s]).filter((a): a is Article => Boolean(a));
}

export type { Article };
