// Session stored for 7 days
export const SOFT_SESSION_TIMEOUT_MS = 7 * 24 * 60 * 60 * 1000;

// Channel to send "SIGNED_OUT" signal
const LOGOUT_CHANNEL_NAME = "qr-split-logout";

export function broadcastLogout() {
  if (typeof BroadcastChannel === "undefined") return;
  const channel = new BroadcastChannel(LOGOUT_CHANNEL_NAME);
  channel.postMessage("SIGNED_OUT");
  channel.close();
}

export function subscribeToLogoutBroadcast(onSignedOut: () => void) {
  if (typeof BroadcastChannel === "undefined") return () => {};
  const channel = new BroadcastChannel(LOGOUT_CHANNEL_NAME);
  channel.onmessage = () => onSignedOut();
  return () => channel.close();
}
