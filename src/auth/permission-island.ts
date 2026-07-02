export type PermissionPayload<T> =
  | {
      visible: false;
    }
  | {
      data: T;
      visible: true;
    };

export function hiddenPermissionPayload<T>(): PermissionPayload<T> {
  return {
    visible: false,
  };
}

export function isPermissionPayload<T = unknown>(
  value: unknown,
): value is PermissionPayload<T> {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Partial<PermissionPayload<T>>;

  if (payload.visible === false) {
    return true;
  }

  return payload.visible === true && "data" in payload;
}

export function normalizePermissionPayload<T>(
  value: unknown,
): PermissionPayload<T> {
  return isPermissionPayload<T>(value) ? value : hiddenPermissionPayload<T>();
}
