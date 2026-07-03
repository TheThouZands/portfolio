"use client";

import { usePathname } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";

import {
  getBlogPostStatusLabel,
  getBlogPostStatusPermissionEndpoint,
  type BlogPostStatusPermissionData,
} from "@/auth/blog-post-status-permission";
import type { PermissionPayload } from "@/auth/permission-island";
import { authRoleMeetsMinimum } from "@/auth/role-policy";
import type { AuthSessionState } from "@/auth/session-state";
import {
  updateBlogPostStatusAction,
  type UpdateBlogPostStatusActionState,
} from "@/blog/actions";
import { usePermissionIsland } from "@/components/auth/usePermissionIsland";

type PostStatusSelectorIslandProps = {
  blogPostId: number;
  initialPayload?: PermissionPayload<BlogPostStatusPermissionData>;
};

const initialState: UpdateBlogPostStatusActionState = {
  status: "idle",
  message: "",
};

function enabledWhenOwnerSession(
  session: Extract<AuthSessionState, { status: "authenticated" }>,
) {
  return authRoleMeetsMinimum(session.user.role, "owner");
}

export function PostStatusSelectorIsland({
  blogPostId,
  initialPayload,
}: PostStatusSelectorIslandProps) {
  const pathname = usePathname();
  const handledStateRef = useRef<UpdateBlogPostStatusActionState | null>(null);
  const [state, formAction, isPending] = useActionState(
    updateBlogPostStatusAction,
    initialState,
  );
  const { payload, refetch, status } =
    usePermissionIsland<BlogPostStatusPermissionData>({
      enabledWhenSession: enabledWhenOwnerSession,
      endpoint: getBlogPostStatusPermissionEndpoint(blogPostId),
      initialPayload,
    });

  useEffect(() => {
    if (state.status !== "success" || handledStateRef.current === state) {
      return;
    }

    handledStateRef.current = state;
    refetch();
  }, [refetch, state]);

  if (status === "hidden") {
    return null;
  }

  const isBusy = isPending || status === "loading" || status === "refreshing";

  if (!payload.visible) {
    return (
      <div aria-live="polite" data-permission-island="blog-post-status">
        <label>
          Post status
          <select disabled>
            <option>
              {status === "error" ? "Could not load status" : "Loading status..."}
            </option>
          </select>
        </label>
      </div>
    );
  }

  const hasCurrentOption = payload.data.options.some(
    (option) => option.value === payload.data.currentStatus,
  );

  return (
    <form
      action={formAction}
      aria-live="polite"
      data-permission-island="blog-post-status"
    >
      <input name="blogPostId" type="hidden" value={blogPostId} />
      <input name="pathname" type="hidden" value={pathname} />
      <label>
        Post status
        <select
          defaultValue={payload.data.currentStatus}
          disabled={isBusy}
          key={payload.data.currentStatus}
          name="status"
          onChange={(event) => {
            if (event.currentTarget.value === payload.data.currentStatus) {
              return;
            }

            event.currentTarget.form?.requestSubmit();
          }}
        >
          {!hasCurrentOption ? (
            <option disabled value={payload.data.currentStatus}>
              {getBlogPostStatusLabel(payload.data.currentStatus)} (current)
            </option>
          ) : null}
          {payload.data.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {isPending ? <p>Saving status...</p> : null}
      {status === "refreshing" ? <p>Refreshing status...</p> : null}
      {state.status === "error" ? <p>{state.message}</p> : null}
      {status === "error" ? <p>Could not load status.</p> : null}
    </form>
  );
}
