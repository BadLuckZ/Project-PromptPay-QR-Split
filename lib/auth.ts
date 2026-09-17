// Session stored for 7 days
export const SOFT_SESSION_TIMEOUT_MS = 7 * 24 * 60 * 60 * 1000;

// Tracks a logout the user triggered on purpose
let userLoggedOut = false;

export function markUserLogout() {
  userLoggedOut = true;
}

export function consumeUserLogout() {
  const value = userLoggedOut;
  userLoggedOut = false;
  return value;
}
