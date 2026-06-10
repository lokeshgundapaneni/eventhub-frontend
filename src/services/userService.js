import API from "./api";

const userService = {
    // GET /users
    getAllUsers: async () => {
        try {
            const response = await API.get("/users");
            return response.data;
        } catch (error) {
            console.error("Error in getAllUsers service:", error);
            throw error;
        }
    },

    // GET /users/{id}
    getUserById: async (id) => {
        try {
            const response = await API.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error);
            throw error;
        }
    },

    // PUT /users/{id}
    updateUser: async (id, userData) => {
        try {
            const response = await API.put(`/users/${id}`, userData);
            return response.data;
        } catch (error) {
            console.error(`Error updating user with ID ${id}:`, error);
            throw error;
        }
    },

    // DELETE /users/{id}
    deleteUser: async (id) => {
        try {
            const response = await API.delete(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error);
            throw error;
        }
    }
};

export default userService;