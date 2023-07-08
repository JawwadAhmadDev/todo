import React from "react";
import { Todo } from "@/lib/drizzle";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/todo");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.log("error: ", (error as { message: string }).message);
  }
};

const TodoList = async () => {
  const res: { data: Todo[] } = await getData();
  return (
    <>
      {res.data.map((item: Todo) => {
        return (
          <div className="bg-gray-300 py-3 px-3 my-4 rounded-lg gap-3 flex items-center shadow">
            {/* Circle */}
            <div className="w-4 h-4 rounded-full bg-primary"></div>
            {/* Task */}
            <p className="text-lg font-medium">{item.task}</p>
          </div>
        );
      })}
    </>
  );
};

export default TodoList;