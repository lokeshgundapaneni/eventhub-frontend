import API from './api';

const authService ={

    // POST/auth/register
    register : async (registerData)=>{
        try{
            const response= await API.post("/auth/register",registerData);
            return response;
        }
        catch(error)
        {
            console.error("Registration service failed:",error);
            throw error;
        }
    },

    // POST/auth/login
    login : async (loginData)=>
    {
        try
        {
            const response = await API.post("/auth/login", loginData);
            return response;
        }
        catch(error)
        {
            console.error("login service failed:",error);
            throw error;
        }
    },

    // POST/auth/logout
      logout: () => {
        localStorage.removeItem("token");
      }
}
export default authService;