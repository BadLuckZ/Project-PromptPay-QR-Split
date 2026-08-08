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
