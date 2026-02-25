"use client";

import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity.image";
import { useTranslation } from "@/lib/language-context";

function mergeImagesIntoTranslation(englishContent: any[], translatedContent: any[]) {
  if (!englishContent || !translatedContent) return translatedContent || englishContent;

  const englishImages = englishContent.filter((block: any) => block._type === "image");
  const translatedHasImages = translatedContent.some((block: any) => block._type === "image");

  if (translatedHasImages || englishImages.length === 0) return translatedContent;

  const textBlocks = translatedContent.filter((block: any) => block._type !== "image");
  const engTextBlocks = englishContent.filter((block: any) => block._type !== "image");

  const imagePositions: { afterIndex: number; image: any }[] = [];
  let textIndex = 0;
  for (let i = 0; i < englishContent.length; i++) {
    if (englishContent[i]._type === "image") {
      imagePositions.push({ afterIndex: textIndex - 1, image: englishContent[i] });
    } else {
      textIndex++;
    }
  }

  const ratio = textBlocks.length / Math.max(engTextBlocks.length, 1);

  const merged: any[] = [];
  const insertAfter = new Map<number, any[]>();

  for (const pos of imagePositions) {
    const mappedIndex = Math.round(pos.afterIndex * ratio);
    const key = Math.max(0, Math.min(mappedIndex, textBlocks.length - 1));
    if (!insertAfter.has(key)) insertAfter.set(key, []);
    insertAfter.get(key)!.push(pos.image);
  }

  for (let i = 0; i < textBlocks.length; i++) {
    merged.push(textBlocks[i]);
    if (insertAfter.has(i)) {
      merged.push(...insertAfter.get(i)!);
    }
  }

  return merged;
}

export default function BlogDetailClient({ blog }: { blog: any }) {
  const { lang } = useTranslation();

  const getLocalized = (item: any, field: string) => {
    if (lang === "en") return item[field];
    return item[`${field}_${lang}`] || item[field];
  };

  const title = getLocalized(blog, "title");
  const subtitle = getLocalized(blog, "subtitle");

  const rawTranslatedContent = lang !== "en" ? blog[`content_${lang}`] : null;
  const content = rawTranslatedContent
    ? mergeImagesIntoTranslation(blog.content, rawTranslatedContent)
    : blog.content;

  return (
    <>
      <section className="relative h-[420px] md:h-[520px] flex items-center justify-center text-white text-center overflow-hidden">
        {blog.mainImage?.asset?.url && (
          <img
            src={blog.mainImage.asset.url}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>

          {subtitle && (
            <p className="text-lg md:text-xl text-gray-200">{subtitle}</p>
          )}
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6">
        <div
          className="prose prose-lg max-w-none
          prose-headings:text-black
          dark:prose-headings:text-white
          prose-p:text-gray-700
          dark:prose-p:text-gray-300
          prose-strong:text-black
          dark:prose-strong:text-white"
        >
          {content && (
            <PortableText
              value={content}
              components={{
                block: {
                  h1: ({ children }) => (
                    <h1 className="text-4xl font-bold mt-10 mb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl font-semibold mt-8 mb-3">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-semibold mt-6 mb-2">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">
                      {children}
                    </h4>
                  ),
                  normal: ({ children }) => (
                    <p className="mb-4 leading-relaxed">{children}</p>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal pl-6 space-y-2 mb-6">
                      {children}
                    </ol>
                  ),
                },
                types: {
                  image: ({ value }) => (
                    <img
                      src={urlFor(value).width(1000).url()}
                      alt=""
                      className="rounded-xl my-12"
                    />
                  ),
                },
              }}
            />
          )}
        </div>
      </section>
    </>
  );
}
