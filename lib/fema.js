export const FEMA_BASE =
  process.env.NEXT_PUBLIC_FEMA_API_BASE ||
  "https://www.fema.gov/api/open";

export async function fetchFema(entity, {
  version = "v2",
  apiKey = process.env.NEXT_PUBLIC_FEMA_API_KEY,
  params = {}
} = {}) {
  if (!apiKey) {
    throw new Error("FEMA API key not set in NEXT_PUBLIC_FEMA_API_KEY");
  }
  const url = new URL(`${FEMA_BASE}/${version}/${entity}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
  url.searchParams.append("api_key", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`FEMA API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
