import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosChatbubbles, IoIosArrowForward } from "react-icons/io";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaCheckCircle,
  FaBolt,
  FaShieldAlt,
} from "react-icons/fa";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Chatly", href: "#about" },
];

const socialLinks = [
  {
    icon: <FaFacebookF />,
    label: "Facebook",
    link: "https://www.facebook.com/milon.codes",
  },
  {
    icon: <FaGithub />,
    label: "GitHub",
    link: "https://github.com/milon-codes",
  },
  {
    icon: <FaLinkedinIn />,
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/milon-codes",
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 bg-white text-slate-600 transition-colors duration-500 dark:border-slate-800/70 dark:bg-[#020617] dark:text-slate-400">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.03] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-6 sm:pt-16 lg:px-8 lg:pb-10 lg:pt-20">
        {/* Top CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mb-14 overflow-hidden rounded-[1.75rem] border border-indigo-200/70 bg-gradient-to-r from-indigo-50 via-white to-purple-50 p-6 dark:border-indigo-500/20 dark:from-indigo-500/10 dark:via-slate-900/70 dark:to-purple-500/10 sm:p-8 lg:mb-16 lg:p-10"
        >
          {/* CTA Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
            {/* CTA Text */}
            <div className="text-center md:text-left">
              <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                  Chatly is ready
                </span>
              </div>

              <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Ready to start chatting?
              </h3>

              <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-600 dark:text-slate-400">
                Create your account and start connecting with your friends in
                real time.
              </p>
            </div>

            {/* CTA Button */}
            <Link
              to="/register"
              className="group inline-flex shrink-0 items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-95 sm:px-7 sm:py-4"
            >
              Get Started
              <IoIosArrowForward className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            {/* Logo */}
            <Link to="/" className="group mb-5 inline-flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.08, rotate: -5 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-xl text-white shadow-lg shadow-indigo-500/25 sm:h-12 sm:w-12 sm:text-2xl"
              >
                <IoIosChatbubbles />
              </motion.div>

              <div>
                <span className="block text-2xl font-black tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  Chatly
                </span>

                <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
                  Real-Time Chat
                </span>
              </div>
            </Link>

            {/* Description */}
            <p className="max-w-sm text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
              A modern real-time communication platform designed for simple,
              responsive, and connected conversations.
            </p>

            {/* Status */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <FaCheckCircle />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Platform Status
                </p>

                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Real-Time Messaging
                </p>
              </div>
            </div>
          </motion.div>

          {/* Product + Account Wrapper */}
          <div className="grid grid-cols-2 gap-6 sm:col-span-2 sm:gap-8 lg:col-span-2 lg:contents">
            {/* Product */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                Product
              </h3>

              <ul className="space-y-3.5">
                {productLinks.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(item.href)}
                      className="group inline-flex items-center gap-2 text-left text-sm font-bold text-slate-600 transition-all duration-300 hover:translate-x-1 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                    >
                      <IoIosArrowForward className="shrink-0 text-xs text-indigo-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />

                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Account */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                Account
              </h3>

              <ul className="space-y-3.5">
                <li>
                  <Link
                    to="/login"
                    className="group inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition-all duration-300 hover:translate-x-1 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  >
                    <IoIosArrowForward className="shrink-0 text-xs text-indigo-500 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    <span>Login</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="group inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition-all duration-300 hover:translate-x-1 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  >
                    <IoIosArrowForward className="shrink-0 text-xs text-indigo-500 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    <span>Create Account</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/privacy"
                    className="group inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition-all duration-300 hover:translate-x-1 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  >
                    <IoIosArrowForward className="shrink-0 text-xs text-indigo-500 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    <span>Privacy Policy</span>
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <h3 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Connect
            </h3>

            <p className="mb-5 max-w-sm text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
              Follow the project and explore more work from the developer.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -5, scale: 1.06 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 15,
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-600 shadow-sm transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-500/20 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:bg-indigo-600 dark:hover:text-white sm:h-11 sm:w-11"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Feature Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          // className="mt-10 grid grid-3  gap-5 border-y border-slate-100 py-7 dark:border-slate-800/70 sm:mt-14 sm:grid-cols-3 sm:gap-4 sm:py-8"
          className="flex items-center justify-between mt-8 border-y border-slate-100 py-7 dark:border-slate-800/70 "
        >
          {/* Real-Time */}
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <FaBolt />
            </div>

            <div>
              <p className="text-xs font-black text-slate-800 dark:text-white">
                Real-Time
              </p>

              <p className="text-[10px] font-medium text-slate-400">
                Instant updates
              </p>
            </div>
          </div>

          {/* Protected */}
          <div className="flex items-center justify-center gap-3 sm:justify-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
              <FaShieldAlt />
            </div>

            <div>
              <p className="text-xs font-black text-slate-800 dark:text-white">
                Protected
              </p>

              <p className="text-[10px] font-medium text-slate-400">
                Secure access
              </p>
            </div>
          </div>

          {/* Easy to Use */}
          <div className="flex items-center justify-center gap-3 sm:justify-end">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <IoIosChatbubbles />
            </div>

            <div>
              <p className="text-xs font-black text-slate-800 dark:text-white">
                Easy to Use
              </p>

              <p className="text-[10px] font-medium text-slate-400">
                Simple conversations
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-5 pt-7 text-center sm:pt-8 md:flex-row md:text-left">
          {/* Copyright */}
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
            © {currentYear}{" "}
            <span className="font-black text-slate-700 dark:text-slate-300">
              Chatly
            </span>
            . All rights reserved.
          </p>

          {/* Developer Credit */}
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-900/60">
            <span className="text-[11px] font-medium text-slate-400">
              Built with
            </span>

            <span className="text-sm">❤️</span>

            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xs font-black text-transparent">
              Md Milon Mia
            </span>
          </div>

          {/* Back To Top */}
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:border-indigo-300 group-hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:group-hover:border-indigo-500/40 dark:group-hover:text-indigo-400">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
