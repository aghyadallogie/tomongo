import connectMongoDB from "@/lib/mongodb";
import Todo from "@/models/TodoModel";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req: any, { params }: any) => {
  const { id } = params;

  try {
    await connectMongoDB();
    const todo = await Todo.findById(id);
    console.log("TODOS", todo);
    return NextResponse.json( todo );

    //return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
