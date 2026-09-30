import { motion } from "framer-motion";
import { BsFillReplyFill } from "react-icons/bs";
import {
  FiCheck,
  FiClock,
  FiImage,
  FiMessageCircle,
  FiShield,
  FiUser,
  FiWifi,
  FiZap,
} from "react-icons/fi";

const features = [
  {
    icon: <FiMessageCircle />,
    title: "Real-Time Messaging",
    desc: "Send and receive messages instantly with a smooth real-time chat experience.",
    tag: "Core",
  },
  {
    icon: <FiUser />,
    title: "User Profiles",
    desc: "Create a personal profile with your name, avatar, and account information.",
    tag: "Personal",
  },
  {
    icon: <FiWifi />,
    title: "Online & Offline Status",
    desc: "See when your friends are online and know when they are unavailable.",
    tag: "Live",
  },
  {
    icon: <FiZap />,
    title: "Typing Indicator",
    desc: "Know when someone is typing and keep conversations feeling natural.",
    tag: "Live",
  },
  {
    icon: <FiCheck />,
    title: "Seen Messages",
    desc: "Track message status and know when your messages have been seen.",
    tag: "Messaging",
  },
  {
    icon: <FiClock />,
    title: "Message Timestamps",
    desc: "Keep track of conversations with clear and easy-to-read message times.",
    tag: "Messaging",
  },
  {
    icon: <FiImage />,
    title: "Image & File Sharing",
    desc: "Share images and supported files directly inside your conversations.",
    tag: "Media",
  },
  {
    icon: <BsFillReplyFill />,
    title: "Reply & Delete",
    desc: "Reply to specific messages and remove messages when you need to.",
    tag: "Control",
  },
];

function Feature() {
  return (
    <section
      id="features"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-indigo-50/40 py-10 sm:py-20 text-slate-900 transition-colors duration-500 dark:from-[#020617] dark:via-[#081127] dark:to-[#020617] dark:text-white "
    >
      {/* Background Decorations */}

      <div className="pointer-events-none absolute -top-40 left-1/2 h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5 sm:h-[400px] sm:w-[600px]" />

      <div className="pointer-events-none absolute -right-60 top-1/2 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[130px] dark:bg-purple-500/5 sm:h-[450px] sm:w-[450px]" />

      <div className="pointer-events-none absolute -bottom-40 -left-60 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[130px] dark:bg-indigo-500/5 sm:h-[450px] sm:w-[450px]" />

      {/* Main Container */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Header */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-14 lg:mb-16"
        >
          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
            <FiZap size={13} />
            Chatly Features
          </div>

          {/* Heading */}

          <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.035em] text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            The essentials for better
            <span className="mt-1 block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
              everyday conversations
            </span>
          </h2>

          {/* Description */}

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base sm:leading-7 lg:text-lg">
            Chatly focuses on the tools you use every day, from live messaging
            and typing status to media sharing and message controls.
          </p>

          {/* Decorative Line */}

          <div className="mt-7 flex items-center justify-center">
            <div className="h-1 w-10 rounded-full bg-indigo-600 dark:bg-indigo-400 sm:w-12" />
            <div className="mx-1 h-1 w-2 rounded-full bg-purple-500" />
            <div className="h-1 w-10 rounded-full bg-pink-500 sm:w-12" />
          </div>
        </motion.div>

        {/* Features Grid */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>

        {/* Bottom Highlight */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mt-8 overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-purple-50 p-5 shadow-sm dark:border-indigo-500/15 dark:from-indigo-500/10 dark:via-slate-900/60 dark:to-purple-500/10 sm:mt-10 sm:p-8"
        >
          {/* Glow */}

          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 sm:h-12 sm:w-12">
                <FiShield size={20} />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                  Focused on the essentials
                </h3>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Chatly brings authentication, live updates, messaging
                  controls, and media sharing together in one focused
                  experience.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 pl-[3.5rem] text-xs font-bold text-indigo-600 dark:text-indigo-400 sm:pl-0">
              <FiCheck size={15} />
              Firebase Powered
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Feature Card */

const FeatureCard = ({ icon, title, desc, tag, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      whileHover={{ y: -7 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/80 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900/55 dark:shadow-none dark:hover:border-indigo-500/25 sm:p-6"
    >
      {/* Hover Glow */}

      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Card Header */}

      <div className="relative flex items-start justify-between gap-4">
        {/* Icon */}

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-xl text-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-400">
          {icon}
        </div>

        {/* Tag */}

        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 transition-all duration-300 group-hover:border-indigo-200 group-hover:text-indigo-500 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-500 dark:group-hover:border-indigo-500/20">
          {tag}
        </span>
      </div>

      {/* Content */}

      <div className="relative mt-6 flex-1">
        <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {desc}
        </p>
      </div>

      {/* Bottom Indicator */}

      <div className="relative mt-6 flex items-center gap-2 text-[11px] font-bold text-slate-400 transition-all duration-300 group-hover:text-indigo-500 dark:text-slate-600">
        <span className="h-px w-6 bg-slate-200 transition-all duration-300 group-hover:w-10 group-hover:bg-indigo-500 dark:bg-slate-700" />
        Included in Chatly
      </div>
    </motion.div>
  );
};

export default Feature;
