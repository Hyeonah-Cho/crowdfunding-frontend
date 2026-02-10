// Custom error class to keep HTTP status and raw response data together
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Convert common HTTP status codes into simple, user friendly messages
function toFriendlyMessage(status, fallback) {
  if (status === 400) {
    return "The information provided is not valid. Please check and try again.";
  }
  if (status === 401) {
    return "You need to be logged in to perform this action.";
  }
  if (status === 403) {
    return "You do not have permission to perform this action.";
  }
  if (status === 404) {
    return "The requested resource could not be found.";
  }
  if (status >= 500) {
    return "A server error occurred. Please try again later.";
  }
  return fallback;
}

// Generic helper for making JSON-based API requests
export async function requestJson(
  url,
  options = {},
  fallbackError = "The request failed.",
) {
  let response;

  try {
    response = await fetch(url, options);
  } catch (error) {
    // Network-level errors (e.g. server down, no internet, CORS issues)
    throw new ApiError(
      "A network error occurred. Please check your connection and try again.",
      0,
      null,
    );
  }

  // Successful response
  if (response.ok) {
    // Some endpoints may return no body (eg - 204 No Content)
    const text = await response.text().catch(() => "");
    return text ? JSON.parse(text) : null;
  }

  // Failed response
  const contentType = response.headers.get("content-type") || "";
  let data = null;

  // Attempt to parse JSON error responses safely
  if (contentType.includes("application/json")) {
    data = await response.json().catch(() => null);
  } else {
    const text = await response.text().catch(() => "");
    data = text ? { detail: text } : null;
  }

  // Prefer server-provided messages when available
  const serverMessage =
    data?.detail ||
    data?.message ||
    (typeof data === "string" ? data : null) ||
    null;

  const message =
    serverMessage || toFriendlyMessage(response.status, fallbackError);

  throw new ApiError(message, response.status, data);
}
