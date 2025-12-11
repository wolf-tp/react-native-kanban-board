/**
 * Card types for Kanban board
 */

export interface CardData {
  /**
   * Unique identifier for the card
   */
  id: string;

  /**
   * ID of the column this card belongs to
   */
  columnId: string;

  /**
   * Card title
   */
  title: string;

  /**
   * Optional card description
   */
  description?: string;

  /**
   * Optional priority level
   */
  priority?: 'low' | 'medium' | 'high';

  /**
   * Optional labels/tags
   */
  labels?: string[];

  /**
   * Optional assignee information
   */
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };

  /**
   * Created timestamp
   */
  createdAt?: Date | string;

  /**
   * Due date
   */
  dueDate?: Date | string;

  /**
   * Custom data - extensible for user needs
   */
  [key: string]: any;
}

export interface CardPosition {
  columnId: string;
  index: number;
}

export interface CardLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}
