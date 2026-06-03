import Shipmentthree from "@/models/Shipmentthree";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function generateNumericId(length) {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const POST = async (req) => {
  try {
    await dbConnect();

    const shipmentData = await req.json();
    let imageData = null;

    // Generate tracking number once and use it consistently
    const trackingNumber = `SWTE-${generateNumericId(14)}`;

    // Extract featuredImage from the request data
    const { featuredImage, ...otherData } = shipmentData;
    
    // Debug: Log expectedDeliveryDate to verify it's being received
    console.log("Expected Delivery Date received:", shipmentData.expectedDeliveryDate);
    console.log("Other data includes expectedDeliveryDate:", otherData.expectedDeliveryDate);

    // Process image if it exists
    if (
      featuredImage &&
      typeof featuredImage === "string" &&
      featuredImage.startsWith("data:")
    ) {
      try {
        console.log("Uploading image to Cloudinary...");
        const uploadResult = await cloudinary.uploader.upload(featuredImage, {
          public_id: `shipment_${trackingNumber}_${Date.now()}`, // Generate a unique ID
        });

        console.log("Image upload successful:", uploadResult.public_id);
        imageData = {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        };
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        // Return detailed error for debugging
        return new NextResponse(
          JSON.stringify({
            message: "Failed to upload image",
            error: uploadError.message,
          }),
          { status: 400 }
        );
      }
    } else if (featuredImage) {
      console.log("Invalid image format received:", typeof featuredImage);
      return new NextResponse(
        JSON.stringify({
          message: "Invalid image format. Must be a base64 data URL string.",
        }),
        { status: 400 }
      );
    }

    const foundShipment = await Shipmentthree.findOne({ trackingNumber });
    if (foundShipment) {
      return new NextResponse(
        JSON.stringify({ message: "Shipment for this sender already exists" }),
        { status: 400 }
      );
    }

    // Ensure expectedDeliveryDate is explicitly included
    const shipmentToSave = {
      ...otherData,
      trackingNumber,
      status: "pending",
      currentPosition: [0, 0],
      featuredImage: imageData, // Use the uploaded image data or null
      projectId: process.env.PROJECT_ID || "tracking_170", // Add project identifier
    };
    
    // Explicitly set expectedDeliveryDate if it exists
    if (shipmentData.expectedDeliveryDate !== undefined) {
      shipmentToSave.expectedDeliveryDate = shipmentData.expectedDeliveryDate;
    } else if (otherData.expectedDeliveryDate !== undefined) {
      shipmentToSave.expectedDeliveryDate = otherData.expectedDeliveryDate;
    }
    
    console.log("Shipment to save - expectedDeliveryDate:", shipmentToSave.expectedDeliveryDate);
    
    const newShipment = new Shipmentthree(shipmentToSave);

    await newShipment.save();

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "SwiftPair Logistics <contact@swiftpairlogistics.com>",
        to: [shipmentData.receiverEmail],
        ...(shipmentData.senderEmail && { cc: [shipmentData.senderEmail] }),
        subject: `Shipment Confirmation - Tracking #${trackingNumber}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="margin:0;padding:0;font-family:Arial,sans-serif;line-height:1.6;">
            <div style="max-width:600px;margin:0 auto;padding:20px;">
              <div style="background:#ffffff;padding:20px;border:1px solid #e0e0e0;">
                <h1 style="color:#333;font-size:24px;margin-bottom:20px;">Shipment Confirmation</h1>
                <div style="background:#f8f9fa;padding:15px;margin-bottom:20px;">
                  <p style="margin:0;font-size:16px;">Tracking Number: <strong>${trackingNumber}</strong></p>
                </div>
                <div style="background:#fff7e6;padding:15px;margin-bottom:20px;border-left:4px solid #ff9800;">
                  <p style="margin:0 0 10px 0;font-weight:bold;color:#e65100;">Important Notice</p>
                  <p style="margin:0 0 10px 0;">Dear Client, your package is currently <strong>pending</strong>. Please verify your delivery information is correct so we can proceed.</p>
                  <p style="margin:0;">Contact us at <a href="mailto:contact@swiftpairlogistics.com" style="color:#0066cc;">contact@swiftpairlogistics.com</a> to confirm.</p>
                </div>
                <h2 style="color:#555;font-size:18px;margin-bottom:15px;">Shipment Details</h2>
                <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
                  <tr><td style="padding:8px 0;color:#666;">From:</td><td style="padding:8px 0;"><strong>${shipmentData.sender}</strong></td></tr>
                  <tr><td style="padding:8px 0;color:#666;">To:</td><td style="padding:8px 0;"><strong>${shipmentData.receiver}</strong></td></tr>
                  <tr><td style="padding:8px 0;color:#666;">Expected Delivery:</td><td style="padding:8px 0;"><strong>${shipmentData.expectedDeliveryDate ? formatDate(shipmentData.expectedDeliveryDate) : "To be determined"}</strong></td></tr>
                  <tr><td style="padding:8px 0;color:#666;">Origin:</td><td style="padding:8px 0;"><strong>${shipmentData.origin}</strong></td></tr>
                  <tr><td style="padding:8px 0;color:#666;">Destination:</td><td style="padding:8px 0;"><strong>${shipmentData.destination}</strong></td></tr>
                </table>
                <div style="text-align:center;margin:30px 0;">
                  <a href="https://www.swiftpairlogistics.com/shipment?num=${trackingNumber}" style="background:#f97316;color:white;padding:12px 30px;text-decoration:none;font-weight:bold;">Track Your Shipment</a>
                </div>
                <p style="color:#666;font-size:14px;margin-top:30px;">Thank you for choosing SwiftPair Logistics. Questions? <a href="mailto:contact@swiftpairlogistics.com" style="color:#0066cc;">contact@swiftpairlogistics.com</a></p>
              </div>
              <div style="text-align:center;margin-top:20px;color:#999;font-size:12px;">
                <p>© ${new Date().getFullYear()} SwiftPair Logistics. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
      console.log("Email sent successfully via Resend");
    } catch (error) {
      console.error("Error sending email:", error);
    }

    return new NextResponse(
      JSON.stringify({
        ...newShipment.toObject(),
        message: "Shipment created successfully",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating shipment:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
