const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8787';

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || '请求失败');
  }
  return data;
}

export async function apiLogin(email: string, password: string) {
  return request('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function apiMe() {
  return request('/api/me');
}

export async function apiLogout() {
  return request('/api/logout', { method: 'POST' });
}

export { API_BASE };
