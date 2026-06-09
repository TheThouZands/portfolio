import "server-only";

const publicStatuses = ["published"] as const;
const developmentStatuses = ["published", "testing"] as const;

function canShowTestingContent() {
  return process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview";
}

export function getVisibleCmsStatuses() {
  return canShowTestingContent() ? developmentStatuses : publicStatuses;
}
