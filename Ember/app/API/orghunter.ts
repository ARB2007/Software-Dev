export interface NonProfit {
  ein: string;
  charityName: string;
  city: string;
  state: string;
}

const API_KEY = "22d2ad53c524c3f6017e96e992a37db5";
const BASE_URL = "https://data.orghunter.com/v1/charitysearch";

export async function searchNonProfits(query: string): Promise<{ data: NonProfit[] }> {
  try {
    const response = await fetch(`${BASE_URL}?user_key=${API_KEY}&searchTerm=${encodeURIComponent(query)}`);
    const json = await response.json();

    if (json && json.data) {
      const nonProfits: NonProfit[] = json.data.map((item: any) => ({
        ein: item.ein,
        charityName: item.charityName || item.CHARITY_NAME,
        city: item.city || item.CITY,
        state: item.state || item.STATE,
      }));
      
      return {data : nonProfits};
}

return {data:[]};
  } catch (error) {
    console.error("Error Fetching Nonprofits: ",error);
    return {data:[]};
  }
}