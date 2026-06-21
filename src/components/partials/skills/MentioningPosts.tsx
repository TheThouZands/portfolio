import BlogMentioningPosts from "@/components/partials/blog/MentioningPosts";

type MentioningPostsSkill = {
  entityId: number;
};

type MentioningPostsProps = {
  locale: string;
  skill: MentioningPostsSkill;
};

export default function MentioningPosts({
  locale,
  skill,
}: MentioningPostsProps) {
  return <BlogMentioningPosts entityId={skill.entityId} locale={locale} />;
}
