import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Userthree from "@/models/Userthree";

export const POST = async (req) => {
  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return new NextResponse(
      JSON.stringify({ message: "All fields are required" }),
      { status: 400 }
    );
  }

  if (newPassword.length < 6) {
    return new NextResponse(
      JSON.stringify({ message: "New password must be at least 6 characters" }),
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const user = await Userthree.findOne({ password: currentPassword });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "Current password is incorrect" }),
        { status: 401 }
      );
    }

    user.password = newPassword;
    await user.save();

    return new NextResponse(
      JSON.stringify({ message: "Password updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
};
