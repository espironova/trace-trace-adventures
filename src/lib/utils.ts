import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Fills a carousel with `targetCount` images, cycling `unique` after unique shots are used. */
export function repeatAfterUnique(unique: string[], targetCount: number): string[] {
  if (unique.length === 0 || targetCount <= 0) return [];
  if (unique.length >= targetCount) return unique.slice(0, targetCount);
  const out = [...unique];
  for (let i = unique.length; i < targetCount; i++) {
    out.push(unique[i % unique.length]);
  }
  return out;
}
