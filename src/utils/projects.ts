import type { Project, ProjectType, ProjectStatus } from '../types/project';
import projectData from '../data/projects.json';

export function getAllProjects(): Project[] {
  return projectData as Project[];
}

/**
 * Featured-first stable sort — featured projects lead the grid,
 * otherwise preserving the order of projects.json (newest first by
 * convention, see README).
 */
export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured);
}

export function getProjectsByType(type: ProjectType): Project[] {
  return getAllProjects().filter((project) => project.type === type);
}

export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return getAllProjects().filter((project) => project.status === status);
}

export function getActiveProjects(): Project[] {
  return getAllProjects().filter((project) => project.status !== 'archived');
}
