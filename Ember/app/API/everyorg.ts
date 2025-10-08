export interface NonProfit {
  ein: string;
  charityName: string;
  city: string;
  state: string;
}

export async function searchNonProfits(query: string): Promise<{ data: NonProfit[] }> {
  try {
    const response = await fetch(`https://partners.every.org/v0.2/search/${encodeURIComponent(query)}`);
    const json = await response.json();

    if (json && json.nonprofits) {
      const nonprofits: NonProfit[] = json.nonprofits.map((item: any) => ({
        ein: item.ein || "N/A",
        charityName: item.name,
        city: item.location?.city || "N/A",
        state: item.location?.state || "N/A",
      }));
      return { data: nonprofits };
    }

    return { data: [] };
  } catch (error) {
    console.error("Error fetching nonprofits:", error);
    return { data: [] };
  }
}
