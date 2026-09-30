import { motion } from "framer-motion";
import { IoIosChatbubbles } from "react-icons/io";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white/90 px-6 backdrop-blur-xl dark:bg-[#020617]/95">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5" />

      <div className="relative flex flex-col items-center">
        {/* Loader */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[3px] border-indigo-100 border-t-indigo-600 border-r-purple-500 dark:border-slate-800 dark:border-t-indigo-500 dark:border-r-purple-500"
          />

          {/* Inner Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full border-2 border-dashed border-indigo-300/50 dark:border-indigo-500/30"
          />

          {/* Icon Glow */}
          <div className="absolute h-14 w-14 rounded-full bg-indigo-500/20 blur-xl" />

          {/* Center Icon */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30"
          >
            <IoIosChatbubbles className="text-2xl" />
          </motion.div>
        </div>

        {/* Loading Text */}
        <div className="mt-9 flex flex-col items-center">
          <div className="flex items-center">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Chatly
            </span>

            <span className="ml-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Loading
            </span>
          </div>

          {/* Animated Dots */}
          <div className="mt-4 flex items-center gap-1.5">
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: index * 0.15,
                  ease: "easeInOut",
                }}
                className={`h-1.5 w-1.5 rounded-full ${
                  index === 0
                    ? "bg-indigo-500"
                    : index === 1
                      ? "bg-purple-500"
                      : "bg-cyan-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="mt-7 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
            Connecting
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
