import AddTodo from "@/components/Todo/AddTodo";
import TodoList from "@/components/Todo/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" bg-gradient-to-tr from-secondary to-primary h-screen flex justify-center items-center">
      <div className="shadow-2xl px-3 py-4 rounded-3xl bg-white/30 w-full max-w-md">
        {/* Task */}
        <TodoList />
        {/* Add todo list portion */}
        <AddTodo />
        <div className="w-1/2 h-1.5 bg-black/80 mx-auto rounded-lg mt-4"></div>
      </div>
    </main>
  );
}
