import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });
config();

const databaseUrl = process.env.PF_DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing PF_DATABASE_URL environment variable.");
}

const sql = neon(databaseUrl);
const structuralContentVersion = 1;

const blobUrls = [
  {
    url: "https://gh6jcohtaeos2is5.public.blob.vercel-storage.com/jane10-g50-1.webp",
    translations: {
      en: {
        altText: "Demo Jane portfolio image at grade 50.",
      },
      es: {
        altText: "Imagen demo Jane de portafolio en calidad 50.",
      },
    },
  },
  {
    url: "https://gh6jcohtaeos2is5.public.blob.vercel-storage.com/jane10-g80-1.webp",
    translations: {
      en: {
        altText: "Demo Jane portfolio image at grade 80.",
      },
      es: {
        altText: "Imagen demo Jane de portafolio en calidad 80.",
      },
    },
  },
  {
    url: "https://gh6jcohtaeos2is5.public.blob.vercel-storage.com/jane10-g90-1.webp",
    translations: {
      en: {
        altText: "Demo Jane portfolio image at grade 90.",
      },
      es: {
        altText: "Imagen demo Jane de portafolio en calidad 90.",
      },
    },
  },
];

function toBlobAsset({ translations, url }) {
  const parsedUrl = new URL(url);
  const pathname = parsedUrl.pathname.replace(/^\//, "");
  const filename = pathname.split("/").pop();
  const defaultTranslation = translations.en;

  return {
    access: "public",
    altText: defaultTranslation.altText,
    blobStoreId: parsedUrl.hostname.split(".")[0],
    contentDisposition: `inline; filename="${filename}"`,
    contentType: "image/webp",
    downloadUrl: `${url}?download=1`,
    pathname,
    translations,
    url,
  };
}

async function createContentEntity(type) {
  const [row] = await sql`
    INSERT INTO content_entities (
      type
    )
    VALUES (
      ${type}
    )
    RETURNING id
  `;

  return Number(row.id);
}

function createStructuralDocument(content) {
  return {
    content,
    type: "structural-content",
    version: structuralContentVersion,
  };
}

function createTextNode(content) {
  return {
    content,
    type: "text",
  };
}

function createParagraph(id, content) {
  return {
    attrs: {
      id,
    },
    content: createTextNode(content),
    type: "p",
  };
}

function createArticleParagraphSource(translation) {
  return createStructuralDocument({
    attrs: {
      data: {
        "seed-shape": "article-paragraphs",
      },
    },
    content: [
      createParagraph("intro", translation.intro),
      createParagraph("body", translation.body),
    ],
    type: "article",
  });
}

function createNestedDivSource(translation) {
  return createStructuralDocument({
    attrs: {
      data: {
        "seed-shape": "nested-divs",
      },
      id: "nested-demo",
    },
    content: [
      createTextNode(translation.intro),
      {
        attrs: {
          id: "nested-body-shell",
        },
        content: {
          attrs: {
            id: "nested-body",
          },
          content: createTextNode(translation.body),
          type: "div",
        },
        type: "div",
      },
    ],
    type: "div",
  });
}

function createMentionCardSource(translation, mentionBlocks) {
  return createStructuralDocument({
    attrs: {
      data: {
        "seed-shape": "mention-cards",
      },
    },
    content: [
      createParagraph("intro", translation.intro),
      ...mentionBlocks.map((mention) => ({
        attrs: {
          data: {
            "content-entity-id": mention.entityId,
            "content-entity-type": mention.entityType,
            "content-reference-card": true,
          },
          id: mention.id,
        },
        content: [
          createParagraph(`${mention.id}-title`, mention.title),
          createParagraph(`${mention.id}-description`, mention.description),
        ],
        type: "div",
      })),
      createParagraph("body", translation.body),
    ],
    type: "div",
  });
}

function createDeepNestingSource(translation) {
  return createStructuralDocument({
    attrs: {
      data: {
        "seed-shape": "deep-nesting",
      },
    },
    content: [
      createTextNode(translation.intro),
      {
        attrs: {
          id: "deep-section",
        },
        content: [
          createParagraph("deep-first-paragraph", translation.body),
          {
            attrs: {
              id: "deep-sibling-group",
            },
            content: [
              {
                content: "Bare primitive string inside an element.",
                type: "p",
              },
              {
                attrs: {
                  id: "deep-nested-element",
                },
                content: {
                  attrs: {
                    id: "deep-inner-element",
                  },
                  content: [
                    createTextNode("Explicit text node at the edge."),
                    {
                      content: createTextNode("Nested sibling element content."),
                      type: "span",
                    },
                  ],
                  type: "div",
                },
                type: "div",
              },
            ],
            type: "div",
          },
        ],
        type: "section",
      },
      {
        attrs: {
          id: "deep-footer",
        },
        content: createParagraph("deep-footer-copy", translation.footer),
        type: "footer",
      },
    ],
    type: "div",
  });
}

function createImageElementSource(translation, inlineAssetId, inlineAssetUrl) {
  return createStructuralDocument({
    attrs: {
      data: {
        "seed-shape": "image-elements",
      },
    },
    content: [
      createParagraph("image-intro", translation.intro),
      {
        attrs: {
          id: "image-figure",
        },
        content: [
          {
            attrs: {
              alt: translation.imageAltText,
              assetId: inlineAssetId,
              id: "image-asset",
              src: inlineAssetUrl,
            },
            type: "img",
          },
          {
            attrs: {
              id: "image-caption",
            },
            content: createTextNode(translation.imageCaption),
            type: "figcaption",
          },
        ],
        type: "figure",
      },
      createParagraph("image-body", translation.body),
    ],
    type: "div",
  });
}

function createBlogSourceJson(
  translation,
  mentionBlocks,
  sourceShape,
  inlineAssetId,
  inlineAssetUrl,
) {
  if (sourceShape === "deep-nesting") {
    return createDeepNestingSource(translation);
  }

  if (sourceShape === "image-elements") {
    return createImageElementSource(translation, inlineAssetId, inlineAssetUrl);
  }

  if (sourceShape === "nested-divs") {
    return createNestedDivSource(translation);
  }

  if (sourceShape === "mention-cards") {
    return createMentionCardSource(translation, mentionBlocks);
  }

  return createArticleParagraphSource(translation);
}

function createProjectSourceJson(translation) {
  return createStructuralDocument({
    attrs: {
      data: {
        "seed-shape": "project-section",
      },
    },
    content: [
      createParagraph("project-overview", translation.overview),
      {
        attrs: {
          id: "project-summary",
        },
        content: createParagraph("project-summary-copy", translation.shortDescription),
        type: "section",
      },
    ],
    type: "section",
  });
}

async function upsertMediaAsset(asset) {
  const [row] = await sql`
    INSERT INTO media_assets (
      pathname,
      url,
      download_url,
      access,
      blob_store_id,
      alt_text,
      content_type,
      content_disposition,
      uploaded_at
    )
    VALUES (
      ${asset.pathname},
      ${asset.url},
      ${asset.downloadUrl},
      ${asset.access},
      ${asset.blobStoreId},
      ${asset.altText},
      ${asset.contentType},
      ${asset.contentDisposition},
      now()
    )
    ON CONFLICT (pathname) DO UPDATE SET
      url = excluded.url,
      download_url = excluded.download_url,
      access = excluded.access,
      blob_store_id = excluded.blob_store_id,
      alt_text = excluded.alt_text,
      content_type = excluded.content_type,
      content_disposition = excluded.content_disposition,
      updated_at = now()
    RETURNING id
  `;

  return Number(row.id);
}

async function upsertMediaAssetTranslations(assetId, asset) {
  for (const [locale, translation] of Object.entries(asset.translations)) {
    await sql`
      INSERT INTO media_asset_translations (
        media_asset_id,
        locale,
        alt_text
      )
      VALUES (
        ${assetId},
        ${locale},
        ${translation.altText}
      )
      ON CONFLICT (media_asset_id, locale) DO UPDATE SET
        alt_text = excluded.alt_text
    `;
  }
}

async function upsertCompany(company) {
  const defaultTranslation = company.translations.en;
  const [existingCompany] = await sql`
    SELECT id
    FROM companies
    WHERE slug = ${defaultTranslation.slug}
    LIMIT 1
  `;

  if (existingCompany) {
    const [row] = await sql`
      UPDATE companies
      SET
        company_name = ${defaultTranslation.name},
        website_url = ${company.websiteUrl},
        summary = ${defaultTranslation.summary},
        logo_asset_id = ${company.logoAssetId},
        updated_at = now()
      WHERE id = ${existingCompany.id}
      RETURNING id
    `;

    return Number(row.id);
  }

  const entityId = await createContentEntity("company");
  const [row] = await sql`
    INSERT INTO companies (
      entity_id,
      company_name,
      slug,
      website_url,
      summary,
      logo_asset_id
    )
    VALUES (
      ${entityId},
      ${defaultTranslation.name},
      ${defaultTranslation.slug},
      ${company.websiteUrl},
      ${defaultTranslation.summary},
      ${company.logoAssetId}
    )
    RETURNING id
  `;

  return Number(row.id);
}

async function upsertCompanyTranslations(companyId, company) {
  for (const [locale, translation] of Object.entries(company.translations)) {
    await sql`
      INSERT INTO company_translations (
        company_id,
        locale,
        company_name,
        slug,
        summary
      )
      VALUES (
        ${companyId},
        ${locale},
        ${translation.name},
        ${translation.slug},
        ${translation.summary}
      )
      ON CONFLICT (company_id, locale) DO UPDATE SET
        company_name = excluded.company_name,
        slug = excluded.slug,
        summary = excluded.summary
    `;
  }
}

async function upsertSkill(skill) {
  const [existingSkill] = await sql`
    SELECT id
    FROM skills
    WHERE slug = ${skill.slug}
    LIMIT 1
  `;

  if (existingSkill) {
    const [row] = await sql`
      UPDATE skills
      SET
        name = ${skill.name},
        category = ${skill.category}
      WHERE id = ${existingSkill.id}
      RETURNING id
    `;

    return Number(row.id);
  }

  const entityId = await createContentEntity("skill");
  const [row] = await sql`
    INSERT INTO skills (
      entity_id,
      name,
      slug,
      category
    )
    VALUES (
      ${entityId},
      ${skill.name},
      ${skill.slug},
      ${skill.category}
    )
    RETURNING id
  `;

  return Number(row.id);
}

async function upsertExperience(entry) {
  const defaultTranslation = entry.translations.en;
  const [existingExperience] = await sql`
    SELECT id, entity_id
    FROM experience
    WHERE company_id = ${entry.companyId}
      AND position_title = ${defaultTranslation.positionTitle}
    ORDER BY id
    LIMIT 1
  `;

  if (existingExperience) {
    const [row] = await sql`
      UPDATE experience
      SET
        position_title = ${defaultTranslation.positionTitle},
        employment_type = ${entry.employmentType},
        is_current = ${entry.isCurrent},
        start_date = ${entry.startDate},
        end_date = ${entry.endDate},
        location_label = ${defaultTranslation.locationLabel},
        location_type = ${entry.locationType},
        role_summary = ${defaultTranslation.roleSummary},
        company_context = ${defaultTranslation.companyContext},
        sort_order = ${entry.sortOrder},
        status = ${entry.status},
        featured = ${entry.featured},
        updated_at = now()
      WHERE id = ${existingExperience.id}
      RETURNING id, entity_id
    `;

    return {
      entityId: Number(row.entity_id),
      id: Number(row.id),
    };
  }

  const entityId = await createContentEntity("experience");
  const [row] = await sql`
    INSERT INTO experience (
      entity_id,
      position_title,
      employment_type,
      is_current,
      company_id,
      start_date,
      end_date,
      location_label,
      location_type,
      role_summary,
      company_context,
      sort_order,
      status,
      featured
    )
    VALUES (
      ${entityId},
      ${defaultTranslation.positionTitle},
      ${entry.employmentType},
      ${entry.isCurrent},
      ${entry.companyId},
      ${entry.startDate},
      ${entry.endDate},
      ${defaultTranslation.locationLabel},
      ${entry.locationType},
      ${defaultTranslation.roleSummary},
      ${defaultTranslation.companyContext},
      ${entry.sortOrder},
      ${entry.status},
      ${entry.featured}
    )
    RETURNING id, entity_id
  `;

  return {
    entityId: Number(row.entity_id),
    id: Number(row.id),
  };
}

async function clearExperienceChildren(experienceId) {
  await sql`
    DELETE FROM experience_bullets
    WHERE experience_id = ${experienceId}
  `;

  await sql`
    DELETE FROM experience_media
    WHERE experience_id = ${experienceId}
  `;

  await sql`
    DELETE FROM experience_skills
    WHERE experience_id = ${experienceId}
  `;
}

async function upsertExperienceTranslations(experienceId, entry) {
  for (const [locale, translation] of Object.entries(entry.translations)) {
    await sql`
      INSERT INTO experience_translations (
        experience_id,
        locale,
        position_title,
        location_label,
        role_summary,
        company_context
      )
      VALUES (
        ${experienceId},
        ${locale},
        ${translation.positionTitle},
        ${translation.locationLabel},
        ${translation.roleSummary},
        ${translation.companyContext}
      )
      ON CONFLICT (experience_id, locale) DO UPDATE SET
        position_title = excluded.position_title,
        location_label = excluded.location_label,
        role_summary = excluded.role_summary,
        company_context = excluded.company_context
    `;
  }
}

async function insertExperienceChildren(experienceId, entry, skillIds) {
  for (const [sortOrder, bullet] of entry.bullets.entries()) {
    const defaultTranslation = bullet.translations.en;
    const [experienceBullet] = await sql`
      INSERT INTO experience_bullets (
        experience_id,
        type,
        body,
        sort_order
      )
      VALUES (
        ${experienceId},
        ${bullet.type},
        ${defaultTranslation.body},
        ${sortOrder}
      )
      RETURNING id
    `;

    for (const [locale, translation] of Object.entries(bullet.translations)) {
      await sql`
        INSERT INTO experience_bullet_translations (
          experience_bullet_id,
          locale,
          body
        )
        VALUES (
          ${experienceBullet.id},
          ${locale},
          ${translation.body}
        )
      `;
    }
  }

  for (const [sortOrder, skillSlug] of entry.skillSlugs.entries()) {
    await sql`
      INSERT INTO experience_skills (
        experience_id,
        skill_id,
        sort_order
      )
      VALUES (
        ${experienceId},
        ${skillIds[skillSlug]},
        ${sortOrder}
      )
    `;
  }

  for (const [sortOrder, media] of entry.media.entries()) {
    const defaultTranslation = media.translations.en;
    const [experienceMedia] = await sql`
      INSERT INTO experience_media (
        experience_id,
        media_asset_id,
        role,
        caption,
        sort_order
      )
      VALUES (
        ${experienceId},
        ${media.assetId},
        ${media.role},
        ${defaultTranslation.caption},
        ${sortOrder}
      )
      RETURNING id
    `;

    for (const [locale, translation] of Object.entries(media.translations)) {
      await sql`
        INSERT INTO experience_media_translations (
          experience_media_id,
          locale,
          caption
        )
        VALUES (
          ${experienceMedia.id},
          ${locale},
          ${translation.caption}
        )
      `;
    }
  }
}

function createBlogRevision(
  translation,
  coverAssetId,
  mentions = [],
  locale = "en",
  sourceShape = "article-paragraphs",
  inlineAssetId,
  inlineAssetUrl,
) {
  const mentionBlocks = mentions.map((mention) => {
    const mentionTranslation = mention.translations[locale] ?? mention.translations.en;

    return {
      description: mentionTranslation.description,
      entityId: mention.entityId,
      entityType: mention.entityType,
      id: mention.blockId,
      title: mentionTranslation.title,
      type: "content-reference-card",
    };
  });

  const assetManifest = [
    {
      assetId: coverAssetId,
      role: "cover",
    },
  ];

  if (inlineAssetId) {
    assetManifest.push({
      assetId: inlineAssetId,
      blockId: "image-asset",
      role: "inline",
    });
  }

  return {
    assetManifest,
    mentions: mentionBlocks,
    sourceJson: createBlogSourceJson(
      translation,
      mentionBlocks,
      sourceShape,
      inlineAssetId,
      inlineAssetUrl,
    ),
  };
}

async function upsertBlogPost(post) {
  const defaultTranslation = post.translations.en;
  const [existingBlogPost] = await sql`
    SELECT id, entity_id
    FROM blog_posts
    WHERE slug = ${defaultTranslation.slug}
    LIMIT 1
  `;

  let blogPost;

  if (existingBlogPost) {
    [blogPost] = await sql`
      UPDATE blog_posts
      SET
        title = ${defaultTranslation.title},
        excerpt = ${defaultTranslation.excerpt},
        cover_asset_id = ${post.coverAssetId},
        featured = ${post.featured},
        status = ${post.status},
        published_at = ${post.publishedAt},
        updated_at = now()
      WHERE id = ${existingBlogPost.id}
      RETURNING id, entity_id
    `;
  } else {
    const entityId = await createContentEntity("blog_post");

    [blogPost] = await sql`
      INSERT INTO blog_posts (
        entity_id,
        title,
        slug,
        excerpt,
        cover_asset_id,
        featured,
        status,
        published_at
      )
      VALUES (
        ${entityId},
        ${defaultTranslation.title},
        ${defaultTranslation.slug},
        ${defaultTranslation.excerpt},
        ${post.coverAssetId},
        ${post.featured},
        ${post.status},
        ${post.publishedAt}
      )
      RETURNING id, entity_id
    `;
  }

  for (const [locale, translation] of Object.entries(post.translations)) {
    await sql`
      INSERT INTO blog_post_translations (
        blog_post_id,
        locale,
        title,
        slug,
        excerpt
      )
      VALUES (
        ${blogPost.id},
        ${locale},
        ${translation.title},
        ${translation.slug},
        ${translation.excerpt}
      )
      ON CONFLICT (blog_post_id, locale) DO UPDATE SET
        title = excluded.title,
        slug = excluded.slug,
        excerpt = excluded.excerpt
    `;

    const revision = createBlogRevision(
      translation,
      post.coverAssetId,
      post.mentions,
      locale,
      post.sourceShape,
      post.inlineAssetId,
      post.inlineAssetUrl,
    );

    const [blogRevision] = await sql`
      INSERT INTO blog_post_revisions (
        blog_post_id,
        locale,
        version,
        is_current,
        source_json,
        asset_manifest
      )
      VALUES (
        ${blogPost.id},
        ${locale},
        1,
        true,
        ${JSON.stringify(revision.sourceJson)}::jsonb,
        ${JSON.stringify(revision.assetManifest)}::jsonb
      )
      ON CONFLICT (blog_post_id, locale, version) DO UPDATE SET
        is_current = excluded.is_current,
        source_json = excluded.source_json,
        asset_manifest = excluded.asset_manifest,
        compiled_at = now()
      RETURNING id
    `;

    await sql`
      DELETE FROM blog_post_assets
      WHERE blog_post_revision_id = ${blogRevision.id}
    `;

    for (const [sortOrder, asset] of revision.assetManifest.entries()) {
      await sql`
        INSERT INTO blog_post_assets (
          blog_post_revision_id,
          media_asset_id,
          block_id,
          role,
          sort_order
        )
        VALUES (
          ${blogRevision.id},
          ${asset.assetId},
          ${asset.blockId ?? null},
          ${asset.role},
          ${sortOrder}
        )
      `;
    }

    await sql`
      DELETE FROM blog_post_mentions
      WHERE blog_post_revision_id = ${blogRevision.id}
    `;

    for (const [sortOrder, mention] of revision.mentions.entries()) {
      await sql`
        INSERT INTO blog_post_mentions (
          blog_post_revision_id,
          mentioned_entity_id,
          source_block_id,
          sort_order
        )
        VALUES (
          ${blogRevision.id},
          ${mention.entityId},
          ${mention.id},
          ${sortOrder}
        )
      `;
    }
  }

  return {
    entityId: Number(blogPost.entity_id),
    id: Number(blogPost.id),
  };
}

async function insertCommentTree({
  blogPostId,
  comments,
  parentCommentId = null,
  sequence,
  startedAt,
}) {
  for (const comment of comments) {
    sequence.value += 1;

    const createdAt = new Date(
      startedAt.getTime() + sequence.value * 60 * 60 * 1000,
    ).toISOString();
    const [commentRow] = await sql`
      INSERT INTO comments (
        blog_post_id,
        parent_comment_id,
        comment,
        created_at,
        updated_at
      )
      VALUES (
        ${blogPostId},
        ${parentCommentId},
        ${comment.body},
        ${createdAt},
        ${createdAt}
      )
      RETURNING id
    `;

    if (comment.replies?.length) {
      await insertCommentTree({
        blogPostId,
        comments: comment.replies,
        parentCommentId: commentRow.id,
        sequence,
        startedAt,
      });
    }
  }
}

async function seedBlogPostComments(blogPostId, post) {
  await sql`
    DELETE FROM comments
    WHERE blog_post_id = ${blogPostId}
  `;

  await insertCommentTree({
    blogPostId,
    comments: post.comments,
    sequence: { value: 0 },
    startedAt: new Date(post.publishedAt),
  });
}

async function upsertProject(project, skillIds) {
  const defaultTranslation = project.translations.en;
  const [existingProject] = await sql`
    SELECT id, entity_id
    FROM projects
    WHERE title = ${defaultTranslation.title}
    LIMIT 1
  `;

  let projectRow;

  if (existingProject) {
    [projectRow] = await sql`
      UPDATE projects
      SET
        title = ${defaultTranslation.title},
        short_description = ${defaultTranslation.shortDescription},
        overview = ${defaultTranslation.overview},
        cover_asset_id = ${project.coverAssetId},
        status = ${project.status},
        featured = ${project.featured},
        started_on = ${project.startedOn},
        completed_on = ${project.completedOn},
        sort_order = ${project.sortOrder},
        updated_at = now()
      WHERE id = ${existingProject.id}
      RETURNING id, entity_id
    `;
  } else {
    const entityId = await createContentEntity("project");

    [projectRow] = await sql`
      INSERT INTO projects (
        entity_id,
        title,
        short_description,
        overview,
        cover_asset_id,
        status,
        featured,
        started_on,
        completed_on,
        sort_order
      )
      VALUES (
        ${entityId},
        ${defaultTranslation.title},
        ${defaultTranslation.shortDescription},
        ${defaultTranslation.overview},
        ${project.coverAssetId},
        ${project.status},
        ${project.featured},
        ${project.startedOn},
        ${project.completedOn},
        ${project.sortOrder}
      )
      RETURNING id, entity_id
    `;
  }

  const projectId = Number(projectRow.id);

  for (const [locale, translation] of Object.entries(project.translations)) {
    await sql`
      INSERT INTO project_translations (
        project_id,
        locale,
        title,
        short_description,
        overview
      )
      VALUES (
        ${projectId},
        ${locale},
        ${translation.title},
        ${translation.shortDescription},
        ${translation.overview}
      )
      ON CONFLICT (project_id, locale) DO UPDATE SET
        title = excluded.title,
        short_description = excluded.short_description,
        overview = excluded.overview
    `;
  }

  await sql`
    DELETE FROM project_highlights
    WHERE project_id = ${projectId}
  `;

  for (const [sortOrder, highlight] of project.highlights.entries()) {
    const defaultHighlight = highlight.translations.en;
    const [projectHighlight] = await sql`
      INSERT INTO project_highlights (
        project_id,
        body,
        sort_order
      )
      VALUES (
        ${projectId},
        ${defaultHighlight.body},
        ${sortOrder}
      )
      RETURNING id
    `;

    for (const [locale, translation] of Object.entries(highlight.translations)) {
      await sql`
        INSERT INTO project_highlight_translations (
          project_highlight_id,
          locale,
          body
        )
        VALUES (
          ${projectHighlight.id},
          ${locale},
          ${translation.body}
        )
      `;
    }
  }

  await sql`
    DELETE FROM project_skills
    WHERE project_id = ${projectId}
  `;

  for (const [sortOrder, skillSlug] of project.skillSlugs.entries()) {
    await sql`
      INSERT INTO project_skills (
        project_id,
        skill_id,
        sort_order
      )
      VALUES (
        ${projectId},
        ${skillIds[skillSlug]},
        ${sortOrder}
      )
    `;
  }

  for (const [locale, translation] of Object.entries(project.translations)) {
    const sourceJson = createProjectSourceJson(translation);

    await sql`
      INSERT INTO project_revisions (
        project_id,
        locale,
        version,
        is_current,
        source_json,
        rendered_text
      )
      VALUES (
        ${projectId},
        ${locale},
        1,
        true,
        ${JSON.stringify(sourceJson)}::jsonb,
        ${translation.overview}
      )
      ON CONFLICT (project_id, locale, version) DO UPDATE SET
        is_current = excluded.is_current,
        source_json = excluded.source_json,
        rendered_text = excluded.rendered_text,
        compiled_at = now()
    `;
  }

  return {
    entityId: Number(projectRow.entity_id),
    id: projectId,
  };
}

async function seed() {
  const assets = blobUrls.map(toBlobAsset);
  const assetIds = {};

  for (const asset of assets) {
    const assetId = await upsertMediaAsset(asset);

    assetIds[asset.pathname] = assetId;
    await upsertMediaAssetTranslations(assetId, asset);
  }

  const companies = [
    {
      logoAssetId: assetIds["jane10-g50-1.webp"],
      translations: {
        en: {
          name: "Cascade Systems",
          slug: "cascade-systems",
          summary: "A demo product company focused on internal CMS and operations tooling.",
        },
        es: {
          name: "Cascade Systems",
          slug: "cascade-systems",
          summary: "Una empresa demo de producto enfocada en CMS internos y herramientas de operaciones.",
        },
      },
      websiteUrl: "https://example.com/cascade-systems",
    },
    {
      logoAssetId: assetIds["jane10-g80-1.webp"],
      translations: {
        en: {
          name: "Atlas Product Studio",
          slug: "atlas-product-studio",
          summary: "A demo studio used for portfolio case-study and experience rendering.",
        },
        es: {
          name: "Atlas Product Studio",
          slug: "atlas-product-studio",
          summary: "Un estudio demo usado para renderizar casos de portafolio y experiencia.",
        },
      },
      websiteUrl: "https://example.com/atlas-product-studio",
    },
  ];

  const companyIds = {};

  for (const company of companies) {
    const companyId = await upsertCompany(company);

    companyIds[company.translations.en.slug] = companyId;
    await upsertCompanyTranslations(companyId, company);
  }

  const skills = [
    { category: "language", name: "TypeScript", slug: "typescript" },
    { category: "frontend", name: "React", slug: "react" },
    { category: "frontend", name: "Next.js", slug: "next-js" },
    { category: "database", name: "PostgreSQL", slug: "postgresql" },
    { category: "database", name: "Drizzle ORM", slug: "drizzle-orm" },
    { category: "cms", name: "CMS Architecture", slug: "cms-architecture" },
    { category: "design", name: "Design Systems", slug: "design-systems" },
    { category: "platform", name: "Vercel", slug: "vercel" },
  ];

  const skillIds = {};

  for (const skill of skills) {
    skillIds[skill.slug] = await upsertSkill(skill);
  }

  const experienceEntries = [
    {
      bullets: [
        {
          translations: {
            en: {
              body: "Modeled CMS content as relational records with reusable media and revisioned editorial output.",
            },
            es: {
              body: "Modele contenido CMS como registros relacionales con media reutilizable y salida editorial versionada.",
            },
          },
          type: "achievement",
        },
        {
          translations: {
            en: {
              body: "Built portfolio-facing data shapes that can render timelines, detail pages, and filtered skill views.",
            },
            es: {
              body: "Construi formas de datos para el portafolio que pueden renderizar lineas de tiempo, paginas de detalle y vistas filtradas por habilidad.",
            },
          },
          type: "responsibility",
        },
        {
          translations: {
            en: {
              body: "Kept media placement explicit so blog content can reference assets by writer block.",
            },
            es: {
              body: "Mantuve la ubicacion de media explicita para que el contenido del blog pueda referenciar assets por bloque del escritor.",
            },
          },
          type: "highlight",
        },
      ],
      companyId: companyIds["cascade-systems"],
      employmentType: "contract",
      endDate: null,
      featured: true,
      isCurrent: true,
      locationType: "remote",
      media: [
        {
          assetId: assetIds["jane10-g50-1.webp"],
          role: "cover",
          translations: {
            en: {
              caption: "Demo cover asset for the CMS architecture experience.",
            },
            es: {
              caption: "Asset demo de portada para la experiencia de arquitectura CMS.",
            },
          },
        },
        {
          assetId: assetIds["jane10-g90-1.webp"],
          role: "gallery",
          translations: {
            en: {
              caption: "Supporting gallery asset for experience detail views.",
            },
            es: {
              caption: "Asset de galeria de soporte para vistas de detalle de experiencia.",
            },
          },
        },
      ],
      skillSlugs: ["typescript", "postgresql", "drizzle-orm", "cms-architecture"],
      sortOrder: 10,
      startDate: "2025-01-01",
      status: "testing",
      translations: {
        en: {
          companyContext: "Cascade Systems is seeded demo content for testing CMS-backed portfolio sections.",
          locationLabel: "Remote",
          positionTitle: "CMS Platform Architect",
          roleSummary: "Designed the backend content model for a dynamic portfolio CMS.",
        },
        es: {
          companyContext: "Cascade Systems es contenido demo para probar secciones de portafolio respaldadas por CMS.",
          locationLabel: "Remoto",
          positionTitle: "Arquitecto de plataforma CMS",
          roleSummary: "Disene el modelo de contenido backend para un CMS de portafolio dinamico.",
        },
      },
    },
    {
      bullets: [
        {
          translations: {
            en: {
              body: "Created reusable UI content concepts for experience cards, feature callouts, and project summaries.",
            },
            es: {
              body: "Cree conceptos de contenido UI reutilizable para tarjetas de experiencia, llamados de funciones y resumenes de proyectos.",
            },
          },
          type: "responsibility",
        },
        {
          translations: {
            en: {
              body: "Connected editorial structure with design-system language so sections can be rendered consistently.",
            },
            es: {
              body: "Conecte la estructura editorial con el lenguaje del sistema de diseno para que las secciones se rendericen de forma consistente.",
            },
          },
          type: "achievement",
        },
        {
          translations: {
            en: {
              body: "Prepared demo data for testing status, sorting, skill chips, and media roles.",
            },
            es: {
              body: "Prepare datos demo para probar estado, ordenamiento, chips de habilidades y roles de media.",
            },
          },
          type: "highlight",
        },
      ],
      companyId: companyIds["atlas-product-studio"],
      employmentType: "freelance",
      endDate: "2024-12-31",
      featured: false,
      isCurrent: false,
      locationType: "hybrid",
      media: [
        {
          assetId: assetIds["jane10-g80-1.webp"],
          role: "cover",
          translations: {
            en: {
              caption: "Demo logo/cover asset for product studio experience.",
            },
            es: {
              caption: "Asset demo de logo/portada para la experiencia de estudio de producto.",
            },
          },
        },
      ],
      skillSlugs: ["react", "next-js", "design-systems", "vercel"],
      sortOrder: 20,
      startDate: "2023-03-01",
      status: "testing",
      translations: {
        en: {
          companyContext: "Atlas Product Studio is seeded demo content for testing experience history.",
          locationLabel: "Bogota, Colombia",
          positionTitle: "Frontend Systems Designer",
          roleSummary: "Shaped frontend content patterns for a portfolio CMS demonstration.",
        },
        es: {
          companyContext: "Atlas Product Studio es contenido demo para probar el historial de experiencia.",
          locationLabel: "Bogota, Colombia",
          positionTitle: "Disenador de sistemas frontend",
          roleSummary: "Modele patrones de contenido frontend para una demostracion de CMS de portafolio.",
        },
      },
    },
    {
      bullets: [
        {
          translations: {
            en: {
              body: "Implemented a shared content entity layer so portfolio objects can be mentioned from writer output.",
            },
            es: {
              body: "Implemente una capa compartida de entidades de contenido para que los objetos del portafolio puedan mencionarse desde la salida del escritor.",
            },
          },
          type: "achievement",
        },
        {
          translations: {
            en: {
              body: "Connected seeded blog revisions to project and experience records through explicit mention rows.",
            },
            es: {
              body: "Conecte revisiones sembradas del blog con registros de proyecto y experiencia mediante filas explicitas de mencion.",
            },
          },
          type: "responsibility",
        },
        {
          translations: {
            en: {
              body: "Used every seeded skill to exercise the full skill relation surface from one job entry.",
            },
            es: {
              body: "Use cada habilidad sembrada para ejercitar toda la superficie de relaciones de habilidades desde una entrada de trabajo.",
            },
          },
          type: "highlight",
        },
      ],
      companyId: companyIds["cascade-systems"],
      employmentType: "contract",
      endDate: null,
      featured: true,
      isCurrent: false,
      locationType: "remote",
      media: [
        {
          assetId: assetIds["jane10-g90-1.webp"],
          role: "cover",
          translations: {
            en: {
              caption: "Demo cover asset for the content graph implementation job.",
            },
            es: {
              caption: "Asset demo de portada para el trabajo de implementacion del grafo de contenido.",
            },
          },
        },
      ],
      skillSlugs: skills.map((skill) => skill.slug),
      sortOrder: 5,
      startDate: "2026-02-01",
      status: "testing",
      translations: {
        en: {
          companyContext: "Cascade Systems is seeded demo content for testing cross-content references.",
          locationLabel: "Remote",
          positionTitle: "Content Graph Implementation Lead",
          roleSummary: "Built the seeded relationship model that lets blog content point back to portfolio entities.",
        },
        es: {
          companyContext: "Cascade Systems es contenido demo para probar referencias cruzadas entre contenidos.",
          locationLabel: "Remoto",
          positionTitle: "Lider de implementacion de grafo de contenido",
          roleSummary: "Construyo el modelo de relaciones sembrado que permite que el contenido del blog apunte a entidades del portafolio.",
        },
      },
    },
  ];

  const experienceIds = [];
  const experienceRecords = {};

  for (const entry of experienceEntries) {
    const experienceRecord = await upsertExperience(entry);
    const experienceId = experienceRecord.id;

    await upsertExperienceTranslations(experienceId, entry);
    await clearExperienceChildren(experienceId);
    await insertExperienceChildren(experienceId, entry, skillIds);
    experienceIds.push(experienceId);
    experienceRecords[entry.translations.en.positionTitle] = experienceRecord;
  }

  const projects = [
    {
      completedOn: "2026-06-18",
      coverAssetId: assetIds["jane10-g90-1.webp"],
      featured: true,
      highlights: [
        {
          translations: {
            en: {
              body: "Adds a shared content entity identity for projects, jobs, skills, companies, and blog posts.",
            },
            es: {
              body: "Agrega una identidad compartida de entidad de contenido para proyectos, trabajos, habilidades, empresas y publicaciones.",
            },
          },
        },
        {
          translations: {
            en: {
              body: "Stores blog mentions as relational rows tied to the structural revision that produced them.",
            },
            es: {
              body: "Guarda menciones del blog como filas relacionales ligadas a la revision estructural que las produjo.",
            },
          },
        },
        {
          translations: {
            en: {
              body: "Keeps concrete domain tables intact while giving cross-content features one stable identifier.",
            },
            es: {
              body: "Mantiene intactas las tablas concretas de dominio mientras da a las funciones cruzadas un identificador estable.",
            },
          },
        },
      ],
      key: "portfolio-content-graph",
      skillSlugs: [
        "typescript",
        "next-js",
        "postgresql",
        "drizzle-orm",
        "cms-architecture",
        "vercel",
      ],
      sortOrder: 5,
      startedOn: "2026-06-10",
      status: "testing",
      translations: {
        en: {
          overview: "A seeded portfolio project that demonstrates content entities, revision-scoped blog mentions, project skills, and translated project copy without adding any presentation UI yet.",
          shortDescription: "A seeded project for testing entity mentions between blog posts and portfolio records.",
          title: "Portfolio Content Graph",
        },
        es: {
          overview: "Un proyecto sembrado de portafolio que demuestra entidades de contenido, menciones de blog por revision, habilidades de proyecto y copia traducida sin agregar todavia UI de presentacion.",
          shortDescription: "Un proyecto sembrado para probar menciones de entidades entre publicaciones y registros del portafolio.",
          title: "Grafo de contenido del portafolio",
        },
      },
    },
  ];

  const projectIds = [];
  const projectRecords = {};

  for (const project of projects) {
    const projectRecord = await upsertProject(project, skillIds);

    projectIds.push(projectRecord.id);
    projectRecords[project.key] = projectRecord;
  }

  const blogPosts = [
    {
      comments: [
        {
          body: "This makes the writer model feel testable before the editor exists.",
          replies: [
            {
              body: "The structural JSON tree is the first thing I would inspect.",
              replies: [
                {
                  body: "Same; a preview diff would make CMS changes feel much less mysterious.",
                },
              ],
            },
          ],
        },
        {
          body: "I like that assets are part of the revision instead of being inferred later.",
          replies: [
            {
              body: "It should make image cleanup safer once drafts start changing.",
            },
          ],
        },
        {
          body: "The next missing piece is authoring workflow, but this seed already shows the contract.",
        },
      ],
      coverAssetId: assetIds["jane10-g50-1.webp"],
      featured: true,
      publishedAt: "2026-06-01T12:00:00.000Z",
      sourceShape: "article-paragraphs",
      status: "testing",
      translations: {
        en: {
          body: "This placeholder revision proves the eventual writer can keep structural JSON and asset references aligned without guessing where content belongs.",
          excerpt: "A seeded post for testing the CMS writer output model before the editor exists.",
          intro: "A portfolio CMS should make the editing surface feel like part of the product, not a bolted-on admin form.",
          slug: "designing-portfolio-cms-product-surface",
          title: "Designing a Portfolio CMS as a Product Surface",
        },
        es: {
          body: "Esta revision provisional demuestra que el escritor podra mantener alineados el JSON estructural y las referencias de assets sin adivinar donde pertenece cada contenido.",
          excerpt: "Una publicacion sembrada para probar el modelo de salida del escritor CMS antes de que exista el editor.",
          intro: "Un CMS de portafolio deberia hacer que la superficie de edicion se sienta como parte del producto, no como un formulario administrativo pegado despues.",
          slug: "disenando-un-cms-de-portafolio-como-superficie-de-producto",
          title: "Disenando un CMS de portafolio como superficie de producto",
        },
      },
    },
    {
      comments: [
        {
          body: "This is much easier to reason about than a static timeline.",
          replies: [
            {
              body: "The media roles and skill joins make the entry useful in more than one layout.",
              replies: [
                {
                  body: "Exactly; the same row can feed a detail page, a skill page, and a homepage section.",
                },
              ],
            },
          ],
        },
        {
          body: "The company context field feels like the right place for the human background.",
          replies: [
            {
              body: "And keeping highlights separate means they can be scanned without losing the story.",
            },
          ],
        },
        {
          body: "This gives the frontend enough structure to stay calm even as the content grows.",
        },
      ],
      coverAssetId: assetIds["jane10-g80-1.webp"],
      featured: true,
      publishedAt: "2026-06-03T12:00:00.000Z",
      sourceShape: "nested-divs",
      status: "testing",
      translations: {
        en: {
          body: "The child tables let one entry support bullets, media roles, skill filtering, and richer detail pages while keeping the main experience record readable.",
          excerpt: "A seeded post for testing experience content as structured data instead of a static CV.",
          intro: "Experience entries can become timelines, case-study previews, and skill maps when the backend stores the right structure.",
          slug: "experience-entries-more-than-timeline",
          title: "Making Experience Entries More Than a Timeline",
        },
        es: {
          body: "Las tablas hijas permiten que una entrada soporte bullets, roles de media, filtros por habilidad y paginas de detalle mas ricas sin volver ilegible el registro principal de experiencia.",
          excerpt: "Una publicacion sembrada para probar contenido de experiencia como datos estructurados en vez de un CV estatico.",
          intro: "Las entradas de experiencia pueden convertirse en lineas de tiempo, vistas previas de casos y mapas de habilidades cuando el backend guarda la estructura correcta.",
          slug: "entradas-de-experiencia-mas-que-una-linea-de-tiempo",
          title: "Entradas de experiencia: mas que una linea de tiempo",
        },
      },
    },
    {
      comments: [
        {
          body: "The mention rows make the portfolio graph feel intentional instead of decorative.",
          replies: [
            {
              body: "I especially like that mentions belong to the revision that produced them.",
              replies: [
                {
                  body: "That should make stale references easier to audit when a post changes.",
                },
              ],
            },
          ],
        },
        {
          body: "This is the kind of backend shape that can power related-content UI without hand curation.",
          replies: [
            {
              body: "And it keeps the referenced project and job independent enough to stand alone.",
            },
          ],
        },
        {
          body: "Once comments render, this thread is a nice stress test for recursive replies too.",
        },
      ],
      coverAssetId: assetIds["jane10-g90-1.webp"],
      featured: true,
      mentions: [
        {
          blockId: "portfolio-content-graph-card",
          entityId: projectRecords["portfolio-content-graph"].entityId,
          entityType: "project",
          translations: {
            en: {
              description: "A seeded project that demonstrates the content entity layer and revision-scoped mentions.",
              title: "Project: Portfolio Content Graph",
            },
            es: {
              description: "Un proyecto sembrado que demuestra la capa de entidades de contenido y menciones por revision.",
              title: "Proyecto: Grafo de contenido del portafolio",
            },
          },
        },
        {
          blockId: "content-graph-job-card",
          entityId: experienceRecords["Content Graph Implementation Lead"].entityId,
          entityType: "experience",
          translations: {
            en: {
              description: "A seeded job that uses every skill and anchors the blog mention back to experience data.",
              title: "Job: Content Graph Implementation Lead",
            },
            es: {
              description: "Un trabajo sembrado que usa cada habilidad y ancla la mencion del blog a datos de experiencia.",
              title: "Trabajo: Lider de implementacion de grafo de contenido",
            },
          },
        },
      ],
      publishedAt: "2026-06-18T12:00:00.000Z",
      sourceShape: "mention-cards",
      status: "testing",
      translations: {
        en: {
          body: "The seed now proves the storage-side contract: rich content can render a reference card while the referenced project and job can later query which blog revisions mentioned them.",
          excerpt: "A seeded post for testing project and job mentions through shared content entities.",
          intro: "Cross-content links become more useful when the relationship is stored beside the structural content source.",
          slug: "tracing-portfolio-work-with-content-mentions",
          title: "Tracing Portfolio Work with Content Mentions",
        },
        es: {
          body: "La semilla ahora prueba el contrato del lado de almacenamiento: el contenido enriquecido puede renderizar una tarjeta de referencia mientras el proyecto y el trabajo referenciados luego pueden consultar que revisiones del blog los mencionaron.",
          excerpt: "Una publicacion sembrada para probar menciones de proyecto y trabajo mediante entidades de contenido compartidas.",
          intro: "Los enlaces cruzados entre contenidos se vuelven mas utiles cuando la relacion se guarda junto al contenido estructural fuente.",
          slug: "rastreando-trabajo-de-portafolio-con-menciones-de-contenido",
          title: "Rastreando trabajo de portafolio con menciones de contenido",
        },
      },
    },
    {
      comments: [],
      coverAssetId: assetIds["jane10-g50-1.webp"],
      featured: false,
      publishedAt: "2026-06-20T12:00:00.000Z",
      sourceShape: "deep-nesting",
      status: "testing",
      translations: {
        en: {
          body: "This stress post intentionally mixes nested siblings, explicit text nodes, primitive string content, and empty-ish element boundaries.",
          excerpt: "A non-featured seeded post for stress testing structural content recursion.",
          footer: "The simple renderer should still produce a readable fallback tree.",
          intro: "Deep nesting should be boring for the structural content traverser.",
          slug: "stress-testing-structural-content-nesting",
          title: "Stress Testing Structural Content Nesting",
        },
        es: {
          body: "Esta publicacion de prueba mezcla intencionalmente hermanos anidados, nodos de texto explicitos, contenido string primitivo y limites de elementos casi vacios.",
          excerpt: "Una publicacion sembrada no destacada para probar recursividad de contenido estructural.",
          footer: "El renderizador simple aun deberia producir un arbol fallback legible.",
          intro: "El anidamiento profundo deberia ser aburrido para el recorrido de contenido estructural.",
          slug: "probando-anidamiento-de-contenido-estructural",
          title: "Probando anidamiento de contenido estructural",
        },
      },
    },
    {
      comments: [],
      coverAssetId: assetIds["jane10-g80-1.webp"],
      featured: false,
      inlineAssetId: assetIds["jane10-g90-1.webp"],
      inlineAssetUrl: assets[2].url,
      publishedAt: "2026-06-22T12:00:00.000Z",
      sourceShape: "image-elements",
      status: "testing",
      translations: {
        en: {
          body: "The fallback renderer should keep walking when it sees an image element, even before image rendering is specialized.",
          excerpt: "A non-featured seeded post for testing image-shaped structural content.",
          imageAltText: "Demo Jane portfolio image referenced by structural content.",
          imageCaption: "Image element carrying both an asset reference and a public URL.",
          intro: "Image nodes should be ordinary structural content until a specialized element handles them.",
          slug: "stress-testing-structural-content-images",
          title: "Stress Testing Structural Content Images",
        },
        es: {
          body: "El renderizador fallback deberia seguir recorriendo cuando encuentra un elemento de imagen, incluso antes de especializar el render de imagenes.",
          excerpt: "Una publicacion sembrada no destacada para probar contenido estructural con forma de imagen.",
          imageAltText: "Imagen demo Jane de portafolio referenciada por contenido estructural.",
          imageCaption: "Elemento de imagen con referencia de asset y URL publica.",
          intro: "Los nodos de imagen deberian ser contenido estructural normal hasta que un elemento especializado los maneje.",
          slug: "probando-imagenes-de-contenido-estructural",
          title: "Probando imagenes de contenido estructural",
        },
      },
    },
  ];

  const blogPostIds = [];

  for (const post of blogPosts) {
    const blogPostRecord = await upsertBlogPost(post);

    blogPostIds.push(blogPostRecord.id);
    await seedBlogPostComments(blogPostRecord.id, post);
  }

  const [childCounts] = await sql`
    SELECT
      (
        SELECT count(*)::int
        FROM experience_bullets
        WHERE experience_id IN (
          ${experienceIds[0]},
          ${experienceIds[1]},
          ${experienceIds[2]}
        )
      ) AS experience_bullets,
      (
        SELECT count(*)::int
        FROM experience_bullet_translations
        WHERE experience_bullet_id IN (
          SELECT id
          FROM experience_bullets
          WHERE experience_id IN (
            ${experienceIds[0]},
            ${experienceIds[1]},
            ${experienceIds[2]}
          )
        )
      ) AS experience_bullet_translations,
      (
        SELECT count(*)::int
        FROM experience_media
        WHERE experience_id IN (
          ${experienceIds[0]},
          ${experienceIds[1]},
          ${experienceIds[2]}
        )
      ) AS experience_media,
      (
        SELECT count(*)::int
        FROM experience_media_translations
        WHERE experience_media_id IN (
          SELECT id
          FROM experience_media
          WHERE experience_id IN (
            ${experienceIds[0]},
            ${experienceIds[1]},
            ${experienceIds[2]}
          )
        )
      ) AS experience_media_translations,
      (
        SELECT count(*)::int
        FROM experience_skills
        WHERE experience_id IN (
          ${experienceIds[0]},
          ${experienceIds[1]},
          ${experienceIds[2]}
        )
      ) AS experience_skills,
      (
        SELECT count(*)::int
        FROM experience_translations
        WHERE experience_id IN (
          ${experienceIds[0]},
          ${experienceIds[1]},
          ${experienceIds[2]}
        )
      ) AS experience_translations,
      (
        SELECT count(*)::int
        FROM company_translations
        WHERE company_id IN (
          ${companyIds["cascade-systems"]},
          ${companyIds["atlas-product-studio"]}
        )
      ) AS company_translations,
      (
        SELECT count(*)::int
        FROM media_asset_translations
        WHERE media_asset_id IN (
          ${assetIds["jane10-g50-1.webp"]},
          ${assetIds["jane10-g80-1.webp"]},
          ${assetIds["jane10-g90-1.webp"]}
        )
      ) AS media_asset_translations,
      (
        SELECT count(*)::int
        FROM blog_post_translations
        WHERE blog_post_id IN (
          ${blogPostIds[0]},
          ${blogPostIds[1]},
          ${blogPostIds[2]},
          ${blogPostIds[3]},
          ${blogPostIds[4]}
        )
      ) AS blog_post_translations,
      (
        SELECT count(*)::int
        FROM blog_post_revisions
        WHERE blog_post_id IN (
          ${blogPostIds[0]},
          ${blogPostIds[1]},
          ${blogPostIds[2]},
          ${blogPostIds[3]},
          ${blogPostIds[4]}
        )
      ) AS blog_post_revisions,
      (
        SELECT count(*)::int
        FROM blog_post_assets
        WHERE blog_post_revision_id IN (
          SELECT id
          FROM blog_post_revisions
          WHERE blog_post_id IN (
            ${blogPostIds[0]},
            ${blogPostIds[1]},
            ${blogPostIds[2]},
            ${blogPostIds[3]},
            ${blogPostIds[4]}
          )
        )
      ) AS blog_post_assets,
      (
        SELECT count(*)::int
        FROM blog_post_mentions
        WHERE blog_post_revision_id IN (
          SELECT id
          FROM blog_post_revisions
          WHERE blog_post_id IN (
            ${blogPostIds[0]},
            ${blogPostIds[1]},
            ${blogPostIds[2]},
            ${blogPostIds[3]},
            ${blogPostIds[4]}
          )
        )
      ) AS blog_post_mentions,
      (
        SELECT count(*)::int
        FROM comments
        WHERE blog_post_id IN (
          ${blogPostIds[0]},
          ${blogPostIds[1]},
          ${blogPostIds[2]},
          ${blogPostIds[3]},
          ${blogPostIds[4]}
        )
      ) AS blog_comments,
      (
        SELECT count(*)::int
        FROM project_translations
        WHERE project_id = ${projectIds[0]}
      ) AS project_translations,
      (
        SELECT count(*)::int
        FROM project_highlights
        WHERE project_id = ${projectIds[0]}
      ) AS project_highlights,
      (
        SELECT count(*)::int
        FROM project_highlight_translations
        WHERE project_highlight_id IN (
          SELECT id
          FROM project_highlights
          WHERE project_id = ${projectIds[0]}
        )
      ) AS project_highlight_translations,
      (
        SELECT count(*)::int
        FROM project_skills
        WHERE project_id = ${projectIds[0]}
      ) AS project_skills,
      (
        SELECT count(*)::int
        FROM project_revisions
        WHERE project_id = ${projectIds[0]}
      ) AS project_revisions
  `;

  console.log("Seeded demo CMS data.");
  console.log(`Media assets upserted: ${Object.keys(assetIds).length}`);
  console.log(`Media asset translations upserted: ${childCounts.media_asset_translations}`);
  console.log(`Company translations upserted: ${childCounts.company_translations}`);
  console.log(`Experience entries upserted: ${experienceIds.length}`);
  console.log(`Experience translations upserted: ${childCounts.experience_translations}`);
  console.log(`Experience bullets seeded: ${childCounts.experience_bullets}`);
  console.log(`Experience bullet translations seeded: ${childCounts.experience_bullet_translations}`);
  console.log(`Experience media links seeded: ${childCounts.experience_media}`);
  console.log(`Experience media translations seeded: ${childCounts.experience_media_translations}`);
  console.log(`Experience skill links seeded: ${childCounts.experience_skills}`);
  console.log(`Projects upserted: ${projectIds.length}`);
  console.log(`Project translations upserted: ${childCounts.project_translations}`);
  console.log(`Project highlights seeded: ${childCounts.project_highlights}`);
  console.log(`Project highlight translations seeded: ${childCounts.project_highlight_translations}`);
  console.log(`Project skill links seeded: ${childCounts.project_skills}`);
  console.log(`Project revisions upserted: ${childCounts.project_revisions}`);
  console.log(`Blog posts upserted: ${blogPostIds.length}`);
  console.log(`Blog translations upserted: ${childCounts.blog_post_translations}`);
  console.log(`Blog revisions upserted: ${childCounts.blog_post_revisions}`);
  console.log(`Blog asset placements seeded: ${childCounts.blog_post_assets}`);
  console.log(`Blog mentions seeded: ${childCounts.blog_post_mentions}`);
  console.log(`Blog comments seeded: ${childCounts.blog_comments}`);
}

await seed();
