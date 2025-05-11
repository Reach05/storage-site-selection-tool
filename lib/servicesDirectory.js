import fetch from 'cross-fetch';

/**
 * Handles OAuth + Service Directory edits against your ArcGIS portal
 */
const ARC_OAUTH_URL = "https://www.arcgis.com/sharing/rest/oauth2/token";
const EDIT_URL = "https://rdmi/system/handlers/rest/servicesdirectory/edit";

/**
 * Acquire a token using client credentials,
 * falling back to the temp token if that fails.
 */
async function getArcgisToken() {
  const params = new URLSearchParams({
    client_id: process.env.ARCGIS_CLIENT_ID,
    client_secret: process.env.ARCGIS_CLIENT_SECRET,
    grant_type: "client_credentials",
    expiration: "1440",
    f: "json",
  });

  try {
    const resp = await fetch(ARC_OAUTH_URL, {
      method: "POST",
      body: params,
    });
    const json = await resp.json();
    if (json.access_token) {
      return json.access_token;
    }
    console.warn(
      "✨ OAuth didn’t return access_token, falling back to temp token"
    );
  } catch (err) {
    console.warn(
      "⚠️ OAuth token fetch failed, falling back to temp token:",
      err
    );
  }

  // fallback
  return process.env.ARCGIS_TEMP_TOKEN;
}

/**
 * Edit your Services Directory. `config` is the JSON your endpoint expects.
 */
export async function updateServicesDirectory(config) {
  const token = await getArcgisToken();
  const params = new URLSearchParams({
    token,
    f: "json",
    directoryConfig: JSON.stringify(config),
  });

  const resp = await fetch(EDIT_URL, {
    method: "POST",
    body: params,
  });

  if (!resp.ok) {
    throw new Error(`Edit failed: ${resp.status} ${resp.statusText}`);
  }
  return resp.json();
}
