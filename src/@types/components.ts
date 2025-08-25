import type { SVGProps } from "react";

export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ColumnContainerProps {
  column: Column;
  tasks: Task[];
  updateColumn: (id: Id, title: string) => void;
  deleteColumn: (id: Id) => void;
  createTask: (columnId: Id) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
}

export interface TaskCardProps {
  task: Task;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
}
