/**
 * Column types for Kanban board
 */

export interface ColumnConfig {
  /**
   * Unique identifier for the column
   */
  id: string;

  /**
   * Column title displayed in header
   */
  title: string;

  /**
   * Optional color for column header indicator
   */
  color?: string;

  /**
   * Maximum number of cards allowed in this column
   */
  maxCards?: number;

  /**
   * Array of column IDs that can drop cards into this column
   * If undefined, accepts from all columns
   */
  acceptFrom?: string[];

  /**
   * Whether this column is collapsible
   */
  collapsible?: boolean;

  /**
   * Whether this column is initially collapsed
   */
  collapsed?: boolean;

  /**
   * Custom data for column
   */
  [key: string]: any;
}

export interface ColumnLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}
