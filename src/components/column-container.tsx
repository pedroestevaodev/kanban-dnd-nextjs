import { SortableContext, useSortable } from "@dnd-kit/sortable";
import type { ColumnContainerProps } from "../@types/components";
import { PlusIcon, TrashIcon } from "./icons";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { TaskCard } from "./task-card";

const ColumnContainer = ({
  column,
  tasks,
  updateColumn,
  deleteColumn,
  createTask,
  updateTask,
  deleteTask,
}: ColumnContainerProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        className="bg-column-bg opacity-40 border-2 border-rose-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
        style={style}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      className="bg-column-bg w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      style={style}
    >
      <div
        {...attributes}
        {...listeners}
        className="bg-main-bg text-medium h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-column-bg border-4 flex items-center justify-between"
        onClick={() => setEditMode(true)}
      >
        <div className="flex gap-2">
          <div className="flex place-content-center bg-column-bg px-2 py-1 text-sm">
            0
          </div>
          {!editMode ? (
            column.title
          ) : (
            <input
              type="text"
              className="bg-black focus:border-rose-500 border-rounded outline-none px-2"
              autoFocus
              value={column.title}
              onBlur={() => setEditMode(false)}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          type="button"
          className="stroke-gray-500 hover:stroke-white hover:bg-column-bg rounded px-1 py-2"
          onClick={() => deleteColumn(column.id)}
        >
          <TrashIcon />
        </button>
      </div>

      <div className="flex flex-col flex-grow gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </SortableContext>
      </div>

      <button
        className="flex gap-2 items-center border-column-bg border-2 rounded-md p-4 border-x-column-bg hover:bg-main-bg hover:text-rose-500 active:bg-black"
        onClick={() => createTask(column.id)}
      >
        <PlusIcon />
        Add Task
      </button>
    </div>
  );
};

export { ColumnContainer };
