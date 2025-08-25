import { useMemo, useState } from "react";
import { PlusIcon } from "./icons";
import type { Column, Id, Task } from "../@types/components";
import { ColumnContainer } from "./column-container";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const KanBanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const columnsId = useMemo(() => {
    return columns.map((column) => column.id);
  }, [columns]);

  const tasksByColumn = useMemo(() => {
    return tasks.reduce((acc, task) => {
      acc[task.columnId] = acc[task.columnId] || [];
      acc[task.columnId].push(task);
      return acc;
    }, {} as Record<Id, Task[]>);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const generateId = (): string => {
    return Math.floor(Math.random() * 10001).toString();
  };

  const createNewColumn = () => {
    const newColumn: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };

  const updateColumn = (id: Id, title: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === id ? { ...column, title } : column
      )
    );
  };

  const deleteColumn = (id: Id) => {
    setColumns(columns.filter((column) => column.id !== id));
  };

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (id: Id, content: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, content } : task))
    );
  };

  const deleteTask = (id: Id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveColumn(columns.find((column) => column.id === active.id) || null);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    setColumns((prevColumns) => {
      const oldIndex = prevColumns.findIndex((col) => col.id === active.id);
      const newIndex = prevColumns.findIndex((col) => col.id === over.id);

      const updatedColumns = [...prevColumns];
      const [movedColumn] = updatedColumns.splice(oldIndex, 1);
      updatedColumns.splice(newIndex, 0, movedColumn);

      return updatedColumns;
    });
  };

  return (
    <div className="m-auto flex min-h-screen w-full place-content-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="flex gap-4 mx-auto">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  updateColumn={updateColumn}
                  deleteColumn={deleteColumn}
                  createTask={createTask}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  tasks={tasksByColumn[column.id] || []}
                />
              ))}
            </SortableContext>
          </div>
          <button
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-main-bg border-2 border-column-bg p-4 ring-rose-500 hover:ring-2"
            onClick={createNewColumn}
          >
            <PlusIcon />
            Add New Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                key={activeColumn.id}
                column={activeColumn}
                updateColumn={updateColumn}
                deleteColumn={deleteColumn}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                tasks={tasksByColumn[activeColumn.id] || []}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export { KanBanBoard };
