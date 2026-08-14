const API_URL = "http://localhost:5000";

export const testBackend = async () => {
  const response = await fetch(`${API_URL}/`);

  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed.");
  }

  return data;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed.");
  }

  return data;
};

export const createIssue = async (issueData, token) => {
  const response = await fetch(`${API_URL}/api/issues`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(issueData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to report issue.");
  }

  return data;
};

export const getMyIssues = async (token) => {
  const response = await fetch(`${API_URL}/api/issues/my`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch issues.");
  }

  return data.issues;
};