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
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { TaskCard } from "./task-card";

const KanBanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columnsIds = useMemo(() => {
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
    setTasks(tasks.filter((task) => task.columnId !== id));
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

    if (active.data.current?.type === "Column") {
      setActiveColumn(active.data.current?.column || null);
    }

    if (active.data.current?.type === "Task") {
      setActiveTask(active.data.current?.task || null);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns((prevColumns) => {
      const activeColumnIndex = prevColumns.findIndex(
        (col) => col.id === activeId
      );
      const overColumnIndex = prevColumns.findIndex((col) => col.id === overId);

      return arrayMove(prevColumns, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((task) => task.id === activeId);
        const overIndex = prevTasks.findIndex((task) => task.id === overId);

        prevTasks[activeIndex].columnId = prevTasks[overIndex].columnId;

        return arrayMove(prevTasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((task) => task.id === activeId);

        prevTasks[activeIndex].columnId = overId;

        return arrayMove(prevTasks, activeIndex, activeIndex);
      });
    }
  };

  return (
    <div className="m-auto flex min-h-screen w-full place-content-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex gap-4 mx-auto">
          <div className="flex gap-4">
            <SortableContext items={columnsIds}>
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
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-main-bg border-2 border-column-bg p-4 ring-rose-500 hover:ring-2 flex items-center justify-start gap-2"
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
            {activeTask && (
              <TaskCard
                task={activeTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
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
