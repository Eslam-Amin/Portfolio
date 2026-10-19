const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://portfolio-swho.onrender.com/api";

export const fetchPortfolioData = async () => {
  const response = await fetch(`${API_BASE_URL}/portfolio`);
  if (!response.ok) {
    throw new Error(`Failed to fetch portfolio data: ${response.statusText}`);
  }
  return response.json();
};

export const updateProfileData = async (data) => {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
};

export const updateSkillsData = async (data) => {
  const response = await fetch(`${API_BASE_URL}/skills`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Failed to update skills");
  return response.json();
};

export const createItem = async (resource, data) => {
  const response = await fetch(`${API_BASE_URL}/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error(`Failed to create ${resource}`);
  return response.json();
};

export const updateItem = async (resource, id, data) => {
  const response = await fetch(`${API_BASE_URL}/${resource}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error(`Failed to update ${resource}`);
  return response.json();
};

export const deleteItem = async (resource, id) => {
  const response = await fetch(`${API_BASE_URL}/${resource}/${id}`, {
    method: "DELETE"
  });
  if (!response.ok) throw new Error(`Failed to delete ${resource}`);
  return response.json();
};
