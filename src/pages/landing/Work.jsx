import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaUserFriends,
  FaComments,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    step: "01",
    icon: <FaUserPlus />,
    title: "Create Your Account",
    desc: "Create your account in a few simple steps and set up your profile to get started.",
    tag: "Quick Setup",
  },
  {
    step: "02",
    icon: <FaUserFriends />,
    title: "Find Your Friends",
    desc: "Discover users, connect with friends, and get ready to start meaningful conversations.",
    tag: "Connect",
  },
  {
    step: "03",
    icon: <FaComments />,
    title: "Start Chatting",
    desc: "Send real-time messages, share images or files, and stay connected with your friends.",
    tag: "Real-Time Chat",
  },
];

const Step = ({ step, icon, title, desc, tag, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      {/* Step Connector Dot */}
      <div className="absolute -top-5 left-1/2 z-20 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-indigo-200 bg-white shadow-md dark:border-indigo-500/30 dark:bg-slate-900 lg:flex">
        <span className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/40 transition-transform duration-500 group-hover:scale-150" />
      </div>

      {/* Card */}
      <div className="relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-7 shadow-xl shadow-slate-200/30 backdrop-blur-xl transition-all duration-500 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-none dark:hover:border-indigo-500/40 sm:p-8 md:p-9">
        {/* Top Gradient Line */}
        <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 transition-all duration-700 group-hover:w-full" />

        {/* Background Number */}
        <span className="pointer-events-none absolute -right-3 -top-8 select-none text-[8rem] font-black leading-none text-slate-100 transition-colors duration-500 group-hover:text-indigo-500/10 dark:text-white/[0.035] dark:group-hover:text-indigo-500/10 sm:text-[9rem]">
          {step}
        </span>

        {/* Icon */}
        <div className="relative z-10 mb-7 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-2xl text-white shadow-lg shadow-indigo-500/25 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-indigo-500/35">
          {icon}
        </div>

        {/* Step Label */}
        <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
            <FaCheckCircle className="text-[9px]" />
            {tag}
          </span>

          <span className="text-xs font-black tracking-widest text-slate-300 dark:text-slate-700">
            STEP {step}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1">
          <h3 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            {title}
          </h3>

          <p className="text-sm font-medium leading-7 text-slate-600 dark:text-slate-400">
            {desc}
          </p>
        </div>

        {/* Bottom Arrow */}
        <div className="relative z-10 mt-8 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-indigo-500 to-transparent transition-all duration-500 group-hover:w-16" />

          <FaArrowRight className="translate-x-0 text-xs text-indigo-500 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
        </div>

        {/* Hover Glow */}
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
};

function Work() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-10 sm:py-20 transition-colors duration-500 dark:from-[#020617] dark:via-[#0b1120] dark:to-[#020617]"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-[110px]" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto mb-14 max-w-3xl px-6 text-center sm:mb-16 md:mb-20"
      >
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
          <FaComments />
          Simple & Easy
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
          How Chatly
          <span className="mt-2 block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
            Works
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-7 text-slate-600 dark:text-slate-400 md:text-lg">
          Getting started is simple. Create your account, connect with friends,
          and start having real-time conversations.
        </p>

        {/* Divider */}
        <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 shadow-lg shadow-indigo-500/20" />
      </motion.div>

      {/* Steps */}
      <div className="relative mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-3">
        {/* Desktop Connecting Line */}
        <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[-1.25rem] hidden h-px lg:block">
          <div className="relative h-full w-full border-t border-dashed border-indigo-200 dark:border-indigo-500/20">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute left-0 top-[-1px] h-[2px] w-full origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-60"
            />
          </div>
        </div>

        {steps.map((step, index) => (
          <Step key={step.step} {...step} index={index} />
        ))}
      </div>

      {/* Bottom Message */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="relative mx-auto mt-14 max-w-6xl px-6"
      >
        <div className="overflow-hidden rounded-[1.75rem] border border-indigo-200/60 bg-gradient-to-r from-indigo-50 via-white to-purple-50 p-6 dark:border-indigo-500/20 dark:from-indigo-500/10 dark:via-slate-900/70 dark:to-purple-500/10 sm:p-7">
          <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
              <FaCheckCircle />
            </div>

            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 md:text-base">
              A straightforward path from signup to real-time conversation.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Work;
