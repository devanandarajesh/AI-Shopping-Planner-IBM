import type { PlannerInput } from './types';
import type { ScoredProduct } from './recommendationEngine';

export function explainRecommendation(
  scored: ScoredProduct,
  input: PlannerInput,
): string {
  const { product, reasons } = scored;
  const parts: string[] = [];

  parts.push(
    `This product is recommended because`,
  );

  const reasonList = reasons.length > 0 ? reasons : ['it best matches your criteria'];

  if (reasonList.length === 1) {
    parts.push(`${reasonList[0]}.`);
  } else {
    parts.push(
      `${reasonList.slice(0, -1).join(', ')}, and ${reasonList[reasonList.length - 1]}.`,
    );
  }

  const preference = input.preference ?? '';
  if (preference && preference !== 'Eco-Friendly') {
    parts.push(
      ` It aligns with your "${preference}" preference.`,
    );
  }

  parts.push(
    ` At $${product.price} with a ${product.rating}★ rating, it offers a strong overall match for what you're looking for.`,
  );

  return parts.join('');
}

export function matchScore(scored: ScoredProduct, maxScore: number): number {
  if (maxScore <= 0) return 80;
  const ratio = scored.score / maxScore;
  return Math.round(Math.min(99, Math.max(70, 70 + ratio * 29)));
}
