import API from "./api";

const eventService = {

    getEvents: async (categoryId) => {
        try {
            let url = "/events";
            if (categoryId != null) {
                url = `/events?categoryId=${categoryId}`;
            }
            const response = await API.get(url);
            return response.data;
        }
        catch (error) {
            console.error("Error in getEvents service:", error);
            throw error;
        }
    },


    // GET/events/{id}
    getEventById: async (id) => {
        try {
            const response = await API.get(`/events/${id}`);
            return response.data;
        }
        catch (error) {
            console.log(`Error fetching event with ID ${id}:`, error);
            throw error;
        }
    },

    // POST /events (Requires ADMIN or ORGANIZER role)
    createEvent: async (eventRequest) => {
        try {
            const response = await API.post("/events", eventRequest);
            return response.data;
        } catch (error) {
            console.error("Error creating event:", error);
            throw error;
        }
    },

    // PUT /events/{id} (Requires ADMIN or ORGANIZER role)
  updateEvent: async (id, eventRequest) => {
    try {
      const response = await API.put(`/events/${id}`, eventRequest);
      return response.data;
    } catch (error) {
      console.error(`Error updating event with ID ${id}:`, error);
      throw error;
    }
  },

  // DELETE /events/{id} (Requires ADMIN or ORGANIZER role)
  deleteEvent: async (id) => {
    try {
      const response = await API.delete(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting event with ID ${id}:`, error);
      throw error;
    }
  }
};
export default eventService;