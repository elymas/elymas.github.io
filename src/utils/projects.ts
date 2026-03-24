import type { Project, ProjectType, ProjectStatus } from '../types/project';
import projectData from '../data/projects.json';

export function getAllProjects(): Project[] {
  return projectData as Project[];
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
