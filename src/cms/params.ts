import "server-only";

export function parseId(value: string) {
  // Route IDs must be only digits: ^ starts the string, \d+ accepts one or more digits, $ ends it.
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const id = Number(value);
  // redundancy check
  if (!Number.isSafeInteger(id) || id <= 0) {
    return null;
  }

  return id;
}
