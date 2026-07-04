export const BLOG_COMMENT_BODY_MAX_LENGTH = 5000;

export type BlogCommentBodyValidation =
  | {
      body: string;
      reason: null;
      valid: true;
    }
  | {
      body: string;
      reason: "empty" | "too_long";
      valid: false;
    };

export function validateBlogCommentBody(value: string): BlogCommentBodyValidation {
  const body = value.trim();

  if (!body) {
    return {
      body,
      reason: "empty",
      valid: false,
    };
  }

  if (body.length > BLOG_COMMENT_BODY_MAX_LENGTH) {
    return {
      body,
      reason: "too_long",
      valid: false,
    };
  }

  return {
    body,
    reason: null,
    valid: true,
  };
}
