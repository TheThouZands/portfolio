import { bigint, pgTable, text } from "drizzle-orm/pg-core";

export const comments = pgTable("comments", {
  comment: text(),
  id: bigint({ mode: "number" })
    .primaryKey()
    .generatedByDefaultAsIdentity({
      name: "comments_id_seq",
    }),
});
