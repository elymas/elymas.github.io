import type { Project, ProjectType } from '../types/project';

/**
 * Central registry that maps a project `type` string to presentation.
 * Unknown types resolve to the generic fallback, so adding a new project
 * with a brand-new type never breaks the build — it just renders with
 * neutral styling until it is registered here.
 */

export type TypeIconName =
  | 'app'
  | 'blog'
  | 'docs'
  | 'landing'
  | 'game'
  | 'tutorial'
  | 'portfolio'
  | 'generic';

export interface TypeMeta {
  label: string;
  icon: TypeIconName;
}

/** 24×24 stroke-icon inner SVG (lucide-style, stroke set by the renderer). */
export const typeIcons: Record<TypeIconName, string> = {
  app: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  blog: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  docs: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  landing: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
  game:
    '<line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>',
  tutorial: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>',
  portfolio:
    '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
  generic:
    '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
};

/** Icon for the "All" filter chip. */
export const allIcon = '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2L7 14.2 2 9.3l6.9-1z"/>';

const registry: Record<string, TypeMeta> = {
  app: { label: 'App', icon: 'app' },
  blog: { label: 'Blog', icon: 'blog' },
  docs: { label: 'Docs', icon: 'docs' },
  landing: { label: 'Landing', icon: 'landing' },
  game: { label: 'Game', icon: 'game' },
  tutorial: { label: 'Tutorial', icon: 'tutorial' },
  portfolio: { label: 'Portfolio', icon: 'portfolio' },
};

const fallback: TypeMeta = { label: 'Project', icon: 'generic' };

export function getTypeMeta(type: ProjectType): TypeMeta {
  return registry[type?.toLowerCase?.() ?? ''] ?? { ...fallback, label: humanizeType(type) };
}

export function humanizeType(type: ProjectType): string {
  if (!type) return 'Project';
  return String(type)
    .split(/[-_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

/** Stable type list with counts, ordered by first appearance in the data. */
export function getTypeStats(projects: Project[]): Array<{ type: string; meta: TypeMeta; count: number }> {
  const order: string[] = [];
  const counts = new Map<string, number>();
  for (const p of projects) {
    const t = String(p.type ?? '').toLowerCase() || 'other';
    if (!counts.has(t)) order.push(t);
    counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return order.map((t) => ({
    type: t,
    meta: registry[t] ?? { ...fallback, label: humanizeType(t) },
    count: counts.get(t) ?? 0,
  }));
}

/** True when the primary URL points at a repository rather than a live site. */
export function isRepositoryUrl(url: string): boolean {
  try {
    return new URL(url).hostname === 'github.com';
  } catch {
    return false;
  }
}
