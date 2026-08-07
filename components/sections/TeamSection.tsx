"use client";

import Image from "next/image";

const goldenColor = "#C9A227";

type Props = {
  data: {
    name: string;
    position: string;
    role: "leadership" | "team";
    photo: any;
  }[];
};

export default function TeamSection({ data }: Props) {
  const leadership = data.filter((m) => m.role === "leadership");
  const team = data.filter((m) => m.role === "team");

  return (
    <section className="bg-[#faf9f7] py-20 px-6 md:px-24 font-body">
      {/* ================= HEADING ================= */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p
          className="font-body text-sm tracking-widest uppercase"
          style={{ color: goldenColor }}
        >
          Our People
        </p>
        <h2 className="font-heading text-4xl md:text-5xl mt-3">
          Meet Our Team
        </h2>
        <p className="font-body mt-4 text-gray-600">
          Our experienced leadership and dedicated professionals work together
          to deliver exceptional real estate experiences.
        </p>
      </div>

      {/* ================= LEADERSHIP ================= */}
      {leadership.length > 0 && (
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="font-heading text-2xl text-center mb-10">
            Leadership
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center">
            {leadership.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition"
              >
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <Image
                    src={member.photo?.asset?.url}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                <h4 className="font-heading text-xl font-semibold">
                  {member.name}
                </h4>
                <p
                  className="font-body mt-1 font-medium"
                  style={{ color: goldenColor }}
                >
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TEAM MEMBERS ================= */}
      {team.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <h3 className="font-heading text-2xl text-center mb-12">
            Our Professionals
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <Image
                    src={member.photo?.asset?.url}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                <h4 className="font-heading text-base font-semibold">
                  {member.name}
                </h4>
                <p
                  className="font-body text-sm mt-1"
                  style={{ color: goldenColor }}
                >
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}