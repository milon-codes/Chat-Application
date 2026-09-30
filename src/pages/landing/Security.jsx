import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaDatabase,
  FaLock,
  FaShieldAlt,
  FaUserShield,
} from "react-icons/fa";

const securityFeatures = [
  {
    icon: <FaLock />,
    title: "Secure Authentication",
    desc: "Firebase Authentication helps protect user accounts and limits access to authenticated users.",
    tag: "Authentication",
  },
  {
    icon: <FaUserShield />,
    title: "Authenticated Access",
    desc: "Chat access is built around signed-in users, helping keep conversations available to the appropriate accounts.",
    tag: "Access Control",
  },
  {
    icon: <FaShieldAlt />,
    title: "Protected Data",
    desc: "Firebase Security Rules help control who can read and write chat data and reduce unauthorized access.",
    tag: "Security Rules",
  },
];

const SecurityCard = ({ icon, title, desc, tag, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -7 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-6 shadow-lg shadow-slate-200/30 backdrop-blur-xl transition-all duration-300 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-none dark:hover:border-indigo-500/35 sm:p-7 lg:p-8"
    >
      {/* Hover Glow */}

      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/20" />

      {/* Top Line */}

      <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full" />

      {/* Icon */}

      <div className="relative mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-2xl text-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-400 dark:group-hover:bg-indigo-500 dark:group-hover:text-white sm:h-16 sm:w-16">
        {icon}
      </div>

      {/* Tag */}

      <span className="relative mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
        <FaCheckCircle className="text-[9px]" />
        {tag}
      </span>

      {/* Content */}

      <div className="relative flex-1">
        <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white sm:text-xl">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
          {desc}
        </p>
      </div>

      {/* Bottom Indicator */}

      <div className="relative mt-7 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 transition-all duration-500 group-hover:w-8" />
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-300 dark:bg-indigo-500/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-200 dark:bg-indigo-500/20" />
      </div>
    </motion.div>
  );
};

function Security() {
  return (
    <section
      id="security"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-10 sm:py-20 text-slate-900 transition-colors duration-500 dark:from-[#020617] dark:via-[#0b1120] dark:to-[#020617] dark:text-white "
    >
      {/* Background Decorations */}

      <div className="pointer-events-none absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px] sm:h-72 sm:w-72" />

      <div className="pointer-events-none absolute -bottom-20 -left-32 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="pointer-events-none absolute right-0 top-1/3 h-64 w-64 translate-x-1/2 rounded-full bg-indigo-500/10 blur-[110px] sm:h-72 sm:w-72" />

      {/* Section Header */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto mb-12 max-w-3xl px-5 text-center sm:mb-14 sm:px-6 lg:mb-16 lg:px-8"
      >
        {/* Badge */}

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400 sm:mb-6 sm:px-4 sm:py-2 sm:text-xs">
          <FaShieldAlt />
          Built With Security In Mind
        </div>

        {/* Heading */}

        <h2 className="text-3xl font-black leading-tight tracking-[-0.035em] text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
          Security That Supports
          <span className="mt-1 block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
            Your Chat Experience
          </span>
        </h2>

        {/* Description */}

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:mt-6 sm:text-base lg:text-lg">
          Chatly uses Firebase Authentication and Security Rules to help protect
          accounts and control access to chat data.
        </p>

        {/* Divider */}

        <div className="mx-auto mt-7 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 shadow-lg shadow-indigo-500/20 sm:mt-8 sm:w-20" />
      </motion.div>

      {/* Security Cards */}

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-6 md:grid-cols-3 lg:gap-7 lg:px-8">
        {securityFeatures.map((feature, index) => (
          <SecurityCard key={feature.title} {...feature} index={index} />
        ))}
      </div>

      {/* Bottom Panel */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative mx-auto mt-10 max-w-6xl px-5 sm:mt-12 sm:px-6 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-[1.75rem] border border-indigo-200/60 bg-gradient-to-r from-indigo-50 via-white to-purple-50 p-5 dark:border-indigo-500/20 dark:from-indigo-500/10 dark:via-slate-900/70 dark:to-purple-500/10 sm:rounded-[2rem] sm:p-7 lg:p-8">
          {/* Glow */}

          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Content */}

            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-lg text-white shadow-lg shadow-indigo-500/25 sm:h-12 sm:w-12 sm:text-xl">
                <FaDatabase />
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white sm:text-lg">
                  Firebase-Powered Security
                </h3>

                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Authentication and access controls are built into the chat
                  system.
                </p>
              </div>
            </div>

            {/* Security Badges */}

            <div className="flex flex-wrap gap-2.5 pl-[3.25rem] sm:gap-3 sm:pl-0 lg:justify-end">
              {["Authentication", "Security Rules", "Protected Access"].map(
                (item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:px-4 sm:text-xs"
                  >
                    <FaCheckCircle className="shrink-0 text-indigo-500" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Security;
