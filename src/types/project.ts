export type ProjectType = 'blog' | 'docs' | 'landing' | 'app' | 'tutorial' | 'portfolio';

export type ProjectStatus = 'active' | 'coming-soon' | 'archived';

export interface Project {
  name: string;
  description: string;
  url: string;
  type: ProjectType;
  techStack: string[];
  thumbnail?: string;
  featured?: boolean;
  status?: ProjectStatus;
}
