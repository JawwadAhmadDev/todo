// import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { Todo, NewTodo, db, todoTable } from "@/lib/drizzle";
import { sql } from "drizzle-orm";

// export async function GET(request: NextRequest) {
//   const client = await db.connect();

//   try {
//     // await client.sql`CREATE TABLE IF NOT EXISTS todos(id serial, task varchar(255))` // to create table using code
//     // await client.sql`DROP TABLE todos` // to drop table
//     return NextResponse.json({ message: "You called this api" });
//   } catch (error) {
//     console.log("error", error);
//     return new NextResponse("Something went wrong");
//   }
// }

// export async function POST(request: NextRequest) {
//   const client = await db.connect();
//   const req = await request.json();
//   try {
//     if (req.task) {
//       await client.sql`CREATE TABLE IF NOT EXISTS todos(id serial, task varchar(255))`; // to create table using code
//       await client.sql`INSERT INTO todos(task) VALUES(${req.task})`; // to add new task
//       const res = (await client.sql`SELECT * FROM todos`).rows;
//       console.log('res', res.filter(row => row.id === 1));
//       return NextResponse.json({ message: "Task added successfully" });
//     } else {
//       throw new Error("Task field is required");
//     }
//   } catch (error) {
//     console.log("error", error);
//     return NextResponse.json({message: (error as {message: string}).message});
//   }
// }

export async function GET(request: NextRequest) {
  
    try {
      // sql`CREATE TABLE IF NOT EXISTS todo(id serial, task varchar(255));` // to create table using code
      // await client.sql`DROP TABLE todos` // to drop table
      const res = await db.select().from(todoTable);

      return NextResponse.json({ data: res });
    } catch (error) {
      console.log("error", error);
      return NextResponse.json({message: (error as {message:string}).message});
    }
  }



  export async function POST(request: NextRequest) {
      const req = await request.json();
      try {
        if (req.task) {
          const res = await db.insert(todoTable).values({task: req.task}).returning(); // to add new task
          console.log('res', res);
          return NextResponse.json({ message: "Data added succesfully", data: res});
        } else {
          throw new Error("Task field is required");
        }
      } catch (error) {
        console.log("error", error);
        return NextResponse.json({message: (error as {message: string}).message});
      }
    }