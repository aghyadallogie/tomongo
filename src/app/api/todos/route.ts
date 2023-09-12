import connectMongoDB from "@/lib/mongodb";
import Todo from "@/models/TodoModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Todo.create({ title, description });
  return NextResponse.json({ message: "Todo Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const todos = await Todo.find();
  return NextResponse.json({ todos });
}


