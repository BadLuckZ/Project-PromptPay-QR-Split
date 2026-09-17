// Session stored for 7 days
export const SOFT_SESSION_TIMEOUT_MS = 7 * 24 * 60 * 60 * 1000;

// Channel to send "SIGNED_OUT" signal
const LOGOUT_CHANNEL_NAME = "qr-split-logout";
let logoutChannel: BroadcastChannel | null = null;

function getLogoutChannel() {
  if (typeof BroadcastChannel === "undefined") return null;
  if (!logoutChannel) logoutChannel = new BroadcastChannel(LOGOUT_CHANNEL_NAME);
  return logoutChannel;
}

export function broadcastLogout() {
  getLogoutChannel()?.postMessage("SIGNED_OUT");
}

export function subscribeToLogoutBroadcast(onSignedOut: () => void) {
  const channel = getLogoutChannel();
  if (!channel) return () => {};
  const handler = () => onSignedOut();
  channel.addEventListener("message", handler);
  return () => channel.removeEventListener("message", handler);
}
