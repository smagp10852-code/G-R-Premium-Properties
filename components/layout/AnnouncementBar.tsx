import { sanityClient } from "@/lib/sanity.client";
import { announcementQuery } from "@/lib/sanity.queries";
import AnnouncementBarClient from "./AnnouncementBarClient";

export default async function AnnouncementBar() {
  const announcements =
    (await sanityClient.fetch(announcementQuery)) ?? [];

  if (!announcements.length) return null;

  return <AnnouncementBarClient announcements={announcements} />;
}
