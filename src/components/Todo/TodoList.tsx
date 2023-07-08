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
    <div className="max-h-96 scrollbar-thin mt-4 scrollbar-thumb-primary scrollbar-track-white/0 overflow-auto mb-6">
      {res.data.reverse().map((item: Todo) => {
        return (
          <div className="bg-gradient-to-r from-white/60 to-white/50 py-2.5 px-3 my-4 mx-4 rounded-xl gap-3 flex items-center shadow-inner">
            {/* Circle */}
            <div className="w-3 h-3 rounded-full ring-1 ring-primary ring-offset-orange-500 bg-primary"></div>
            {/* Task */}
            <p className="text-lg font-normal">{item.task}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;