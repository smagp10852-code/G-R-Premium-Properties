import Link from "next/link";
import { sanityClient } from "@/lib/sanity.client";

export default async function SitemapPage() {
  const developers = await sanityClient.fetch(`
    *[_type == "developer"] | order(name asc){
      _id,
      name,
      "slug": slug.current,
      "properties": *[_type == "property" && references(^._id)] | order(title asc){
        title,
        "slug": slug.current
      }
    }
  `);

  return (
    <div className="bg-gradient-to-b from-[#0F172A] to-[#111827] min-h-screen text-white pt-32">

      {/* ================= HERO ================= */}
      <div className="text-center pb-16 border-b border-white/10 px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
          Sitemap
        </h1>
        <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
          Explore the complete structure of GR Premium Properties
        </p>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-3 gap-16">

          {/* ================= MAIN PAGES ================= */}
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/10 hover:border-[#D4A843]/40 transition">

            <h2 className="text-2xl font-semibold mb-6 border-b border-white/10 pb-3">
              Main Pages
            </h2>

            <ul className="space-y-4 text-gray-300">
              {[
                { name: "Home", link: "/" },
                { name: "About Us", link: "/about" },
                { name: "Properties", link: "/properties" },
                { name: "Blog", link: "/blog" },
                { name: "Feature Plan", link: "/feature-plan" },
                { name: "How It Works", link: "/how-it-works" },
                { name: "Media", link: "/media" },
                { name: "Contact Us", link: "/contact" },
              ].map((page) => (
                <li key={page.name}>
                  <Link
                    href={page.link}
                    className="hover:text-[#D4A843] transition-colors duration-300"
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= DEVELOPERS ================= */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-10 border-b border-white/10 pb-3">
              Developers & Their Projects
            </h2>

            <div className="grid md:grid-cols-2 gap-10">

              {developers.map((dev: any) => (
                <div
                  key={dev._id}
                  className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-yellow-500/20 hover:border-[#D4A843]/40 transition-all duration-300"
                >
                  {/* Developer Name */}
                  <h3 className="text-xl font-semibold mb-4">
                    <Link
                      href={`/developers/${dev.slug}`}
                      className="hover:text-[#D4A843] transition-colors duration-300"
                    >
                      {dev.name}
                    </Link>
                  </h3>

                  {/* Projects */}
                  {dev.properties?.length > 0 ? (
                    <ul className="space-y-2 text-gray-400">
                      {dev.properties.map((prop: any) => (
                        <li key={prop.slug}>
                          <Link
                            href={`/developers/${dev.slug}#${prop.slug}`}
                            className="hover:text-[#D4A843] transition-colors duration-300 text-sm"
                          >
                            {prop.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No projects available
                    </p>
                  )}
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}