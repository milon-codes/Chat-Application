import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheck,
  FiMessageCircle,
  FiShield,
  FiUser,
  FiUsers,
  FiZap,
} from "react-icons/fi";

function Hero() {
  const heroImage =
    "https://res.cloudinary.com/da65g97jk/image/upload/v1785465366/hero_image_y2mrua.png";

  const highlights = [
    {
      icon: <FiMessageCircle />,
      title: "Live Updates",
    },
    {
      icon: <FiShield />,
      title: "Protected Access",
    },
    {
      icon: <FiZap />,
      title: "Smooth Experience",
    },
  ];

  const capabilities = [
    {
      icon: <FiMessageCircle />,
      title: "Live Conversations",
      description: "Messages appear instantly as chats update.",
    },
    {
      icon: <FiUsers />,
      title: "Friends & Contacts",
      description: "Find people and start conversations easily.",
    },
    {
      icon: <FiUser />,
      title: "Personal Profile",
      description: "Manage your profile details and avatar.",
    },
    {
      icon: <FiShield />,
      title: "Firebase Authentication",
      description: "Sign in and access your account securely.",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-slate-50 via-white to-indigo-50/70 text-slate-900 transition-colors duration-500 dark:from-[#020617] dark:via-[#081127] dark:to-[#020617] dark:text-white"
    >
      {/* Background Decorations */}

      <div className="pointer-events-none absolute -top-[280px] left-1/2 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[150px] dark:bg-indigo-500/10 sm:h-[750px] sm:w-[750px]" />

      <div className="pointer-events-none absolute -left-[250px] top-[35%] h-[450px] w-[450px] rounded-full bg-purple-500/10 blur-[140px] dark:bg-purple-500/10 sm:h-[500px] sm:w-[500px]" />

      <div className="pointer-events-none absolute -bottom-[150px] -right-[250px] h-[450px] w-[450px] rounded-full bg-indigo-500/10 blur-[140px] dark:bg-indigo-500/10 sm:h-[500px] sm:w-[500px]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.035] [background-image:linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Hero Content */}

      <div className="relative z-10 pt-28 sm:pt-32 lg:pt-36 xl:pt-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-20">
            {/* Left Content */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              {/* Badge */}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3.5 py-2 text-xs font-bold text-indigo-600 shadow-sm shadow-indigo-500/5 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300 sm:mb-7 sm:px-4 sm:text-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                </span>
                Modern Messaging Experience
              </motion.div>

              {/* Heading */}

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-4xl font-black leading-[1.08] tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[64px]"
              >
                Connect.{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                  Chat. Communicate.
                </span>
              </motion.h1>

              {/* Description */}

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:mt-7 sm:text-lg sm:leading-8"
              >
                Chatly gives you a clean and focused place to message friends,
                share files, follow message status, and stay updated while
                conversations happen in real time.
              </motion.p>

              {/* Highlights */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="mt-7 flex flex-wrap gap-x-5 gap-y-3 sm:mt-8 sm:gap-x-6 sm:gap-y-4"
              >
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="group flex items-center gap-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-500/10 dark:text-indigo-400">
                      {item.icon}
                    </span>
                    {item.title}
                  </div>
                ))}
              </motion.div>

              {/* CTA */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="mt-9 flex flex-col gap-3.5 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <Link
                  to="/register"
                  className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30 active:translate-y-0 sm:w-auto sm:px-9"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative z-10">Start Chatting</span>
                  <FiArrowRight
                    size={18}
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="#features"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-7 py-4 text-sm font-bold text-slate-700 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 sm:w-auto sm:px-8"
                >
                  Explore Features
                  <FiArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </motion.div>

              {/* Trust Line */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="mt-6 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 sm:mt-7"
              >
                <FiCheck className="shrink-0 text-emerald-500" size={15} />
                Simple setup • Live updates • Responsive interface
              </motion.div>
            </motion.div>

            {/* Right Preview */}

            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-xl lg:max-w-none"
            >
              {/* Outer Glow */}

              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-indigo-500/20 via-purple-500/15 to-pink-500/10 blur-3xl sm:-inset-8" />

              {/* Top Floating Badge */}

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-5 left-3 z-20 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90 sm:flex sm:left-8"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <FiMessageCircle size={18} />
                </span>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </p>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                    Live messaging
                  </p>
                </div>
              </motion.div>

              {/* Main Image Card */}

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 rounded-[1.75rem] border border-white/70 bg-white/40 p-2 shadow-[0_30px_80px_rgba(15,23,42,0.15)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_30px_80px_rgba(0,0,0,0.4)] sm:rounded-[2.5rem] sm:p-3"
              >
                <div className="relative overflow-hidden rounded-[1.35rem] bg-slate-100 dark:bg-slate-900 sm:rounded-[2rem]">
                  <img
                    src={heroImage}
                    alt="Chatly real-time messaging interface"
                    className="block h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-indigo-950/10 via-transparent to-white/5" />
                </div>
              </motion.div>

              {/* Bottom Floating Badge */}

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-5 right-2 z-20 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90 sm:flex sm:right-8"
              >
                <span className="relative flex h-9 w-9">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
                  <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <FiZap size={16} />
                  </span>
                </span>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Experience
                  </p>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                    Smooth & responsive
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Capabilities */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-24 pb-20 sm:px-6 sm:pt-28 sm:pb-24 lg:px-8 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Built for everyday conversations
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Simple tools, thoughtfully connected
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
            From finding friends to managing your profile, Chatly keeps the
            essentials close without making the interface feel complicated.
          </p>
        </motion.div>

        {/* Capability Cards */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group h-full rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-none dark:hover:border-indigo-500/30 sm:p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-500/10 dark:text-indigo-400">
                {item.icon}
              </div>

              <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Fade */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-[#020617]" />
    </section>
  );
}

export default Hero;
