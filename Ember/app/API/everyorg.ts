export interface NonProfit {
  ein: string;
  charityName: string;
  city: string;
  state: string;
  slug: string;
}

export async function searchNonProfits(query: string): Promise<{ data: NonProfit[] }> {
  if (!query) return { 
    data: [] 
  };
  try {
    const response = await fetch(
      `https://partners.every.org/v0.2/search/REDTERM?apiKey=pk_live_e9421b63a6289e5120a34d362325fec9`
    );
    const json = await response.json();

    if (json && json.nonprofits) {
      const nonprofits: NonProfit[] = json.nonprofits.map((item: any) => ({
        ein: item.ein || "N/A",
        charityName: item.name || "Unknown",
        city: item.location?.city || "N/A",
        state: item.location?.state || "N/A",
        slug: item.slug,
      }));
      return { data: nonprofits };
    }

    return { data: [] };
  } catch (error) {
    console.error("Error fetching nonprofits:", error);
    return { data: [] };
  }
}
