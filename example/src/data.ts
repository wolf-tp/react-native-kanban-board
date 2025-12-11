/**
 * Sample data for Kanban board example
 */

import type { CardData, ColumnConfig } from 'react-native-kanban-board';

/**
 * Column configurations
 */
export const columns: ColumnConfig[] = [
  {
    id: 'new',
    title: 'New',
    color: '#3B82F6', // Blue
  },
  {
    id: 'pending',
    title: 'Pending',
    color: '#F59E0B', // Amber
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    color: '#8B5CF6', // Purple
  },
  {
    id: 'done',
    title: 'Done',
    color: '#10B981', // Green
  },
];

/**
 * Sample cards data
 */
export const initialCards: CardData[] = [
  // New column
  {
    id: '1',
    columnId: 'new',
    title: 'Design new landing page',
    description: 'Create mockups and wireframes for the new landing page',
    priority: 'high',
    labels: ['design', 'frontend'],
  },
  {
    id: '2',
    columnId: 'new',
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    priority: 'medium',
    labels: ['devops'],
  },

  // Pending column
  {
    id: '3',
    columnId: 'pending',
    title: 'Review pull requests',
    description: 'Review and approve pending pull requests from the team',
    priority: 'medium',
    labels: ['review'],
  },
  {
    id: '4',
    columnId: 'pending',
    title: 'Update documentation',
    description: 'Update API documentation with new endpoints',
    priority: 'low',
    labels: ['docs'],
  },

  // In Progress column
  {
    id: '5',
    columnId: 'in_progress',
    title: 'Implement authentication',
    description: 'Add JWT authentication to the API server',
    priority: 'high',
    labels: ['backend', 'security'],
  },
  {
    id: '6',
    columnId: 'in_progress',
    title: 'Fix mobile responsive issues',
    description: 'Resolve layout issues on mobile devices',
    priority: 'medium',
    labels: ['frontend', 'bug'],
  },

  // Done column
  {
    id: '7',
    columnId: 'done',
    title: 'Setup project repository',
    description: 'Initialize Git repository and project structure',
    priority: 'high',
    labels: ['setup'],
  },
  {
    id: '8',
    columnId: 'done',
    title: 'Install dependencies',
    description: 'Install all required npm packages',
    priority: 'low',
    labels: ['setup'],
  },
];
