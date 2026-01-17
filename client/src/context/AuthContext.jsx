import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { io } from "socket.io-client"


const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [onlineUser, setOnlineUser] = useState([]);
    const [socket, setSocket] = useState(null);

    //check if user is authenticated and if it is then connect socket and set user data
    const checkAuth = async () => {
        try {
            const { data } = await axios.get("/api/auth/check");
            if (data.success) {
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        }
        catch (error) {
            console.log(error);
            setAuthUser(null);
        } finally {
            setLoading(false);
        }
    }

    //login function to handle user authentication and socket connection
    const login = async (state, credentials) => {
        try {
            const { data } = await axios.post(`/api/auth/${state}`, credentials);
            if (data.success) {
                setAuthUser(data.userData);
                connectSocket(data.userData);

                axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

                setToken(data.token);
                localStorage.setItem("token", data.token)
                toast.success(data.message)
            }
            else {
                toast.error(data.message || "Login failed");
            }
        }
        catch (error) {
            toast.error(error.response?.data?.message || error.message);

        }
    }

    //logout function to handle user logout and socket disconnection
    const logout = async () => {
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUser([]);

        delete axios.defaults.headers.common["Authorization"];

        toast.success("logged out successfully")
        socket?.disconnect();
    }

    //update profile function
    const updateProfile = async (body) => {
        try {
            const { data } = await axios.put("/api/auth/update-profile", body);
            if (data.success) {
                setAuthUser(data.user);
                toast.success("Profile updated successfuly")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //connect socket function to handle socket connection and online users updates
    const connectSocket = (userData) => {
        if (!userData || socket?.connected) return;
        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id,
            }
        });
        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds) => {
            setOnlineUser(userIds);
        })
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            checkAuth();
        } else {
            setAuthUser(null);
            setLoading(false);
        }
    }, [])

    const value = {
        axios,
        authUser,
        loading,
        onlineUser,
        socket,
        login,
        logout,
        updateProfile
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}