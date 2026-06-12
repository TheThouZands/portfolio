import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });
config();

const databaseUrl = process.env.PF_DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing pf_DATABASE_URL environment variable.");
}

const sql = neon(databaseUrl);

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

const demoBlogSlugs = [
  "designing-portfolio-cms-product-surface",
  "experience-entries-more-than-timeline",
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

  const [row] = await sql`
    INSERT INTO companies (
      company_name,
      slug,
      website_url,
      summary,
      logo_asset_id
    )
    VALUES (
      ${defaultTranslation.name},
      ${defaultTranslation.slug},
      ${company.websiteUrl},
      ${defaultTranslation.summary},
      ${company.logoAssetId}
    )
    ON CONFLICT (slug) DO UPDATE SET
      company_name = excluded.company_name,
      website_url = excluded.website_url,
      summary = excluded.summary,
      logo_asset_id = excluded.logo_asset_id,
      updated_at = now()
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
  const [row] = await sql`
    INSERT INTO skills (
      name,
      slug,
      category
    )
    VALUES (
      ${skill.name},
      ${skill.slug},
      ${skill.category}
    )
    ON CONFLICT (slug) DO UPDATE SET
      name = excluded.name,
      category = excluded.category
    RETURNING id
  `;

  return Number(row.id);
}

async function insertExperience(entry) {
  const defaultTranslation = entry.translations.en;

  const [row] = await sql`
    INSERT INTO experience (
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
    RETURNING id
  `;

  return Number(row.id);
}

async function insertExperienceTranslations(experienceId, entry) {
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

function createBlogRevision(translation, coverAssetId, inlineAssetId, inlineAssetUrl) {
  const sourceJson = {
    type: "doc",
    blocks: [
      {
        id: "title",
        level: 2,
        text: translation.title,
        type: "heading",
      },
      {
        id: "intro",
        text: translation.intro,
        type: "paragraph",
      },
      {
        assetId: inlineAssetId,
        caption: translation.imageCaption,
        id: "inline-demo-image",
        type: "image",
      },
      {
        id: "body",
        text: translation.body,
        type: "paragraph",
      },
    ],
  };

  return {
    assetManifest: [
      {
        assetId: coverAssetId,
        role: "cover",
      },
      {
        assetId: inlineAssetId,
        blockId: "inline-demo-image",
        role: "inline",
      },
    ],
    renderedCss: `[data-post-slug="${translation.slug}"] figure { margin: 1.5rem 0; } [data-post-slug="${translation.slug}"] img { max-width: 100%; height: auto; }`,
    renderedHtml: [
      `<article data-post-slug="${translation.slug}">`,
      `<h2 data-block-id="title">${translation.title}</h2>`,
      `<p data-block-id="intro">${translation.intro}</p>`,
      `<figure data-block-id="inline-demo-image">`,
      `<img src="${inlineAssetUrl}" data-media-asset-id="${inlineAssetId}" alt="${translation.imageCaption}">`,
      `<figcaption>${translation.imageCaption}</figcaption>`,
      "</figure>",
      `<p data-block-id="body">${translation.body}</p>`,
      "</article>",
    ].join(""),
    sourceJson,
  };
}

async function insertBlogPost(post) {
  const defaultTranslation = post.translations.en;

  const [blogPost] = await sql`
    INSERT INTO blog_posts (
      title,
      slug,
      excerpt,
      cover_asset_id,
      featured,
      status,
      published_at
    )
    VALUES (
      ${defaultTranslation.title},
      ${defaultTranslation.slug},
      ${defaultTranslation.excerpt},
      ${post.coverAssetId},
      ${post.featured},
      ${post.status},
      ${post.publishedAt}
    )
    RETURNING id
  `;

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
    `;

    const revision = createBlogRevision(
      translation,
      post.coverAssetId,
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
        rendered_html,
        rendered_css,
        asset_manifest
      )
      VALUES (
        ${blogPost.id},
        ${locale},
        1,
        true,
        ${JSON.stringify(revision.sourceJson)}::jsonb,
        ${revision.renderedHtml},
        ${revision.renderedCss},
        ${JSON.stringify(revision.assetManifest)}::jsonb
      )
      RETURNING id
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
  }

  return Number(blogPost.id);
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

  await sql`
    DELETE FROM blog_posts
    WHERE slug IN (
      ${demoBlogSlugs[0]},
      ${demoBlogSlugs[1]}
    )
  `;

  await sql`
    DELETE FROM experience
    WHERE company_id IN (
      ${companyIds["cascade-systems"]},
      ${companyIds["atlas-product-studio"]}
    )
  `;

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
  ];

  const experienceIds = [];

  for (const entry of experienceEntries) {
    const experienceId = await insertExperience(entry);

    await insertExperienceTranslations(experienceId, entry);
    await insertExperienceChildren(experienceId, entry, skillIds);
    experienceIds.push(experienceId);
  }

  const blogPosts = [
    {
      coverAssetId: assetIds["jane10-g50-1.webp"],
      featured: true,
      inlineAssetId: assetIds["jane10-g90-1.webp"],
      inlineAssetUrl: assets[2].url,
      publishedAt: "2026-06-01T12:00:00.000Z",
      status: "testing",
      translations: {
        en: {
          body: "This placeholder revision proves the eventual writer can keep source JSON, compiled HTML, CSS, and asset references aligned without guessing where images belong.",
          excerpt: "A seeded post for testing the CMS writer output model before the editor exists.",
          imageCaption: "Inline demo image placed by writer block id.",
          intro: "A portfolio CMS should make the editing surface feel like part of the product, not a bolted-on admin form.",
          slug: "designing-portfolio-cms-product-surface",
          title: "Designing a Portfolio CMS as a Product Surface",
        },
        es: {
          body: "Esta revision provisional demuestra que el escritor podra mantener alineados el JSON fuente, el HTML compilado, el CSS y las referencias de assets sin adivinar donde pertenecen las imagenes.",
          excerpt: "Una publicacion sembrada para probar el modelo de salida del escritor CMS antes de que exista el editor.",
          imageCaption: "Imagen demo insertada por id de bloque del escritor.",
          intro: "Un CMS de portafolio deberia hacer que la superficie de edicion se sienta como parte del producto, no como un formulario administrativo pegado despues.",
          slug: "disenando-un-cms-de-portafolio-como-superficie-de-producto",
          title: "Disenando un CMS de portafolio como superficie de producto",
        },
      },
    },
    {
      coverAssetId: assetIds["jane10-g80-1.webp"],
      featured: true,
      inlineAssetId: assetIds["jane10-g50-1.webp"],
      inlineAssetUrl: assets[0].url,
      publishedAt: "2026-06-03T12:00:00.000Z",
      status: "testing",
      translations: {
        en: {
          body: "The child tables let one entry support bullets, media roles, skill filtering, and richer detail pages while keeping the main experience record readable.",
          excerpt: "A seeded post for testing experience content as structured data instead of a static CV.",
          imageCaption: "Inline demo image reused from the shared asset library.",
          intro: "Experience entries can become timelines, case-study previews, and skill maps when the backend stores the right structure.",
          slug: "experience-entries-more-than-timeline",
          title: "Making Experience Entries More Than a Timeline",
        },
        es: {
          body: "Las tablas hijas permiten que una entrada soporte bullets, roles de media, filtros por habilidad y paginas de detalle mas ricas sin volver ilegible el registro principal de experiencia.",
          excerpt: "Una publicacion sembrada para probar contenido de experiencia como datos estructurados en vez de un CV estatico.",
          imageCaption: "Imagen demo reutilizada desde la biblioteca compartida de assets.",
          intro: "Las entradas de experiencia pueden convertirse en lineas de tiempo, vistas previas de casos y mapas de habilidades cuando el backend guarda la estructura correcta.",
          slug: "entradas-de-experiencia-mas-que-una-linea-de-tiempo",
          title: "Entradas de experiencia: mas que una linea de tiempo",
        },
      },
    },
  ];

  const blogPostIds = [];

  for (const post of blogPosts) {
    blogPostIds.push(await insertBlogPost(post));
  }

  const [childCounts] = await sql`
    SELECT
      (
        SELECT count(*)::int
        FROM experience_bullets
        WHERE experience_id IN (
          ${experienceIds[0]},
          ${experienceIds[1]}
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
            ${experienceIds[1]}
          )
        )
      ) AS experience_bullet_translations,
      (
        SELECT count(*)::int
        FROM experience_media
        WHERE experience_id IN (
          ${experienceIds[0]},
          ${experienceIds[1]}
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
            ${experienceIds[1]}
          )
        )
      ) AS experience_media_translations,
      (
        SELECT count(*)::int
        FROM experience_skills
        WHERE experience_id IN (
          ${experienceIds[0]},
          ${experienceIds[1]}
        )
      ) AS experience_skills,
      (
        SELECT count(*)::int
        FROM experience_translations
        WHERE experience_id IN (
          ${experienceIds[0]},
          ${experienceIds[1]}
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
          ${blogPostIds[1]}
        )
      ) AS blog_post_translations,
      (
        SELECT count(*)::int
        FROM blog_post_revisions
        WHERE blog_post_id IN (
          ${blogPostIds[0]},
          ${blogPostIds[1]}
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
            ${blogPostIds[1]}
          )
        )
      ) AS blog_post_assets
  `;

  console.log("Seeded demo CMS data.");
  console.log(`Media assets upserted: ${Object.keys(assetIds).length}`);
  console.log(`Media asset translations upserted: ${childCounts.media_asset_translations}`);
  console.log(`Company translations upserted: ${childCounts.company_translations}`);
  console.log(`Experience entries inserted: ${experienceIds.length}`);
  console.log(`Experience translations inserted: ${childCounts.experience_translations}`);
  console.log(`Experience bullets inserted: ${childCounts.experience_bullets}`);
  console.log(`Experience bullet translations inserted: ${childCounts.experience_bullet_translations}`);
  console.log(`Experience media links inserted: ${childCounts.experience_media}`);
  console.log(`Experience media translations inserted: ${childCounts.experience_media_translations}`);
  console.log(`Experience skill links inserted: ${childCounts.experience_skills}`);
  console.log(`Blog posts inserted: ${blogPostIds.length}`);
  console.log(`Blog translations inserted: ${childCounts.blog_post_translations}`);
  console.log(`Blog revisions inserted: ${childCounts.blog_post_revisions}`);
  console.log(`Blog asset placements inserted: ${childCounts.blog_post_assets}`);
}

await seed();
