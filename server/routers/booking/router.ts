import { listBookings } from "./queries/list-bookings";
import { createBooking } from "./mutations/create-booking";
import { updateBookingStatus } from "./mutations/update-booking-status";
import { cancelBooking } from "./mutations/cancel-booking";

export const bookingRouter = {
  list: listBookings,
  create: createBooking,
  updateStatus: updateBookingStatus,
  cancel: cancelBooking,
};

