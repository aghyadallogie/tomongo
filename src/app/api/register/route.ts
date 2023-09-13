import connectMongoDB from "@/lib/mongodb";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json();
  console.log('you', username);
  
  await connectMongoDB();
  await User.create({ username, email, password });
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}
