export type ProjectType = string;

export type ProjectStatus = 'active' | 'coming-soon' | 'archived';

/** Known project types — anything else falls back to generic styling. */
export const KNOWN_PROJECT_TYPES = [
  'app',
  'blog',
  'docs',
  'landing',
  'game',
  'tutorial',
  'portfolio',
] as const;

export interface Project {
  name: string;
  description: string;
  /** Primary link — live site or repository. */
  url: string;
  type: ProjectType;
  techStack: string[];
  /** Optional source repository, shown as a secondary link when present. */
  repository?: string;
  /** Optional free-form tags, included in search. */
  tags?: string[];
  status?: ProjectStatus;
}
