const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://portfolio-swho.onrender.com/api";

const SNAPSHOT_URL = `${process.env.PUBLIC_URL || ""}/portfolio.json`;
const SECTION_CACHE_PREFIX = "eslam_portfolio_section_";

let snapshotPromise = null;

// Load static snapshot file (public/portfolio.json) once and memoize
export const fetchStaticSnapshot = async () => {
  if (!snapshotPromise) {
    snapshotPromise = fetch(SNAPSHOT_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load static portfolio.json");
        return res.json();
      })
      .catch((err) => {
        snapshotPromise = null;
        throw err;
      });
  }
  return snapshotPromise;
};

// Helper: reads cached section from localStorage or static public/portfolio.json file
export const getFallbackSectionData = async (sectionKey, bundledFallback) => {
  try {
    const cached = localStorage.getItem(`${SECTION_CACHE_PREFIX}${sectionKey}`);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (err) {
    // Ignore storage read errors
  }

  try {
    const snapshot = await fetchStaticSnapshot();
    if (snapshot && snapshot[sectionKey]) {
      return snapshot[sectionKey];
    }
  } catch (err) {
    // Ignore static fetch errors and return bundled fallback
  }

  return bundledFallback;
};

// Helper: fetches live backend data, but if backend is cold-starting (>1200ms),
// immediately delivers the static file / cached data via onFallbackReady
// and then delivers the live backend data via onLiveReady when the server wakes up!
export const fetchWithWarmupFallback = (
  liveFetchFn,
  sectionKey,
  bundledFallback,
  { onData, onLoadingChange, timeoutMs = 1200 }
) => {
  let isCancelled = false;
  let liveResolved = false;

  const timerId = setTimeout(async () => {
    if (isCancelled || liveResolved) return;
    const fallbackData = await getFallbackSectionData(
      sectionKey,
      bundledFallback
    );
    if (!isCancelled && !liveResolved && fallbackData) {
      onData(fallbackData, "fallback");
      onLoadingChange(false);
    }
  }, timeoutMs);

  liveFetchFn()
    .then((liveData) => {
      liveResolved = true;
      clearTimeout(timerId);
      if (isCancelled) return;
      if (liveData) {
        onData(liveData, "live");
        try {
          localStorage.setItem(
            `${SECTION_CACHE_PREFIX}${sectionKey}`,
            JSON.stringify(liveData)
          );
        } catch (err) {
          // Ignore storage quota errors
        }
      }
      onLoadingChange(false);
    })
    .catch(async (err) => {
      liveResolved = true;
      clearTimeout(timerId);
      if (isCancelled) return;
      console.warn(
        `Backend unreachable for ${sectionKey}, using static portfolio.json fallback:`,
        err.message
      );
      const fallbackData = await getFallbackSectionData(
        sectionKey,
        bundledFallback
      );
      if (!isCancelled && fallbackData) {
        onData(fallbackData, "fallback");
      }
      onLoadingChange(false);
    });

  return () => {
    isCancelled = true;
    clearTimeout(timerId);
  };
};

const getAuthHeaders = (token) => {
  const authToken = token || localStorage.getItem("portfolio_token");
  return {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
  };
};

// ==================== PUBLIC SECTION ENDPOINTS ====================

export const fetchInformation = async () => {
  const response = await fetch(`${API_BASE_URL}/profile`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch profile information: ${response.statusText}`
    );
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

export const fetchPortfolioData = async () => {
  const response = await fetch(`${API_BASE_URL}/portfolio`);
  if (!response.ok) {
    throw new Error(`Failed to fetch portfolio data: ${response.statusText}`);
  }
  return response.json();
};

// ==================== AUTH & PROTECTED CRUD ENDPOINTS ====================

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
