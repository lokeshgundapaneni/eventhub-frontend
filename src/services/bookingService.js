import API from "./api";

const bookingService = {
  createBooking: async (bookingRequest) => {
    const response = await API.post("/bookings", bookingRequest);
    return response.data;
  },

  verifyPayment: async (paymentData) => {
    const response = await API.post("/bookings/verify", paymentData);
    return response.data;
  },

  getMyBookings: async () => {
    const response = await API.get("/bookings");
    return response.data;
  },

  // --- ADD THIS FUNCTION ---
  getBookingById: async (id) => {
    try {
      const response = await API.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error in getBookingById for ID ${id}:`, error);
      throw error;
    }
  },
  // -------------------------

  cancelBooking: async (id) => {
    const response = await API.put(`/bookings/${id}`);
    return response.data;
  }
};

export default bookingService;