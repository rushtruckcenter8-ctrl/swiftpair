import Shipmentthree from "@/models/Shipmentthree";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req) => {
  try {
    await dbConnect();

    const body = await req.json();
    const { trackingNumber } = body;

    if (!trackingNumber) {
      return new NextResponse(
        JSON.stringify({ message: "Tracking number is required" }),
        { status: 400 }
      );
    }

    const projectId = process.env.PROJECT_ID || "tracking_170";
    const shipment = await Shipmentthree.findOne({
      trackingNumber,
      projectId,
    });

    if (!shipment) {
      return new NextResponse(
        JSON.stringify({ message: "Shipment not found" }),
        { status: 404 }
      );
    }

    // Delete Cloudinary image if it exists
    if (shipment.featuredImage?.publicId) {
      try {
        await cloudinary.uploader.destroy(shipment.featuredImage.publicId);
      } catch (cloudinaryError) {
        console.error("Error deleting Cloudinary image:", cloudinaryError);
        // Continue with shipment deletion even if image delete fails
      }
    }

    await Shipmentthree.deleteOne({ _id: shipment._id });

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Shipment deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting shipment:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
