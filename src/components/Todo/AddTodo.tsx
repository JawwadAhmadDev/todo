"use client";
import { NewTodo } from "@/lib/drizzle";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const AddTodo = () => {
  const [task, setTask] = useState<NewTodo | null>(null);
//   const [isMutating, setIsMutating] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { refresh } = useRouter();

    // Create inline loading UI
    const isMutating = isFetching || isPending;
  const handleSubmit = async () => {
    try {
      setIsFetching(true);
      if (task) {
        const res = await fetch("/api/todo", {
          method: "POST",
          body: JSON.stringify({ task: task.task }),
        });
        console.log(res.ok);
        startTransition(() => {
            // Refresh the current route and fetch new data from the server without
            // losing client-side browser or React state.
            refresh();
          });
      }
      setIsFetching(false);
    } catch (error) {
      console.log("error", (error as { message: string }).message);
    }
  };
  return (
    <div>
      <form className="w-full flex justify-center gap-4 ">
        {/* Input */}
        <input
          type="text"
          placeholder="Write here"
          onChange={(e) => setTask({ task: e.target.value })}
          className="w-2/3 px-4 py-2.5 rounded-full border bg-white/75 focus: focus:bg-white focus:outline-primary"
        />
        {/* Button */}
        <button
          type="submit"
          onClick={() => handleSubmit()}
          disabled={isMutating}
          className="p-3 shrink-0 bg-gradient-to-b from-secondary to-primary rounded-full"
        >
          {/* <Image src={"/addTodoArrow.svg"} alt="arrow" width={20} height={20} /> */}
          {isMutating ? (
            <svg
              className="animate-spin  h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.79092 10.5H9.31365M7.95342 2.20023L16.708 6.77204C20.6352 8.82295 20.6352 12.177 16.708 14.228L7.95342 18.7998C2.06251 21.8761 -0.3409 19.3552 2.60455 13.2132L3.49433 11.3652C3.71933 10.8952 3.71933 10.1155 3.49433 9.64545L2.60455 7.78682C-0.3409 1.64477 2.07274 -0.876138 7.95342 2.20023Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
