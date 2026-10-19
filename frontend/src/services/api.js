const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const fetchPortfolioData = async () => {
  const response = await fetch(`${API_BASE_URL}/portfolio`);
  if (!response.ok) {
    throw new Error(`Failed to fetch portfolio data: ${response.statusText}`);
  }
  return response.json();
};
