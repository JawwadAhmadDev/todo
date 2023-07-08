import TodoList from "@/components/Todo/TodoList";
import Image from "next/image";
// import TodoList from "../../components/TodoList";

export default function Home() {
  return (
    <main className="bg-gradient-to-tr from-secondary to-primary h-screen flex justify-center items-center">
      <div className="px-3 py-4 rounded-xl bg-white w-full max-w-md">
        {/* Task */}
        <TodoList />
        <div className="w-1/2 h-1.5 bg-black/80 mx-auto rounded-lg"></div>
      </div>
    </main>
  );
}
