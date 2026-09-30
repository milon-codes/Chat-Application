import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft, FiMessageCircle } from "react-icons/fi";
import { IoIosChatbubbles } from "react-icons/io";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-indigo-50/40 px-5 py-16 transition-colors duration-500 dark:from-[#020617] dark:via-[#081127] dark:to-[#020617] sm:px-6">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[140px] dark:bg-indigo-500/5" />
      <div className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px] dark:bg-purple-500/5" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5" />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Chat Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-indigo-600 to-purple-600 text-4xl text-white shadow-2xl shadow-indigo-500/25 sm:h-28 sm:w-28 sm:text-5xl"
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <IoIosChatbubbles size={90} />
          </motion.div>
        </motion.div>

        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[6rem] font-black leading-none tracking-[-0.08em] text-slate-900 dark:text-white sm:text-[9rem] md:text-[11rem]"
        >
          4
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            0
          </span>
          4
        </motion.h1>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
            <FiMessageCircle size={13} />
            Page Not Found
          </div>

          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl md:text-4xl">
            Oops! This conversation went missing.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm font-medium leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
            The page you&apos;re looking for doesn&apos;t exist, may have been
            moved, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95 sm:w-auto"
          >
            <FiHome size={17} />
            Back to Home
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-xs font-black uppercase tracking-widest text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 sm:w-auto"
          >
            <FiArrowLeft size={17} />
            Go Back
          </button>
        </motion.div>

        {/* Bottom Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mx-auto mt-16 flex max-w-md items-center justify-center gap-3"
        >
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-600">
            Chatly • 404
          </span>
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;
