import { motion } from "framer-motion";
import {
  FaComments,
  FaBolt,
  FaShieldAlt,
  FaImage,
  FaCode,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { FcAddDatabase } from "react-icons/fc";
import { SiFirebase, SiReact, SiTailwindcss } from "react-icons/si";

const highlights = [
  {
    icon: <FaComments />,
    title: "Real-Time Messaging",
    desc: "Chatly keeps conversations updated in real time, so new messages appear without refreshing the page.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Protected Access",
    desc: "Firebase Authentication and Security Rules help manage account access and protect chat data.",
  },
  {
    icon: <FaBolt />,
    title: "Responsive Experience",
    desc: "The interface is designed to feel smooth and consistent across desktop, tablet, and mobile devices.",
  },
  {
    icon: <FaImage />,
    title: "Media Sharing",
    desc: "Share images and files directly inside conversations while keeping the messaging experience organized.",
  },
];

const technologies = [
  {
    name: "React",
    icon: <SiReact />,
  },
  {
    name: "Firebase",
    icon: <SiFirebase />,
  },
  {
    name: "Firestore",
    icon: <FcAddDatabase />,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
  },
];

const InfoCard = ({ icon, title, desc, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-7 shadow-lg shadow-slate-200/30 backdrop-blur-xl transition-all duration-500 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-none dark:hover:border-indigo-500/40"
    >
      {/* Top Gradient */}
      <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 transition-all duration-700 group-hover:w-full" />

      {/* Hover Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Icon */}
      <div className="relative mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-xl text-indigo-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400 dark:group-hover:bg-indigo-500 dark:group-hover:text-white">
        {icon}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1">
        <h3 className="mb-3 text-lg font-black tracking-tight text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="text-sm font-medium leading-7 text-slate-600 dark:text-slate-400">
          {desc}
        </p>
      </div>

      {/* Bottom Indicator */}
      <div className="relative z-10 mt-7 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 transition-all duration-500 group-hover:w-8" />
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-300 dark:bg-indigo-500/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-200 dark:bg-indigo-500/20" />
      </div>
    </motion.div>
  );
};

const FaDatabase = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 3c4.418 0 8 1.343 8 3s-3.582 3-8 3-8-1.343-8-3 3.582-3 8-3Zm-8 3v5c0 1.657 3.582 3 8 3s8-1.343 8-3V6c0 1.657-3.582 3-8 3s-8-1.343-8-3Zm0 5v5c0 1.657 3.582 3 8 3s8-1.343 8-3v-5c0 1.657-3.582 3-8 3s-8-1.343-8-3Zm0 5v2c0 1.657 3.582 3 8 3s8-1.343 8-3v-2c0 1.657-3.582 3-8-3s-8 1.343-8 3Z" />
  </svg>
);

const About = () => {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-10 sm:py-20 transition-colors duration-500 dark:from-[#020617] dark:via-[#0b1120] dark:to-[#020617]"
    >
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -left-32 bottom-20 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
            <FaComments />
            About Chatly
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
            Built For
            <span className="mt-2 block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
              Everyday Conversations
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-7 text-slate-600 dark:text-slate-400 md:text-lg">
            Chatly is a real-time chat application focused on simple
            communication, practical features, and a clean user experience.
          </p>

          <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 shadow-lg shadow-indigo-500/20" />
        </motion.div>

        {/* Intro */}
        <div className="mb-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Chat Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-r from-indigo-500 to-purple-500 opacity-10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-6 md:p-8">
              {/* Chat Header */}
              <div className="mb-7 flex items-center justify-between border-b border-slate-100 pb-5 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-lg text-white shadow-lg">
                    <FaComments />
                    <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white">
                      Chatly
                    </p>
                    <p className="text-xs font-medium text-emerald-500">
                      Online
                    </p>
                  </div>
                </div>

                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <span className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <span className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-5">
                <div className="flex items-end gap-3">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500" />

                  <div className="rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 dark:bg-slate-800">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      Hey! How are you doing?
                    </p>
                  </div>
                </div>

                <div className="flex items-end justify-end gap-3">
                  <div className="rounded-2xl rounded-br-md bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 shadow-lg shadow-indigo-500/10">
                    <p className="text-xs font-medium text-white">
                      I&apos;m doing great! 😊
                    </p>
                  </div>

                  <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                </div>

                <div className="flex items-end gap-3">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500" />

                  <div className="rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 dark:bg-slate-800">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Strip */}
              <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-xl bg-indigo-50 p-3 text-center dark:bg-indigo-500/10">
                  <FaBolt className="mx-auto mb-1 text-indigo-500" />
                  <span className="text-[9px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Real-Time
                  </span>
                </div>

                <div className="rounded-xl bg-purple-50 p-3 text-center dark:bg-purple-500/10">
                  <FaShieldAlt className="mx-auto mb-1 text-purple-500" />
                  <span className="text-[9px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Protected
                  </span>
                </div>

                <div className="rounded-xl bg-slate-100 p-3 text-center dark:bg-slate-800">
                  <FaImage className="mx-auto mb-1 text-slate-500" />
                  <span className="text-[9px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Media
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="mb-4 inline-block text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              The Idea Behind Chatly
            </span>

            <h3 className="text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-4xl">
              A focused chat experience
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                without unnecessary complexity.
              </span>
            </h3>

            <p className="mt-6 text-base font-medium leading-8 text-slate-600 dark:text-slate-400">
              Chatly was built as a practical real-time communication project,
              bringing authentication, messaging, user presence, media sharing,
              and message controls together in one responsive interface.
            </p>

            {/* Project Principles */}
            <div className="mt-8 space-y-4">
              {[
                "Simple and focused communication",
                "Real-time interaction powered by Firebase",
                "Responsive experience across devices",
                "Practical features for everyday chat",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <FaCheckCircle className="text-xs" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="mb-10 text-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              What Makes It Practical
            </span>

            <h3 className="mt-3 text-2xl font-black text-slate-900 dark:text-white md:text-3xl">
              Designed Around Real Usage
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
              Chatly brings together the core interactions people expect from a
              modern real-time messaging application.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, index) => (
              <InfoCard key={item.title} {...item} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Technology */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-7 shadow-xl shadow-slate-200/20 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-none md:p-10"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-purple-500/10 blur-[100px]" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            {/* Technology Intro */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <FaCode />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Technology Stack
                  </p>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Built With Modern Tools
                  </h3>
                </div>
              </div>

              <p className="max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-slate-400">
                Chatly combines React with Firebase services and Tailwind CSS to
                create a responsive interface with real-time data and
                authentication.
              </p>
            </div>

            {/* Technologies */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-xl">
              {technologies.map((technology) => (
                <div
                  key={technology.name}
                  className="group flex min-w-0 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
                >
                  <span className="shrink-0 text-sm text-indigo-500 transition-transform duration-300 group-hover:scale-110">
                    {technology.icon}
                  </span>

                  <span className="truncate text-xs font-bold">
                    {technology.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project Credit */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex flex-col items-center gap-3 sm:flex-row">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              A real-world project built by
            </span>

            <span className="inline-flex items-center gap-2 font-black text-slate-900 dark:text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-xs text-white">
                M
              </span>
              Milon
            </span>

            <FaArrowRight className="hidden text-xs text-indigo-500 sm:block" />

            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              React + Firebase
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
