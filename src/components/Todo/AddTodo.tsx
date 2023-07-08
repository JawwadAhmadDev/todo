"use client";
import { NewTodo } from "@/lib/drizzle";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddTodo = () => {
  const [task, setTask] = useState<NewTodo | null>(null);
  const { refresh } = useRouter();
  const handleSubmit = async () => {
    try {
      if (task) {
        const res = await fetch("/api/todo", {
          method: "POST",
          body: JSON.stringify({ task: task.task }),
        });
        console.log(res.ok);
        refresh();
      }
    } catch (error) {
      console.log("error", (error as { message: string }).message);
    }
  };
  return (
    <div>
      <form className="w-full flex gap-2">
        {/* Input */}
        <input
          type="text"
          onChange={(e) => setTask({ task: e.target.value })}
          className="w-full px-4 py-2.5 rounded-full border focus:outline-primary"
        />
        {/* Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="p-3 shrink-0 bg-gradient-to-b from-primary to-secondary rounded-full"
        >
          <Image src={"/addTodoArrow.svg"} alt="arrow" width={20} height={20} />
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
