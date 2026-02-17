import dbConnect from "@/utils/dbConnect";
import Shipmentthree from "@/models/Shipmentthree";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId") || process.env.PROJECT_ID || "tracking_170";
    const limit = parseInt(searchParams.get("limit")) || 20;
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "desc";

    // Build query
    const query = { projectId };
    
    // Get shipments filtered by project
    const shipments = await Shipmentthree.find(query)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .limit(limit)
      .select("-__v")
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: shipments.length,
        shipments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching shipments:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
