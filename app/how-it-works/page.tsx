import Image from "next/image";
import React from "react";
import CTA from "@/components/sections/CTA";
import {
  Search,
  FileText,
  Key,
  Headphones,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import T from "@/components/ui/T";

export default function HowItWorks() {
  return (
    <main className="bg-white dark:bg-[#0F172A] transition-colors duration-300">
      
      {/* HERO */}
      <section className="relative h-[70vh] w-full">
        <Image
          src="/assets/hero-1.jpg"
          alt="How it works"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-6">
          <div className="max-w-3xl text-white">
            <p className="tracking-widest text-sm text-yellow-400 mb-3">
              <T k="howItWorks.ourProcess" />
            </p>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              <T k="howItWorks.title" />
            </h1>
            <p className="text-gray-200">
              <T k="howItWorks.description" />
            </p>
          </div>
        </div>
      </section>

      {/* STEP SECTIONS */}
      <Section
        step="01"
        icon={<Search size={18} />}
        title={<T k="howItWorks.step1Title" />}
        text={<T k="howItWorks.step1Text" />}
        image="/hiw1.png"
        points={[
          <T key="p1" k="howItWorks.step1Point1" />,
          <T key="p2" k="howItWorks.step1Point2" />,
          <T key="p3" k="howItWorks.step1Point3" />,
          <T key="p4" k="howItWorks.step1Point4" />,
        ]}
      />

      <Section
        step="02"
        reverse
        icon={<FileText size={18} />}
        title={<T k="howItWorks.step2Title" />}
        text={<T k="howItWorks.step2Text" />}
        image="/hiw2.png"
        points={[
          <T key="p1" k="howItWorks.step2Point1" />,
          <T key="p2" k="howItWorks.step2Point2" />,
          <T key="p3" k="howItWorks.step2Point3" />,
          <T key="p4" k="howItWorks.step2Point4" />,
        ]}
      />

      <Section
        step="03"
        icon={<Key size={18} />}
        title={<T k="howItWorks.step3Title" />}
        text={<T k="howItWorks.step3Text" />}
        image="/hiw3.png"
        points={[
          <T key="p1" k="howItWorks.step3Point1" />,
          <T key="p2" k="howItWorks.step3Point2" />,
          <T key="p3" k="howItWorks.step3Point3" />,
          <T key="p4" k="howItWorks.step3Point4" />,
        ]}
      />

      <Section
        step="04"
        reverse
        icon={<Headphones size={18} />}
        title={<T k="howItWorks.step4Title" />}
        text={<T k="howItWorks.step4Text" />}
        image="/hiw4.png"
        points={[
          <T key="p1" k="howItWorks.step4Point1" />,
          <T key="p2" k="howItWorks.step4Point2" />,
          <T key="p3" k="howItWorks.step4Point3" />,
          <T key="p4" k="howItWorks.step4Point4" />,
        ]}
      />

      <CTA />
      <Footer />
    </main>
  );
}


/* 🔹 STEP COMPONENT */
function Section({
  step,
  title,
  text,
  image,
  points,
  icon,
  reverse = false,
}: {
  step: string;
  title: React.ReactNode;
  text: React.ReactNode;
  image: string;
  points: React.ReactNode[];
  icon: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section className="py-20 bg-[#F8F5ED] dark:bg-[#111827] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <div className={`${reverse ? "md:order-2" : ""}`}>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={image}
              alt={typeof title === "string" ? title : step}
              width={600}
              height={420}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>

        {/* TEXT BLOCK */}
        <div className={`${reverse ? "md:order-1" : ""}`}>

          {/* STEP + ICON */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl font-serif text-[#E8D9A8] dark:text-[#C9A227]">
              {step}
            </span>

            <div className="w-10 h-10 rounded-full border border-[#C9A227] flex items-center justify-center text-[#C9A227]">
              {icon}
            </div>
          </div>

          <h3 className="text-2xl font-serif mb-4 text-gray-900 dark:text-white">
            {title}
          </h3>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {text}
          </p>

          <ul className="space-y-3">
            {points.map((p: React.ReactNode, i: number) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full border border-[#C9A227] flex items-center justify-center text-[#C9A227] text-xs">
                  ✓
                </span>
                <span className="text-gray-800 dark:text-gray-300">
                  {p}
                </span>
              </li>
            ))}
          </ul>

        </div>

      </div>
    </section>
  );
}
