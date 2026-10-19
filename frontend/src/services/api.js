const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://portfolio-swho.onrender.com/api";

const getAuthHeaders = (token) => {
  const authToken = token || localStorage.getItem("portfolio_token");
  return {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
  };
};

export const fetchInformation = async () => {
  const response = await fetch(`${API_BASE_URL}/profile`);
  if (!response.ok) {
    throw new Error(`Failed to fetch profile information: ${response.statusText}`);
  }
  return response.json();
};

export const fetchSkills = async () => {
  const response = await fetch(`${API_BASE_URL}/skills`);
  if (!response.ok) {
    throw new Error(`Failed to fetch skills: ${response.statusText}`);
  }
  return response.json();
};

export const fetchWorkExperience = async () => {
  const response = await fetch(`${API_BASE_URL}/experience`);
  if (!response.ok) {
    throw new Error(`Failed to fetch work experience: ${response.statusText}`);
  }
  return response.json();
};

export const fetchEducation = async () => {
  const response = await fetch(`${API_BASE_URL}/education`);
  if (!response.ok) {
    throw new Error(`Failed to fetch education: ${response.statusText}`);
  }
  return response.json();
};

export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
  }
  return response.json();
};

export const loginAdmin = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  if (data.token) {
    localStorage.setItem("portfolio_token", data.token);
  }
  return data;
};

export const fetchPortfolioData = async () => {
  const response = await fetch(`${API_BASE_URL}/portfolio`);
  if (!response.ok) {
    throw new Error(`Failed to fetch portfolio data: ${response.statusText}`);
  }
  return response.json();
};

export const updateProfileData = async (data, token) => {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
};

export const updateSkillsData = async (data, token) => {
  const response = await fetch(`${API_BASE_URL}/skills`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Failed to update skills");
  return response.json();
};

export const createItem = async (resource, data, token) => {
  const response = await fetch(`${API_BASE_URL}/${resource}`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error(`Failed to create ${resource}`);
  return response.json();
};

export const updateItem = async (resource, id, data, token) => {
  const response = await fetch(`${API_BASE_URL}/${resource}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error(`Failed to update ${resource}`);
  return response.json();
};

export const deleteItem = async (resource, id, token) => {
  const response = await fetch(`${API_BASE_URL}/${resource}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token)
  });
  if (!response.ok) throw new Error(`Failed to delete ${resource}`);
  return response.json();
};
