import { jwtDecode } from 'jwt-decode';

export const isTokenValid = () => {
    const token = localStorage.getItem('token');
    console.log("Checking token validity:", token);
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
            return true; // Token is valid
        } else {
            console.log("Token expired, removing from localStorage.");
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail'); // 🚫 Remove expired token automatically
            return false;
        }
    } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
         // 🚫 Remove invalid/corrupted token automatically
        return false;
    }
};
