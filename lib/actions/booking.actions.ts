"use server";

import { dbConnect } from "@/lib/mongodb";
import Booking from "@/database/booking.model";

export const createBooking = async ({
  eventId,
  email,
}: {
  eventId: string;
  email: string;
}) => {
  try {
    await dbConnect();

    await Booking.create({ eventId, email });

    return { success: true };
  } catch (e) {
    console.error("Create booking failed", e);
    return { success: false };
  }
};
