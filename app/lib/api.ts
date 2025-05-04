function buildUrl(path: string, params?: Record<string, string | number>) {
  const url = new URL(path);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value.toString())
    );
  }
  return url.toString();
}

export async function apiGet<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const res = await fetch(buildUrl(path, options.params), {
    ...options,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`GET ${path} failed: ${res.status}`);
  }

  return res.json();
}