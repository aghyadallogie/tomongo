import connectMongoDB from "@/lib/mongodb";
import Todo from "@/models/TodoModel";
import { NextRequest, NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    await connectMongoDB();
    const todo = await Todo.findById(id);
    return NextResponse.json(todo, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  console.log('BE', id);
  
  try {
    await connectMongoDB();
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
}
