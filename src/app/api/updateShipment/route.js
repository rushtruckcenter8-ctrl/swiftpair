import Shipmentthree from "@/models/Shipmentthree";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req, res) => {
  try {
    await dbConnect();

    // Parse the request body
    const body = await req.json();
    console.log("update body data", body);

    const { trackingNumber, updatedData } = body;

    // Log the received data
    console.log("=== UPDATE SHIPMENT REQUEST ===");
    console.log("Tracking Number:", trackingNumber);

    // Check if updatedData is defined and has a status property
    if (!updatedData || typeof updatedData.status === "undefined") {
      console.error("Updated data or status is missing");
      return new NextResponse(
        JSON.stringify({ message: "Updated data or status is missing" }),
        { status: 400 }
      );
    }

    // Find the shipment filtered by project
    const projectId = process.env.PROJECT_ID || "tracking_170";
    const shipment = await Shipmentthree.findOne({
      trackingNumber,
      projectId, // Filter by project
    });

    if (!shipment) {
      console.log("Shipment not found:", trackingNumber);
      return new NextResponse(
        JSON.stringify({ message: "Shipment not found" }),
        { status: 404 }
      );
    }

    // Check if the status has changed
    const statusChanged = shipment.status !== updatedData.status;

    // Update the shipment data
    for (const key in updatedData) {
      shipment[key] = updatedData[key];
    }

    // Save the updated shipment
    const savedShipment = await shipment.save();
    console.log("Shipment updated successfully");

    if (statusChanged) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "SwiftPair Logistics <contact@swiftpairlogistics.com>",
          to: [shipment.receiverEmail],
          ...(shipment.senderEmail && { cc: [shipment.senderEmail] }),
          subject: `Shipment Status Update - Tracking #${trackingNumber}`,
          html: `
            <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:auto;border:1px solid #ddd;">
              <h1 style="font-size:16px;font-weight:600;color:#333;">Shipment Status Update</h1>
              <p style="font-size:14px;margin-top:10px;">The status of your shipment <strong>${trackingNumber}</strong> has been updated to: <strong style="color:#f97316;">${updatedData.status}</strong>.</p>
              ${updatedData.comments ? `<p style="font-size:14px;margin-top:5px;">Comment: ${updatedData.comments}</p>` : ""}
              <div style="margin-top:20px;">
                <a href="https://www.swiftpairlogistics.com/shipment?num=${trackingNumber}" style="background:#f97316;color:white;padding:10px 24px;text-decoration:none;font-weight:bold;">Track Shipment</a>
              </div>
              <p style="font-size:14px;margin-top:20px;color:#555;">Questions? <a href="mailto:contact@swiftpairlogistics.com" style="color:#f97316;">contact@swiftpairlogistics.com</a></p>
            </div>
          `,
        });
        console.log("Status update email sent via Resend");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }

    return new NextResponse(JSON.stringify({ shipmentData: shipment }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating shipment:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
