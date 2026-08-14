"use client";

import { Building2, Users, Award, ShieldCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/language-context";

const goldenColor = "#C9A227";

/* ================= ANIMATIONS ================= */

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/* ================= COMPONENT ================= */

export default function WhyChooseUs() {
  const router = useRouter();
  const { t } = useTranslation();

  const stats = [
    { icon: Building2, value: "500+", label: t("about.stat.properties") },
    { icon: Users, value: "2000+", label: t("about.stat.happyClients") },
    { icon: Award, value: "15+", label: t("about.stat.yearsExperience") },
    { icon: ShieldCheck, value: "100%", label: t("about.stat.trustedService") },
  ];

  const features = [
    t("about.feature.exclusiveAccess"),
    t("about.feature.expertGuidance"),
    t("about.feature.transparentPricing"),
    t("about.feature.postPurchase"),
    t("about.feature.multilingualTeam"),
  ];

  return (
    <section className="bg-white dark:bg-[#0F172A] overflow-hidden transition-colors duration-300 font-body">
      {/* ================= STATS ================= */}
      <div className="bg-[#E5E7EB] dark:bg-[#111827] py-10 sm:py-12 px-4 transition-colors duration-300">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 sm:gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <stat.icon
                className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3"
                style={{ color: goldenColor }}
              />

              <div className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>

              <p className="font-body text-[11px] sm:text-xs tracking-wider text-gray-500 dark:text-gray-400 mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="py-12 px-4 sm:px-6 sm:py-16 md:py-24 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* IMAGE BLOCK */}
          <motion.div
            className="order-1 lg:order-2 relative px-2 sm:px-0"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden shadow-xl">
              <motion.img
                src="/assets/about1.png"
                alt="Luxury Property"
                loading="lazy"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Badge kept within the image's own bounds on mobile so the
               section's overflow-hidden never clips it; only offsets
               outward from sm breakpoint up where there's room. */}
            <div
              className="absolute -bottom-5 left-3 sm:-bottom-8 sm:left-[-10px] md:left-[-14px] px-3.5 py-3 sm:px-4 sm:py-4 rounded-lg text-white shadow-lg"
              style={{ backgroundColor: goldenColor }}
            >
              <div className="text-center">
                <div className="font-heading text-2xl sm:text-3xl font-bold">15+</div>
                <div className="font-body text-xs sm:text-sm whitespace-nowrap">
                  {t("about.yearsOfExcellence")}
                </div>
              </div>
            </div>
          </motion.div>

          {/* TEXT BLOCK */}
          <motion.div
            className="order-2 lg:order-1 space-y-5 sm:space-y-6 mt-8 lg:mt-0"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              className="font-body text-xs sm:text-sm font-semibold tracking-wider uppercase inline-block"
              style={{ color: goldenColor }}
              variants={fadeUp}
            >
              {t("about.whyGrPremium")}
            </motion.span>

            <motion.h2
              className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
              variants={fadeUp}
            >
              {t("about.whyChooseGrPremium")}
            </motion.h2>

            <motion.p
              className="font-body text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed"
              variants={fadeUp}
            >
              {t("about.description")}
            </motion.p>

            <motion.ul className="space-y-3 sm:space-y-4" variants={container}>
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  className="flex gap-3"
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                >
                  <span
                    className="w-2 h-2 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"
                    style={{ backgroundColor: goldenColor }}
                  />
                  <span className="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.button
              onClick={() => router.push("/about")}
              className="font-body px-8 py-3 cursor-pointer rounded-md font-semibold text-black w-full sm:w-fit text-center"
              style={{ backgroundColor: goldenColor }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px -10px rgba(201,162,39,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              variants={fadeUp}
            >
              {t("about.getStartedToday")}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}