"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "./page.module.css";
import ShipmentContext from "@/contexts/ShipmentContext";
import Image from "next/image";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Link from "next/link";
import { generateWaypoints } from "@/components/locationUtils";
import { geocodeAddress } from "@/utils/geocode";
import { CurrentLocationInput } from "@/components/CurrentLocationInput";
import { toast } from "sonner";

// Add the helper functions here
const determineStatus = (locationType) => {
  switch (locationType) {
    case "customs":
      return "In Customs Clearance";
    case "hub":
      return "At Logistics Hub";
    case "checkpoint":
      return "Security Checkpoint";
    case "city":
      return "In Transit";
    default:
      return "Location Updated";
  }
};

const generateEventDescription = (location) => {
  switch (location.type) {
    case "customs":
      return `Package is undergoing customs inspection at ${location.name}`;
    case "hub":
      return `Package arrived at logistics hub in ${location.name}`;
    case "checkpoint":
      return `Security check completed at ${location.name}`;
    case "city":
      return `Package in transit through ${location.name}`;
    default:
      return `Package location updated to ${location.name}`;
  }
};

export default function Home() {
  const [showBar, setShowBar] = useState(true);
  const [activeAside, setActiveAside] = useState("Dashboard");
  const [activeNav, setActiveNav] = useState("");
  // const [trackingNumberEdit, setTrackingNumberEdit] = useState("");
  const [shipment, setShipment] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const navigate = useRouter();
  console.log(activeAside);
  //sender
  const [sender, setSender] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  //receiver
  const [receiverEmail, setReceiverEmail] = useState("");
  const [receiver, setReceiver] = useState("");
  const [receiverNumber, setReceiverNumber] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  //shipment
  const [shipmentType, setShipmentType] = useState("");
  const [weight, setWeight] = useState("");
  const [courier, setCourier] = useState("");
  const [packages, setPackages] = useState("");
  const [mode, setMode] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalFreight, setTotalFreight] = useState("");
  const [carrier, setCarrier] = useState("");
  const [carrierReferenceNo, setCarrierReferenceNo] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("");
  const [locationUpdateTime, setLocationUpdateTime] = useState("");

  //package
  const [productQuantity, setProductQuantity] = useState("");
  const [productType, setProductType] = useState("");
  const [description, setDescription] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [productWeight, setProductWeight] = useState("");

  const [trackingNumber, setTrackingNumber] = useState(null);
  const [trackingEvents, setTrackingEvents] = useState([]);
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    shipments,
    setShipments,
    shipmentStatus,
    setShipmentStatus,
    shipmentPosition,
    setShipmentPosition,
    currentStep,
    setCurrentStep,
    user,
    setUser,
  } = useContext(ShipmentContext);

  const [senderCoords, setSenderCoords] = useState(null);
  const [receiverCoords, setReceiverCoords] = useState(null);
  const [showOnMap, setShowOnMap] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  // Image upload state
  const [uploadedImage, setUploadedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [waypoints, setWaypoints] = useState([]);
  const [recentShipments, setRecentShipments] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    total: 0,
    pending: 0,
    intransit: 0,
    completed: 0,
  });
  const [allShipments, setAllShipments] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const handleRemoveEvent = (index) => {
    setTrackingEvents((events) => events.filter((_, i) => i !== index));
  };
  console.log(user);

  // Fetch dashboard statistics and shipments
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (
        activeAside === "Dashboard" ||
        activeAside === "Edit" ||
        activeAside === "Review"
      ) {
        setLoadingStats(true);
        setLoadingRecent(true);
        try {
          const res = await fetch(
            "/api/getShipmentsByProject?limit=100&sortBy=createdAt&order=desc"
          );
          if (res.ok) {
            const data = await res.json();
            const shipments = data.shipments || [];
            setAllShipments(shipments);
            setRecentShipments(shipments.slice(0, 10));

            // Calculate statistics
            const stats = {
              total: shipments.length,
              pending: shipments.filter(
                (s) => s.status === "pending" || s.status === "inactive"
              ).length,
              intransit: shipments.filter(
                (s) => s.status === "intransit" || s.status === "active"
              ).length,
              completed: shipments.filter((s) => s.status === "completed")
                .length,
            };
            setDashboardStats(stats);
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        } finally {
          setLoadingStats(false);
          setLoadingRecent(false);
        }
      }
    };
    fetchDashboardData();
  }, [activeAside]);

  // Handle quick status update from dashboard
  const handleQuickStatusUpdate = async (trackingNum, newStatus) => {
    try {
      const res = await fetch("/api/updateShipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trackingNumber: trackingNum,
          updatedData: {
            status: newStatus,
            locationUpdateTime: new Date().toISOString(),
          },
        }),
      });

      if (res.ok) {
        toast.success(`Status updated to ${newStatus}`);
        // Refresh dashboard data
        const refreshRes = await fetch(
          "/api/getShipmentsByProject?limit=100&sortBy=createdAt&order=desc"
        );
        if (refreshRes.ok) {
          const data = await refreshRes.json();
          const shipments = data.shipments || [];
          setAllShipments(shipments);
          setRecentShipments(shipments.slice(0, 10));

          const stats = {
            total: shipments.length,
            pending: shipments.filter(
              (s) => s.status === "pending" || s.status === "inactive"
            ).length,
            intransit: shipments.filter(
              (s) => s.status === "intransit" || s.status === "active"
            ).length,
            completed: shipments.filter((s) => s.status === "completed").length,
          };
          setDashboardStats(stats);
        }
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    }
  };

  // Handle deleting a shipment
  const handleDeleteShipment = async (trackingNum) => {
    if (
      !window.confirm(
        `Are you sure you want to delete shipment ${trackingNum}? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch("/api/deleteShipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber: trackingNum }),
      });

      if (res.ok) {
        toast.success("Shipment deleted successfully");
        // If we deleted the currently viewed shipment, close the aside
        if (trackingNumber === trackingNum) {
          setActiveAside("Dashboard");
        }
        // Refresh dashboard data
        const refreshRes = await fetch(
          "/api/getShipmentsByProject?limit=100&sortBy=createdAt&order=desc"
        );
        if (refreshRes.ok) {
          const data = await refreshRes.json();
          const shipments = data.shipments || [];
          setAllShipments(shipments);
          setRecentShipments(shipments.slice(0, 10));

          const stats = {
            total: shipments.length,
            pending: shipments.filter(
              (s) => s.status === "pending" || s.status === "inactive"
            ).length,
            intransit: shipments.filter(
              (s) => s.status === "intransit" || s.status === "active"
            ).length,
            completed: shipments.filter((s) => s.status === "completed").length,
          };
          setDashboardStats(stats);
        }
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete shipment");
      }
    } catch (error) {
      console.error("Error deleting shipment:", error);
      toast.error("Error deleting shipment");
    }
  };

  // Handle clicking on a recent shipment card
  const handleRecentShipmentClick = async (trackingNum) => {
    setTrackingNumber(trackingNum);
    setIsSearching(true);
    setError(null);

    try {
      const res = await fetch("/api/getShipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber: trackingNum }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setShipment(data.shipmentData);

        // Initialize tracking events only if they don't exist
        if (data.shipmentData.trackingEvents) {
          setTrackingEvents(data.shipmentData.trackingEvents);
        } else {
          setTrackingEvents([]);
        }

        try {
          const senderCoords = await geocodeAddress(
            data.shipmentData.senderAddress
          );
          const receiverCoords = await geocodeAddress(
            data.shipmentData.receiverAddress
          );

          if (senderCoords && receiverCoords) {
            const points = await generateWaypoints(
              senderCoords,
              receiverCoords
            );
            setWaypoints(points);
          }
        } catch (geocodeError) {
          console.error("Error geocoding addresses:", geocodeError);
        }
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Shipment not found");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSearching(false);
    }
  };
  useEffect(() => {
    if (user === "") {
      navigate.push("/login");
    }
  }, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error(
          "Invalid file type. Please upload a JPEG, PNG, GIF, or WebP."
        );
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("File is too large. Maximum size is 5MB.");
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImage(file);

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        // Validate base64 string
        if (
          typeof reader.result === "string" &&
          reader.result.startsWith("data:image")
        ) {
          setImageBase64(reader.result);
        } else {
          toast.error("Invalid image format.");
        }
      };
      reader.onerror = (error) => {
        console.error("File reading error:", error);
        toast.error("Error reading image file.");
      };
      reader.readAsDataURL(file);
    }
  };

  // Add this state variable at the top with your other state declarations
  const [imageBase64, setImageBase64] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Optional: Upload image first if needed
      let imageUploadResult = null;
      if (image) {
        imageUploadResult = await uploadBase64Image();
      }

      // Prepare shipment data
      const shipmentData = {
        // Sender Details
        sender,
        senderEmail,
        senderNumber,
        senderAddress,

        // Receiver Details
        receiver,
        receiverEmail,
        receiverNumber,
        receiverAddress,

        // Shipment Routing Details
        origin,
        destination,
        mode,
        carrier,
        carrierReferenceNo,

        // Additional Shipment Details
        shipmentType,
        weight,
        courier,
        packages,
        product,
        quantity,

        // Location and Tracking Details
        currentLocation,
        locationUpdateTime: locationUpdateTime || new Date().toISOString(),
        showOnMap,
        currentPosition: [0, 0],
        currentStep: 0,
        status: "pending",

        // Date and Time Details
        pickupDate,
        pickupTime,
        departureTime,
        expectedDeliveryDate: estimatedDeliveryDate,

        // Financial Details
        paymentMethod,
        totalFreight,

        // Package Details
        productQuantity,
        productType,
        description,
        length,
        width,
        height,
        productWeight,

        // Additional Fields
        comments,
        featuredImage: imageUploadResult
          ? imageUploadResult.url // Use Cloudinary URL if upload successful
          : imageBase64,
      };

      // Send data to API
      const response = await fetch("/api/createShipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shipmentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create shipment");
      }

      // Set tracking number from response
      setTrackingNumber(data.trackingNumber);

      // Success toast
      toast.success("Shipment created successfully!");

      // Reset image states
      setImage(null);
      setImagePreview(null);
      setImageBase64(null);
    } catch (error) {
      console.error("Error creating shipment:", error);

      // Error toast
      toast.error(error.message || "Failed to create shipment");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Image preview cleanup
  useEffect(() => {
    // Revoke preview URL to free memory
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  const handleCopyClick = () => {
    if (trackingNumber) {
      navigator.clipboard
        .writeText(trackingNumber)
        .then(() => {
          toast.success("Tracking number copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy tracking number:", error);
          toast.error("Failed to copy tracking number");
        });
    }
  };
  const handleFocus = (event) => {
    event.target.select();
  };
  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/getShipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setShipment(data.shipmentData);

        // Initialize tracking events only if they don't exist
        if (data.shipmentData.trackingEvents) {
          setTrackingEvents(data.shipmentData.trackingEvents);
        } else {
          setTrackingEvents([]); // Initialize as empty array if no events exist
        }

        try {
          const senderCoords = await geocodeAddress(
            data.shipmentData.senderAddress
          );
          const receiverCoords = await geocodeAddress(
            data.shipmentData.receiverAddress
          );

          if (senderCoords && receiverCoords) {
            const points = await generateWaypoints(
              senderCoords,
              receiverCoords
            );
            setWaypoints(points);
          }
        } catch (geocodeError) {
          console.error("Error geocoding addresses:", geocodeError);
        }
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Shipment not found");
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };
  const handleUpdate = async () => {
    setError(null);
    setIsUpdating(true);

    try {
      // Comprehensive data mapping
      const updateData = {
        // Tracking Details
        trackingNumber: shipment.trackingNumber,
        status: shipment.status || "pending",

        // Sender Details
        sender: shipment.sender || "",
        senderNumber: shipment.senderNumber || "",
        senderEmail: shipment.senderEmail || "",
        senderAddress: shipment.senderAddress || "",

        // Receiver Details
        receiver: shipment.receiver || "",
        receiverNumber: shipment.receiverNumber || "",
        receiverEmail: shipment.receiverEmail || "",
        receiverAddress: shipment.receiverAddress || "",

        // Shipment Routing Details
        origin: shipment.origin || "",
        destination: shipment.destination || "",
        carrier: shipment.carrier || "",
        mode: shipment.mode || "",

        // Additional Shipment Details
        shipmentType: shipment.shipmentType || "",
        weight: shipment.weight || "",
        packages: shipment.packages || "",
        product: shipment.product || "",
        quantity: shipment.quantity || "",

        // Date and Time Details
        pickupDate: shipment.pickupDate || "",
        pickupTime: shipment.pickupTime || "",
        departureTime: shipment.departureTime || "",
        expectedDeliveryDate: shipment.expectedDeliveryDate || "",

        // Financial Details
        paymentMethod: shipment.paymentMethod || "",
        totalFreight: shipment.totalFreight || "",
        carrierReferenceNo: shipment.carrierReferenceNo || "",

        // Current Location and Tracking
        currentLocation: shipment.currentLocation || "",
        locationUpdateTime:
          shipment.locationUpdateTime || new Date().toISOString(),
        showOnMap: showOnMap,

        // Package Details
        productQuantity: shipment.productQuantity || "",
        productType: shipment.productType || "",
        description: shipment.description || "",
        length: shipment.length || "",
        width: shipment.width || "",
        height: shipment.height || "",
        productWeight: shipment.productWeight || "",

        // Additional Fields
        comments: shipment.comments || "",
        courier: shipment.courier || "",

        // Tracking Events
        trackingEvents: trackingEvents || [],
      };

      // Image Handling
      if (imageBase64 || imagePreview) {
        updateData.featuredImage = {
          url: imageBase64 || imagePreview,
          publicId: null,
        };
      }

      // Send update request
      const response = await fetch("/api/updateShipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trackingNumber: shipment.trackingNumber,
          updatedData: updateData,
        }),
      });

      // Response handling
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Failed to update shipment. Status: ${response.status}`
        );
      }

      const updatedShipmentData = await response.json();

      // Success toast
      toast.success("Shipment updated successfully!");

      // Update local state
      setShipment(updatedShipmentData.shipmentData || updatedShipmentData);

      // Reset image states
      setImage(null);
      setImagePreview(null);
      setImageBase64(null);
    } catch (error) {
      // Error handling
      console.error("Error updating shipment:", error);
      toast.error(
        error.message ||
          "An unexpected error occurred while updating the shipment"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const uploadBase64Image = async () => {
    if (!imageBase64) return null;

    setIsUploading(true);

    try {
      // Validate base64 string
      if (!imageBase64.startsWith("data:image/")) {
        toast.error("Invalid image format");
        return null;
      }

      // Show loading toast
      toast.loading("Processing image...");

      // Upload to Cloudinary directly
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file: imageBase64,
            upload_preset: "skybound_uploads", // Your Cloudinary upload preset
          }),
        }
      );

      // Check response
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        console.error("Cloudinary upload error:", errorData);

        toast.dismiss();
        // toast.error(
        //   `Image upload failed: ${errorData.error?.message || "Unknown error"}`
        // );

        return null;
      }

      // Parse successful upload
      const uploadedImage = await uploadResponse.json();

      // Dismiss loading toast
      toast.dismiss();
      toast.success("Image uploaded successfully!");

      // Return upload details
      return {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };
    } catch (error) {
      console.error("Image upload error:", error);

      toast.dismiss();
      toast.error("Image upload failed. Please try again.");

      return null;
    } finally {
      setIsUploading(false);
    }
  };

  console.log("Date", estimatedDeliveryDate);

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="animate-spin h-32 w-32 border-t-2 border-b-2 border-[#f97316]"
            style={{ borderRadius: 0 }}
          ></div>
        </div>
      )}

      {/* Sidebar backdrop for mobile */}
      {!showBar && (
        <div
          className="fixed inset-0 bg-black/50 z-[15] lg:hidden"
          onClick={() => setShowBar(true)}
          aria-hidden="true"
        />
      )}

      {/* Navigation */}
      <nav className="bg-white border-b-2 border-gray-200 fixed w-full z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <button
                onClick={() => setShowBar(!showBar)}
                className="p-2 shrink-0 text-gray-600 hover:bg-gray-100 hover:text-[#f97316] transition-colors focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 lg:hidden"
                style={{ borderRadius: 0 }}
                aria-label="Toggle sidebar"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div
                  className="w-8 h-8 shrink-0 bg-[#f97316] flex items-center justify-center"
                  style={{ borderRadius: 0 }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm sm:text-lg text-gray-900 truncate">
                    Admin Dashboard
                  </div>
                  <div className="text-xs text-gray-500 hidden sm:block">
                    Shipment Management
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <Link href="https://www.swiftpairlogistics.com/" target="_blank">
                <button
                  className="p-2 sm:px-4 sm:py-2 bg-[#f97316] text-white font-medium hover:bg-[#ea580c] transition-colors shadow-sm hover:shadow-md flex items-center gap-2"
                  style={{ borderRadius: 0 }}
                >
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                <span className="hidden sm:inline">View Site</span>
              </button>
              </Link>
              <div className="flex items-center gap-2 sm:gap-3 sm:pl-4 sm:border-l-2 sm:border-gray-200">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">
                    {user || "Admin"}
                  </div>
                  <div className="text-xs text-gray-500">Logged in</div>
                </div>
                <div className="relative">
                  <div
                    className="w-10 h-10 bg-[#f97316] flex items-center justify-center border-2 border-gray-200"
                    style={{ borderRadius: 0 }}
                  >
                    <span className="text-white font-semibold text-sm">
                      {(user || "A").charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white"
                    style={{ borderRadius: 0 }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-64 sm:w-64 bg-white border-r-2 border-gray-200 transform transition-transform duration-300 ease-in-out z-20 flex flex-col ${
          showBar ? "-translate-x-full lg:translate-x-0" : "translate-x-0"
        }`}
      >
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              Navigation
            </h2>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveAside("Dashboard")}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium transition-all ${
                    activeAside === "Dashboard"
                      ? "bg-[#f97316] text-white border-l-4 border-[#ea580c]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#f97316] border-l-4 border-transparent"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveAside("Add")}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium transition-all ${
                    activeAside === "Add"
                      ? "bg-[#f97316] text-white border-l-4 border-[#ea580c]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#f97316] border-l-4 border-transparent"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Create Shipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveAside("Edit")}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium transition-all ${
                    activeAside === "Edit"
                      ? "bg-[#f97316] text-white border-l-4 border-[#ea580c]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#f97316] border-l-4 border-transparent"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Shipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveAside("Review")}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium transition-all ${
                    activeAside === "Review"
                      ? "bg-[#f97316] text-white border-l-4 border-[#ea580c]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#f97316] border-l-4 border-transparent"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Review Shipment
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t-2 border-gray-200">
          <button
            onClick={() => {
              setUser("");
              navigate.push("/login");
            }}
            className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all border-l-4 border-transparent hover:border-red-500"
            style={{ borderRadius: 0 }}
          >
            <svg
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-0 lg:ml-64 transition-all duration-300">
      {/* Dashboard Overview */}
      {activeAside === "Dashboard" && (
        <section
          className="pt-20 sm:pt-24 px-3 sm:px-4 lg:px-6 pb-8 bg-gray-50 min-h-screen"
          onClick={() => !showBar && setShowBar(true)}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <span
                className="inline-block px-4 py-1 bg-[#f97316]/10 text-[#f97316] font-medium mb-4 text-sm"
                style={{ borderRadius: 0 }}
              >
                Overview
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#f97316] mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor and manage all your shipments
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div
                className="bg-white border-2 border-gray-200 shadow-lg p-4 sm:p-6"
                style={{ borderRadius: 0 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Total Shipments
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {loadingStats ? "..." : dashboardStats.total}
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 bg-[#f97316]/10 flex items-center justify-center"
                    style={{ borderRadius: 0 }}
                  >
                    <svg
                      className="w-6 h-6 text-[#f97316]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div
                className="bg-white border-2 border-gray-200 shadow-lg p-4 sm:p-6"
                style={{ borderRadius: 0 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Pending
                    </p>
                    <p className="text-3xl font-bold text-orange-600">
                      {loadingStats ? "..." : dashboardStats.pending}
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 bg-orange-100 flex items-center justify-center"
                    style={{ borderRadius: 0 }}
                  >
                    <svg
                      className="w-6 h-6 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div
                className="bg-white border-2 border-gray-200 shadow-lg p-4 sm:p-6"
                style={{ borderRadius: 0 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      In Transit
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-[#f97316]">
                      {loadingStats ? "..." : dashboardStats.intransit}
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 bg-[#f97316]/10 flex items-center justify-center"
                    style={{ borderRadius: 0 }}
                  >
                    <svg
                      className="w-6 h-6 text-[#f97316]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div
                className="bg-white border-2 border-gray-200 shadow-lg p-4 sm:p-6"
                style={{ borderRadius: 0 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Completed
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-600">
                      {loadingStats ? "..." : dashboardStats.completed}
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 bg-green-100 flex items-center justify-center"
                    style={{ borderRadius: 0 }}
                  >
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div
              className="bg-white border-2 border-gray-200 shadow-lg p-4 sm:p-6 mb-6"
              style={{ borderRadius: 0 }}
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <div
                  className="w-8 h-8 bg-[#f97316] flex items-center justify-center mr-3"
                  style={{ borderRadius: 0 }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveAside("Add")}
                  className="p-4 border-2 border-gray-200 hover:border-[#f97316] hover:bg-[#f97316]/5 transition-all text-left"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex items-center mb-2">
                    <div
                      className="w-10 h-10 bg-[#f97316] flex items-center justify-center mr-3"
                      style={{ borderRadius: 0 }}
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900">
                      Create New Shipment
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 pl-0 sm:pl-[52px]">
                    Add a new shipment to track
                  </p>
                </button>

                <button
                  onClick={() => setActiveAside("Edit")}
                  className="p-4 border-2 border-gray-200 hover:border-[#f97316] hover:bg-[#f97316]/5 transition-all text-left"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex items-center mb-2">
                    <div
                      className="w-10 h-10 bg-[#f97316] flex items-center justify-center mr-3"
                      style={{ borderRadius: 0 }}
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900">
                      Edit Shipment
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 pl-0 sm:pl-[52px]">
                    Update shipment details
                  </p>
                </button>

                <button
                  onClick={() => setActiveAside("Review")}
                  className="p-4 border-2 border-gray-200 hover:border-[#f97316] hover:bg-[#f97316]/5 transition-all text-left"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex items-center mb-2">
                    <div
                      className="w-10 h-10 bg-[#f97316] flex items-center justify-center mr-3"
                      style={{ borderRadius: 0 }}
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900">
                      Review Shipment
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 pl-0 sm:pl-[52px]">
                    View shipment information
                  </p>
                </button>
              </div>
            </div>

            {/* All Shipments Table */}
            <div
              className="bg-white border-2 border-gray-200 shadow-lg p-4 sm:p-6 overflow-hidden"
              style={{ borderRadius: 0 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-3 border-b-2 border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <div
                    className="w-8 h-8 bg-[#f97316] flex items-center justify-center mr-3"
                    style={{ borderRadius: 0 }}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  All Shipments
                </h2>
                <span className="text-sm text-gray-500">
                  {allShipments.length} total
                </span>
              </div>

              {loadingStats ? (
                <div className="flex justify-center items-center py-12">
                  <div
                    className="animate-spin h-8 w-8 border-t-2 border-b-2 border-[#f97316]"
                    style={{ borderRadius: 0 }}
                  ></div>
                </div>
              ) : allShipments.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <p className="text-gray-600 font-medium">
                    No shipments found
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Create your first shipment to get started
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px]">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 uppercase">
                          Tracking #
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 uppercase">
                          Origin
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 uppercase">
                          Destination
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 uppercase">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 uppercase">
                          Created
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allShipments.map((ship) => (
                        <tr
                          key={ship._id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <span className="font-semibold text-[#f97316]">
                              {ship.trackingNumber}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {ship.origin || "N/A"}
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {ship.destination || "N/A"}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={ship.status || "pending"}
                              onChange={(e) =>
                                handleQuickStatusUpdate(
                                  ship.trackingNumber,
                                  e.target.value
                                )
                              }
                              className={`text-xs font-semibold px-3 py-1 border-2 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all cursor-pointer ${
                                ship.status === "completed"
                                  ? "bg-green-100 text-green-700 border-green-300"
                                  : ship.status === "intransit" ||
                                    ship.status === "active"
                                  ? "bg-[#f97316]/10 text-[#f97316] border-[#f97316]/30"
                                  : "bg-orange-100 text-orange-700 border-orange-300"
                              }`}
                              style={{ borderRadius: 0 }}
                            >
                              <option value="pending">Pending</option>
                              <option value="active">Active</option>
                              <option value="intransit">In Transit</option>
                              <option value="completed">Completed</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {new Date(ship.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  setTrackingNumber(ship.trackingNumber);
                                  setActiveAside("Edit");
                                  setTimeout(
                                    () =>
                                      handleRecentShipmentClick(
                                        ship.trackingNumber
                                      ),
                                    100
                                  );
                                }}
                                className="p-1.5 text-[#f97316] hover:bg-[#f97316]/10 transition-colors"
                                style={{ borderRadius: 0 }}
                                title="Edit"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => {
                                  setTrackingNumber(ship.trackingNumber);
                                  setActiveAside("Review");
                                  setTimeout(
                                    () =>
                                      handleRecentShipmentClick(
                                        ship.trackingNumber
                                      ),
                                    100
                                  );
                                }}
                                className="p-1.5 text-[#f97316] hover:bg-[#f97316]/10 transition-colors"
                                style={{ borderRadius: 0 }}
                                title="Review"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                              <a
                                href={`/shipment?num=${ship.trackingNumber}`}
                                target="_blank"
                                className="p-1.5 text-[#f97316] hover:bg-[#f97316]/10 transition-colors"
                                style={{ borderRadius: 0 }}
                                title="View Public Page"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </a>
                              <button
                                onClick={() =>
                                  handleDeleteShipment(ship.trackingNumber)
                                }
                                className="p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                                style={{ borderRadius: 0 }}
                                title="Delete"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {activeAside === "Add" && (
        <section
          className="pt-20 sm:pt-24 px-3 sm:px-4 lg:px-6 pb-8 bg-gray-50 min-h-screen"
          onClick={() => !showBar && setShowBar(true)}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <span
                className="inline-block px-4 py-1 bg-[#f97316]/10 text-[#f97316] font-medium mb-4 text-sm"
                style={{ borderRadius: 0 }}
              >
                Create New
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Create Shipment
              </h1>
              <p className="text-gray-600">
                Fill in the details below to create a new shipment
              </p>
            </div>

            {/* Shipper & Receiver Details Card */}
            <div
              className="bg-white border-2 border-gray-200 shadow-lg p-4 sm:p-6 mb-6"
              style={{ borderRadius: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Shipper Details */}
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center">
                      <div
                        className="w-8 h-8 bg-[#f97316] flex items-center justify-center mr-3"
                        style={{ borderRadius: 0 }}
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      Shipper Details
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Shipper Name
                      </label>
                      <input
                        type="text"
                        required
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                        placeholder="Enter shipper name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={senderNumber}
                        onChange={(e) => setSenderNumber(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <textarea
                        required
                        value={senderAddress}
                        onChange={(e) => setSenderAddress(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                        rows={3}
                        placeholder="Enter complete address"
                      />
                    </div>
                  </div>
                </div>

                {/* Receiver Details */}
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center">
                      <div
                        className="w-8 h-8 bg-[#f97316] flex items-center justify-center mr-3"
                        style={{ borderRadius: 0 }}
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      Receiver Details
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Receiver Name
                      </label>
                      <input
                        type="text"
                        required
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                        placeholder="Enter receiver name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={receiverNumber}
                        onChange={(e) => setReceiverNumber(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={receiverEmail}
                        onChange={(e) => setReceiverEmail(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <textarea
                        required
                        value={receiverAddress}
                        onChange={(e) => setReceiverAddress(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                        rows={3}
                        placeholder="Enter complete address"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipment Details Card */}
            <div
              className="bg-white border-2 border-gray-200 shadow-lg p-6 mb-6"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <div
                    className="w-8 h-8 bg-[#f97316] flex items-center justify-center mr-3"
                    style={{ borderRadius: 0 }}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                  </div>
                  Shipment Details
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Add this inside the Shipment Details grid, alongside other fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Location
                    <span className="text-xs text-[#f97316] ml-1 font-medium">
                      (Admin Update)
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                      style={{ borderRadius: 0 }}
                      placeholder="Enter current location"
                    />
                    <button
                      onClick={() => {
                        setLocationUpdateTime(new Date().toISOString());
                      }}
                      className="px-3 py-2 bg-[#f97316] text-white font-medium hover:bg-[#ea580c] transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2"
                      style={{ borderRadius: 0 }}
                      title="Update Location Timestamp"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  {locationUpdateTime && (
                    <p className="mt-1 text-xs text-gray-500">
                      Last updated:{" "}
                      {new Date(locationUpdateTime).toLocaleString()}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Show on Map
                  </label>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id="showOnMap"
                      checked={showOnMap}
                      onChange={(e) => setShowOnMap(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="showOnMap"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Display shipment on tracking map
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type of Shipment
                  </label>
                  <select
                    value={shipmentType}
                    onChange={(e) => setShipmentType(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                  >
                    <option value="">Select Type</option>
                    <option value="International Shipping">
                      International Shipping
                    </option>
                    <option value="Air Freight">Air Freight</option>
                    <option value="Truckload">Truckload</option>
                    <option value="Van Move">Van Move</option>
                    <option value="Land Shipment">Land Shipment</option>
                    <option value="Discreet">Discreet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mode
                  </label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                  >
                    <option value="">Select Mode</option>
                    <option value="Sea Transport">Sea Transport</option>
                    <option value="Land Shipping">Land Shipping</option>
                    <option value="Air Freight">Air Freight</option>
                    <option value="DISCREET">Discreet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carrier
                  </label>
                  <select
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                  >
                    <option value="">Select Carrier</option>
                    <option value="DHL">DHL</option>
                    <option value="USPS">USPS</option>
                    <option value="FedEx">FedEx</option>
                    <option value="HYPER MAIL">HYPER MAIL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight
                  </label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter weight"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Freight
                  </label>
                  <input
                    type="text"
                    value={totalFreight}
                    onChange={(e) => setTotalFreight(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter total freight"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                  >
                    <option value="">Select Payment</option>
                    <option value="Cashapp">Cashapp</option>
                    <option value="Chime">Chime</option>
                    <option value="Apple pay">Apple Pay</option>
                    <option value="Google pay">Google Pay</option>
                    <option value="Bank">Bank</option>
                    <option value="Gift Card">Gift Card</option>
                    <option value="Bacs">Bacs</option>
                    <option value="Credit card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="ethereum">Ethereum</option>
                    <option value="litecoin">Litecoin</option>
                    <option value="dogecoin">Dogecoin</option>
                    <option value="stellar">Stellar</option>
                    <option value="cheque">Cheque</option>
                    <option value="zcash">Zcash</option>
                    <option value="dash">Dash</option>
                    <option value="zelle">Zelle</option>
                    <option value="venmo">Venmo</option>
                    {/* Add other payment methods as needed */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Courier
                  </label>
                  <input
                    type="text"
                    value={courier}
                    onChange={(e) => setCourier(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter courier name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Packages
                  </label>
                  <input
                    type="text"
                    value={packages}
                    onChange={(e) => setPackages(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter number of packages"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product
                  </label>
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter quantity"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carrier Reference No.
                  </label>
                  <input
                    type="text"
                    value={carrierReferenceNo}
                    onChange={(e) => setCarrierReferenceNo(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter carrier reference number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departure Time
                  </label>
                  <input
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Time
                  </label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Origin
                  </label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter origin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter destination"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Delivery Date
                  </label>
                  <input
                    type="date"
                    value={estimatedDeliveryDate}
                    onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comments
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    rows={3}
                    placeholder="Enter any additional comments"
                  />
                </div>
              </div>
            </div>

            {/* Package Details Card */}
            <div
              className="bg-white border-2 border-gray-200 shadow-lg p-6 mb-6"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <div
                    className="w-8 h-8 bg-[#f97316] flex items-center justify-center mr-3"
                    style={{ borderRadius: 0 }}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  Package Details
                </h2>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter quantity"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Piece Type
                  </label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                  >
                    <option value="">Select Type</option>
                    <option value="Pallet">Pallet</option>
                    <option value="Car">Car</option>
                    <option value="Carton">Carton</option>
                    <option value="Crate">Crate</option>
                    <option value="Loose">Loose</option>
                    <option value="Box">Box</option>
                    <option value="Others">Others</option>
                    <option value="Discreet">Discreet</option>
                    <option value="Bike">Bike</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter package description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter length"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter width"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter height"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (g)
                  </label>
                  <input
                    type="number"
                    value={productWeight}
                    onChange={(e) => setProductWeight(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                    style={{ borderRadius: 0 }}
                    placeholder="Enter weight"
                  />
                </div>
              </div>
            </div>
            {/* Featured Image Upload */}
            <div
              className="bg-white border-2 border-gray-200 shadow-lg p-6 mb-6"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <div
                    className="w-8 h-8 bg-[#f97316] flex items-center justify-center mr-3"
                    style={{ borderRadius: 0 }}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  Featured Image
                </h2>
              </div>

              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload shipment image
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleImageChange}
                    disabled={isUploading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#f97316]/10 file:text-[#f97316] hover:file:bg-[#f97316]/20 transition-colors"
                    style={{ borderRadius: 0 }}
                  />
                </div>

                {/* Show image preview if available */}
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                    <div className="relative h-48 w-full max-w-md overflow-hidden rounded-lg border border-gray-200">
                      <img
                        src={imagePreview}
                        alt="Package preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 transition-all ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#f97316] hover:bg-[#ea580c] text-white"
              }`}
              style={{ borderRadius: 0 }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Generate Tracking Number"
              )}
            </button>
            {trackingNumber && (
              <div className="mt-6 p-4 z-[100] bg-green-50 border border-green-200 rounded-md">
                <h4 className="text-green-800 font-medium mb-2">
                  Tracking Number Generated:
                </h4>
                <div className="flex items-center space-x-4">
                  <code className="bg-white px-4 py-2 rounded border flex-1">
                    {trackingNumber}
                  </code>
                  <button
                    onClick={handleCopyClick}
                    className="px-4 py-2 text-sm text-blue-600 cursor-pointer hover:text-blue-700 focus:outline-none"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      {activeAside === "Edit" && (
        <section
          className="pt-20 sm:pt-24 px-3 sm:px-4 lg:px-6 pb-8 bg-gray-50 min-h-screen"
          onClick={() => !showBar && setShowBar(true)}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <span
                className="inline-block px-4 py-1 bg-[#f97316]/10 text-[#f97316] font-medium mb-4 text-sm"
                style={{ borderRadius: 0 }}
              >
                Edit Shipment
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#f97316] mb-2">
                Edit Shipment
              </h1>
              <p className="text-gray-600">
                Search and update shipment details
              </p>
            </div>

            {/* Recent Shipments Section */}
            {recentShipments.length > 0 && (
              <div
                className="bg-white border-2 border-gray-100 shadow-lg mb-6 p-6"
                style={{ borderRadius: 0 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[#f97316] flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Recent Shipments
                  </h2>
                  <span className="text-sm text-gray-500">
                    {recentShipments.length} shipments
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentShipments.slice(0, 6).map((ship) => (
                    <button
                      key={ship._id}
                      onClick={() =>
                        handleRecentShipmentClick(ship.trackingNumber)
                      }
                      className="text-left p-4 border-2 border-gray-200 hover:border-[#f97316] transition-all hover:shadow-md bg-gray-50 hover:bg-[#f97316]/5 cursor-pointer"
                      style={{ borderRadius: 0 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[#f97316] text-sm">
                          {ship.trackingNumber}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 ${
                            ship.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : ship.status === "intransit" ||
                                ship.status === "active"
                              ? "bg-[#f97316]/10 text-[#f97316]"
                              : "bg-red-100 text-red-700"
                          }`}
                          style={{ borderRadius: 0 }}
                        >
                          {ship.status || "pending"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        {ship.origin} → {ship.destination}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(ship.createdAt).toLocaleDateString()}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Bar */}
            <div
              className="bg-white border-2 border-gray-100 shadow-lg p-4 sm:p-6 mb-6"
              style={{ borderRadius: 0 }}
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="text"
                  value={trackingNumber}
                  onClick={handleFocus}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                  className="flex-1 min-w-0 px-4 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                  style={{ borderRadius: 0 }}
                />

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className={`w-full sm:w-auto px-6 py-2 font-semibold transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 ${
                    isSearching
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-[#f97316] hover:bg-[#ea580c] text-white"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  {isSearching ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Searching...
                    </span>
                  ) : (
                    "Search Shipment"
                  )}
                </button>
              </div>

              {error && (
                <div
                  className="mt-4 p-4 bg-red-50 border-2 border-red-300"
                  style={{ borderRadius: 0 }}
                >
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              )}
            </div>

            {shipment && (
              <>
                {/* Shipper & Receiver Details */}
                <div
                  className="bg-white border-2 border-gray-200 shadow-lg p-6 mb-6"
                  style={{ borderRadius: 0 }}
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Shipper Details */}
                    <div>
                      <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center">
                          <div
                            className="w-8 h-8 bg-[#f97316] flex items-center justify-center mr-3"
                            style={{ borderRadius: 0 }}
                          >
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          Shipper Details
                        </h2>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Shipper Name
                          </label>
                          <input
                            required
                            type="text"
                            value={shipment.sender}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                sender: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                            style={{ borderRadius: 0 }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            required
                            type="tel"
                            value={shipment.senderNumber}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                senderNumber: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                            style={{ borderRadius: 0 }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <input
                            required
                            type="text"
                            value={shipment.senderAddress}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                senderAddress: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                            style={{ borderRadius: 0 }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            required
                            type="email"
                            value={shipment.senderEmail}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                senderEmail: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                            style={{ borderRadius: 0 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Receiver Details */}
                    <div>
                      <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center">
                          <div
                            className="w-8 h-8 bg-[#f97316] flex items-center justify-center mr-3"
                            style={{ borderRadius: 0 }}
                          >
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          </div>
                          Receiver Details
                        </h2>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Receiver Name
                          </label>
                          <input
                            required
                            type="text"
                            value={shipment.receiver}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                receiver: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                            style={{ borderRadius: 0 }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            required
                            type="tel"
                            value={shipment.receiverNumber}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                receiverNumber: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                            style={{ borderRadius: 0 }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <input
                            required
                            type="text"
                            value={shipment.receiverAddress}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                receiverAddress: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                            style={{ borderRadius: 0 }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            required
                            type="email"
                            value={shipment.receiverEmail}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                receiverEmail: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                            style={{ borderRadius: 0 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipment Details */}
                <div
                  className="bg-white border-2 border-gray-200 shadow-lg p-6 mb-6"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center">
                      <div
                        className="w-8 h-8 bg-[#f97316] flex items-center justify-center mr-3"
                        style={{ borderRadius: 0 }}
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                          />
                        </svg>
                      </div>
                      Shipment Details
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <input
                        type="text"
                        value={shipment.status}
                        onChange={(e) =>
                          setShipment({ ...shipment, status: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>
                    <div>
                      {shipment && waypoints.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Location
                            <span className="text-xs text-blue-500 ml-1">
                              (Admin Update)
                            </span>
                          </label>
                          <CurrentLocationInput
                            waypoints={waypoints}
                            onLocationSelect={(locationData) => {
                              if (locationData) {
                                const isDuplicate = trackingEvents.some(
                                  (event) =>
                                    event.location === locationData.location &&
                                    event.timestamp === locationData.timestamp
                                );

                                if (!isDuplicate) {
                                  setTrackingEvents((prev) => [
                                    ...prev,
                                    locationData,
                                  ]);
                                  setShipment((prev) => ({
                                    ...prev,
                                    currentLocation: locationData.location,
                                    locationUpdateTime: locationData.timestamp,
                                  }));
                                }
                              }
                            }}
                            currentLocation={shipment?.currentLocation}
                            trackingEvents={trackingEvents}
                            onRemoveEvent={handleRemoveEvent}
                            trackingNumber={trackingNumber}
                            showOnMap={showOnMap} // Add this
                            setShowOnMap={setShowOnMap} // Add this
                          />
                        </div>
                      )}

                      {shipment.locationUpdateTime && (
                        <p className="mt-1 text-xs text-gray-500">
                          Last updated:{" "}
                          {new Date(
                            shipment.locationUpdateTime
                          ).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Show on Map
                      </label>
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          id="showOnMap"
                          checked={showOnMap}
                          onChange={(e) => setShowOnMap(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="showOnMap"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Display shipment on tracking map
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type of Shipment
                      </label>
                      <select
                        value={shipment.shipmentType}
                        onChange={(e) =>
                          setShipment({
                            ...shipment,
                            shipmentType: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      >
                        <option value="">Select Type</option>
                        <option value="International Shipping">
                          International Shipping
                        </option>
                        <option value="Air Freight">Air Freight</option>
                        <option value="Truckload">Truckload</option>
                        <option value="Van Move">Van Move</option>
                        <option value="Land Shipment">Land Shipment</option>
                        <option value="Discreet">Discreet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weight
                      </label>
                      <input
                        type="text"
                        value={shipment.weight}
                        onChange={(e) =>
                          setShipment({ ...shipment, weight: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Courier
                      </label>
                      <input
                        type="text"
                        value={shipment.courier}
                        onChange={(e) =>
                          setShipment({ ...shipment, courier: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Packages
                      </label>
                      <input
                        type="text"
                        value={shipment.packages}
                        onChange={(e) =>
                          setShipment({ ...shipment, packages: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mode
                      </label>
                      <select
                        value={shipment.mode}
                        onChange={(e) =>
                          setShipment({ ...shipment, mode: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      >
                        <option value="">Select Mode</option>
                        <option value="Sea Transport">Sea Transport</option>
                        <option value="Land Shipping">Land Shipping</option>
                        <option value="Air Freight">Air Freight</option>
                        <option value="DISCREET">DISCREET</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product
                      </label>
                      <input
                        type="text"
                        value={shipment.product}
                        onChange={(e) =>
                          setShipment({ ...shipment, product: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={shipment.quantity}
                        onChange={(e) =>
                          setShipment({ ...shipment, quantity: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method
                      </label>
                      <select
                        value={shipment.paymentMethod}
                        onChange={(e) =>
                          setShipment({
                            ...shipment,
                            paymentMethod: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      >
                        <option value="">Select Payment</option>
                        <option value="Cashapp">Cashapp</option>
                        <option value="Chime">Chime</option>
                        <option value="Apple pay">Apple Pay</option>
                        <option value="Google pay">Google Pay</option>
                        <option value="Bank">Bank</option>
                        <option value="Gift Card">Gift Card</option>
                        <option value="Bacs">Bacs</option>
                        <option value="Credit card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bitcoin">Bitcoin</option>
                        <option value="ethereum">Ethereum</option>
                        <option value="litecoin">Litecoin</option>
                        <option value="dogecoin">Dogecoin</option>
                        <option value="stellar">Stellar</option>
                        <option value="cheque">Cheque</option>
                        <option value="zcash">Zcash</option>
                        <option value="dash">Dash</option>
                        <option value="zelle">Zelle</option>
                        <option value="venmo">Venmo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total Freight
                      </label>
                      <input
                        type="text"
                        value={shipment.totalFreight}
                        onChange={(e) =>
                          setShipment({
                            ...shipment,
                            totalFreight: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Carrier
                      </label>
                      <select
                        value={shipment.carrier}
                        onChange={(e) =>
                          setShipment({ ...shipment, carrier: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      >
                        <option value="">Select Carrier</option>
                        <option value="DHL">DHL</option>
                        <option value="USPS">USPS</option>
                        <option value="FedEx">FedEx</option>
                        <option value="HYPER MAIL">HYPER MAIL</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Carrier Reference No.
                      </label>
                      <input
                        type="text"
                        value={shipment.carrierReferenceNo}
                        onChange={(e) =>
                          setShipment({
                            ...shipment,
                            carrierReferenceNo: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Departure Time
                      </label>
                      <input
                        type="time"
                        value={shipment.departureTime}
                        onChange={(e) =>
                          setShipment({
                            ...shipment,
                            departureTime: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Origin
                      </label>
                      <input
                        type="text"
                        value={shipment.origin}
                        onChange={(e) =>
                          setShipment({ ...shipment, origin: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Destination
                      </label>
                      <input
                        type="text"
                        value={shipment.destination}
                        onChange={(e) =>
                          setShipment({
                            ...shipment,
                            destination: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pickup Date
                      </label>
                      <input
                        type="date"
                        value={shipment.pickupDate}
                        onChange={(e) =>
                          setShipment({
                            ...shipment,
                            pickupDate: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pickup Time
                      </label>
                      <input
                        type="time"
                        value={shipment.pickupTime}
                        onChange={(e) =>
                          setShipment({
                            ...shipment,
                            pickupTime: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expected Delivery Date
                      </label>
                      <input
                        type="date"
                        value={shipment.expectedDeliveryDate}
                        onChange={(e) =>
                          setShipment({
                            ...shipment,
                            expectedDeliveryDate: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Comments
                      </label>
                      <textarea
                        value={shipment.comments}
                        onChange={(e) =>
                          setShipment({ ...shipment, comments: e.target.value })
                        }
                        rows={4}
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div
                  className="bg-white border-2 border-gray-200 shadow-lg p-6 mb-6"
                  style={{ borderRadius: 0 }}
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-[#f97316]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    Package Details
                  </h2>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={shipment.productQuantity}
                        onChange={(e) =>
                          setShipment({
                            ...shipment,
                            productQuantity: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Piece Type
                      </label>
                      <select
                        value={shipment.productType}
                        onChange={(e) =>
                          setShipment({
                            ...shipment,
                            productType: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      >
                        <option value="">Select Type</option>
                        <option value="Pallet">Pallet</option>
                        <option value="Carton">Carton</option>
                        <option value="Crate">Crate</option>
                        <option value="Loose">Loose</option>
                        <option value="Box">Box</option>
                        <option value="Others">Others</option>
                        <option value="Discreet">Discreet</option>
                        <option value="Bike">Bike</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={shipment.description}
                        onChange={(e) =>
                          setShipment({
                            ...shipment,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Length (cm)
                      </label>
                      <input
                        type="number"
                        value={shipment.length}
                        onChange={(e) =>
                          setShipment({ ...shipment, length: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Width (cm)
                      </label>
                      <input
                        type="number"
                        value={shipment.width}
                        onChange={(e) =>
                          setShipment({ ...shipment, width: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        value={shipment.height}
                        onChange={(e) =>
                          setShipment({ ...shipment, height: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weight (g)
                      </label>
                      <input
                        type="number"
                        value={shipment.productWeight}
                        onChange={(e) =>
                          setShipment({
                            ...shipment,
                            productWeight: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                        style={{ borderRadius: 0 }}
                      />
                    </div>
                  </div>
                </div>
                {/* Featured Image */}
                <div
                  className="bg-white border-2 border-gray-200 shadow-lg p-6 mb-6"
                  style={{ borderRadius: 0 }}
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-[#f97316]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Featured Image
                  </h2>

                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload shipment image
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#f97316]/10 file:text-[#f97316] hover:file:bg-[#f97316]/20 transition-colors"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    {/* Show current image or preview */}
                    {(imagePreview ||
                      (shipment && shipment.featuredImage?.url)) && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">
                          Image Preview:
                        </p>
                        <div className="relative h-48 w-full max-w-md overflow-hidden rounded-lg border border-gray-200">
                          <img
                            src={imagePreview || shipment.featuredImage?.url}
                            alt="Package preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Update Button */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  {/* Update Button */}
                  <button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className={`w-full py-3 font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 transition-all ${
                      isUpdating
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-[#f97316] hover:bg-[#ea580c] text-white"
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    {isUpdating ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Updating...
                      </span>
                    ) : (
                      "Update Shipment"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      )}
      {activeAside === "Review" && (
        <section
          className="pt-20 sm:pt-24 px-3 sm:px-4 lg:px-6 pb-8 bg-gray-50 min-h-screen"
          onClick={() => !showBar && setShowBar(true)}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <span
                className="inline-block px-4 py-1 bg-[#f97316]/10 text-[#f97316] font-medium mb-4 text-sm"
                style={{ borderRadius: 0 }}
              >
                Review Shipment
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#f97316] mb-2">
                Review Shipment
              </h1>
              <p className="text-gray-600">View and review shipment details</p>
            </div>

            {/* Recent Shipments Section */}
            {recentShipments.length > 0 && (
              <div
                className="bg-white border-2 border-gray-100 shadow-lg mb-6 p-6"
                style={{ borderRadius: 0 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[#f97316] flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Recent Shipments
                  </h2>
                  <span className="text-sm text-gray-500">
                    {recentShipments.length} shipments
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentShipments.slice(0, 6).map((ship) => (
                    <button
                      key={ship._id}
                      onClick={() =>
                        handleRecentShipmentClick(ship.trackingNumber)
                      }
                      className="text-left p-4 border-2 border-gray-200 hover:border-[#f97316] transition-all hover:shadow-md bg-gray-50 hover:bg-[#f97316]/5 cursor-pointer"
                      style={{ borderRadius: 0 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[#f97316] text-sm">
                          {ship.trackingNumber}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 ${
                            ship.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : ship.status === "intransit" ||
                                ship.status === "active"
                              ? "bg-[#f97316]/10 text-[#f97316]"
                              : "bg-red-100 text-red-700"
                          }`}
                          style={{ borderRadius: 0 }}
                        >
                          {ship.status || "pending"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        {ship.origin} → {ship.destination}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(ship.createdAt).toLocaleDateString()}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Bar */}
            <div
              className="bg-white border-2 border-gray-100 shadow-lg p-4 sm:p-6 mb-6"
              style={{ borderRadius: 0 }}
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="text"
                  value={trackingNumber}
                  onClick={handleFocus}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                  className="flex-1 min-w-0 px-4 py-2 border-2 border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] transition-all"
                  style={{ borderRadius: 0 }}
                />
                <button
                  onClick={handleSearch}
                  className="w-full sm:w-auto px-6 py-2 bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2"
                  style={{ borderRadius: 0 }}
                >
                  Search Shipment
                </button>
              </div>

              {error && (
                <div
                  className="mt-4 p-4 bg-red-50 border-2 border-red-300"
                  style={{ borderRadius: 0 }}
                >
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              )}
            </div>

            {shipment && (
              <div
                className="bg-white border-2 border-gray-100 shadow-lg p-6 mb-6"
                style={{ borderRadius: 0 }}
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#f97316]/20">
                  <h2 className="text-2xl font-bold text-[#f97316]">
                    Shipment Details
                  </h2>
                  <span
                    className={`px-3 py-1 text-sm font-semibold ${
                      shipment.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : shipment.status === "intransit" ||
                          shipment.status === "active"
                        ? "bg-[#f97316]/10 text-[#f97316]"
                        : "bg-red-100 text-red-700"
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    {shipment.status || "pending"}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                      Shipper Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Name:
                        </span>
                        <p className="text-gray-800">{shipment.sender}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Email:
                        </span>
                        <p className="text-gray-800">{shipment.senderEmail}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Phone:
                        </span>
                        <p className="text-gray-800">{shipment.senderNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Address:
                        </span>
                        <p className="text-gray-800">
                          {shipment.senderAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                      Receiver Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Name:
                        </span>
                        <p className="text-gray-800">{shipment.receiver}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Email:
                        </span>
                        <p className="text-gray-800">
                          {shipment.receiverEmail}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Phone:
                        </span>
                        <p className="text-gray-800">
                          {shipment.receiverNumber}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Address:
                        </span>
                        <p className="text-gray-800">
                          {shipment.receiverAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                      Shipment Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Tracking Number:
                        </span>
                        <p className="text-gray-800">
                          {shipment.trackingNumber}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Status:
                        </span>
                        <p className="text-green-600 font-medium">
                          {shipment.status || "In Transit"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Current Location:
                        </span>
                        <p className="text-gray-800">
                          {shipment.currentLocation || "Not available"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Last Updated:
                        </span>
                        <p className="text-gray-800">
                          {shipment.locationUpdateTime
                            ? new Date(
                                shipment.locationUpdateTime
                              ).toLocaleString()
                            : "Not available"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                      Route Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Origin:
                        </span>
                        <p className="text-gray-800">{shipment.origin}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Destination:
                        </span>
                        <p className="text-gray-800">{shipment.destination}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Pickup Date:
                        </span>
                        <p className="text-gray-800">{shipment.pickupDate}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Expected Delivery:
                        </span>
                        <p className="text-gray-800">
                          {shipment.expectedDeliveryDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                      Package Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Type:
                        </span>
                        <p className="text-gray-800">
                          {shipment.productType || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Weight:
                        </span>
                        <p className="text-gray-800">
                          {shipment.productWeight
                            ? `${shipment.productWeight}g`
                            : shipment.weight || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Dimensions:
                        </span>
                        <p className="text-gray-800">
                          {shipment.length && shipment.width && shipment.height
                            ? `${shipment.length} × ${shipment.width} × ${shipment.height} cm`
                            : "Not specified"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Description:
                        </span>
                        <p className="text-gray-800">
                          {shipment.description || "No description"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking History */}
                {trackingEvents && trackingEvents.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                      Tracking History
                    </h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Date & Time
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Location
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {trackingEvents.map((event, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(event.timestamp).toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {event.location}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {event.status || "In Transit"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                  <button
                    onClick={() => setActiveAside("Edit")}
                    className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Edit Shipment
                  </button>
                  <button
                    onClick={() =>
                      trackingNumber && handleDeleteShipment(trackingNumber)
                    }
                    className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Delete Shipment
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      </main>
    </div>
  );
}
