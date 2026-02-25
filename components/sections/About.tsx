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
    <section className="bg-white dark:bg-[#0F172A] overflow-hidden transition-colors duration-300">

      {/* ================= STATS ================= */}
      <div className="bg-[#E5E7EB] dark:bg-[#111827] py-12 px-4 transition-colors duration-300">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
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
                className="w-10 h-10 mx-auto mb-3"
                style={{ color: goldenColor }}
              />

              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>

              <p className="text-xs tracking-wider text-gray-500 dark:text-gray-400 mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="py-16 px-4 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* IMAGE BLOCK */}
          <motion.div
            className="order-1 lg:order-2 relative"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.img
              src="/assets/about1.png"
              alt="Luxury Property"
              className="w-full rounded-xl shadow-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />

            <div
              className="absolute -bottom-8 left-[-10px] md:left-[-14px] px-4 py-4 rounded-lg text-white shadow-lg"
              style={{ backgroundColor: goldenColor }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">{t("about.yearsOfExcellence")}</div>
              </div>
            </div>
          </motion.div>

          {/* TEXT BLOCK */}
          <motion.div
            className="order-2 lg:order-1 space-y-6"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              className="text-sm font-semibold tracking-wider uppercase inline-block"
              style={{ color: goldenColor }}
              variants={fadeUp}
            >
              {t("about.whyGrPremium")}
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
              variants={fadeUp}
            >
              {t("about.whyChooseGrPremium")}
            </motion.h2>

            <motion.p
              className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed"
              variants={fadeUp}
            >
              {t("about.description")}
            </motion.p>

            <motion.ul
              className="space-y-4"
              variants={container}
            >
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  className="flex gap-3"
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                >
                  <span
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: goldenColor }}
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.button
              onClick={() => router.push("/about")}
              className="px-8 py-3 cursor-pointer rounded-md font-semibold text-black w-fit"
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
