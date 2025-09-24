import axios from "axios";

const API_KEY = "22d2ad53c524c3f6017e96e992a37db5";
const BASE_URL = "https://data.orghunter.com/v1";

export const searchNonprofits = async (searchTerm) => {
    try{
        const response = await axios.get('${BASE_URL}/charitysearch', {
            params: {
                user_key: API_KEY,
                searchTerm: searchTerm,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching nonprofits: ",error);
        return null;
    }
};