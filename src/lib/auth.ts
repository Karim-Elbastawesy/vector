export interface AuthUser {
  name: string;
  email: string;
  token: string;
  id: string;
}

export function saveAuth(user: AuthUser) {
  localStorage.setItem("vector_token", user.token);
  localStorage.setItem(
    "vector_user",
    JSON.stringify({ name: user.name, email: user.email, id: user.id }),
  );
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("vector_token");
}

export function getUser(): { name: string; email: string; id: string } | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("vector_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem("vector_token");
  localStorage.removeItem("vector_user");
}
