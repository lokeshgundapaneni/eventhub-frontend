import API from "./api";

const categoryService={

    // GET/categories
    getAllCategories : async()=>{
        try{
            const response=await API.get("/categories");
            return response.data;
        }
        catch(error)
        {
            console.error("Error in getAllCategories service:", error);
            throw error;
        }
    },

    // GET/categories/{id}
    getCategoryById: async(id)=>{
        try
        {
            const response=await API.get(`/categories/${id}`);
            return response.data;
        }
        catch(error)
        {
            console.error("Error in getCategoryById service:", error);
            throw error;
        }
    },

    // POST/categories
    createCategory:async(categoryRequest)=>{
        try
        {
            const response=await API.post("/categories", categoryRequest);
            return response.data;
        }
        catch(error)
        {
            console.error("Error in createCategory service:", error);
            throw error;
        }
    },

//  PUT/category/{id}
    updateCategory: async (id, categoryRequest) => {
    try {
      const response = await API.put(`/categories/${id}`, categoryRequest);
      return response.data;
    } catch (error) {
      console.error(`Error updating category with ID ${id}:`, error);
      throw error;
    }
  },

//   DELETE/category/{id}
    deleteCategory: async (id) => {
    try {
      const response = await API.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
      throw error;
    }
  }
};
export default categoryService;