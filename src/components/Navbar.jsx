import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosChatbubbles, IoIosMoon, IoIosSunny } from "react-icons/io";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const navItems = [
    ["#features", "Features"],
    ["#security", "Security"],
    ["#how-it-works", "How It Works"],
    ["#about", "About"],
  ];

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 z-[100] w-full border-b border-slate-200/60 bg-white/75 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-2xl transition-all duration-500 dark:border-slate-800/60 dark:bg-slate-950/75 dark:shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-[76px] items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={handleNavClick}
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-indigo-500/40">
              <div className="absolute inset-0 rounded-2xl bg-indigo-500/30 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <IoIosChatbubbles
                size={23}
                className="relative z-10 transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 sm:text-[22px]">
                Chatly
              </span>

              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400 transition-colors duration-300 group-hover:text-indigo-500 dark:text-slate-500">
                Real-time chat
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map(([href, label]) => (
              <a
                key={label}
                href={href}
                className="group relative rounded-xl px-4 py-2.5 text-[13px] font-semibold text-slate-600 transition-all duration-300 hover:bg-indigo-50/70 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
              >
                {label}

                <span className="absolute -bottom-0.5 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-8" />
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Login */}
            <Link
              to="/login"
              className="group relative flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/60 px-4 py-2.5 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
            >
              Login
            </Link>

            {/* Get Started */}
            <Link
              to="/register"
              className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/40 active:translate-y-0"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative z-10">Get Started</span>

              <FiArrowUpRight
                size={16}
                className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            {/* Theme Toggle */}
            <button
              type="button"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              aria-pressed={darkMode}
              onClick={() => setDarkMode(!darkMode)}
              className="relative h-8 w-[58px] rounded-full border border-slate-200 bg-slate-100 p-1 shadow-inner transition-all duration-300 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-500"
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-all duration-500 ${darkMode ? "translate-x-[26px] bg-indigo-600" : "translate-x-0 bg-white"}`}
              >
                {darkMode ? (
                  <IoIosMoon className="text-white" size={14} />
                ) : (
                  <IoIosSunny className="text-amber-500" size={14} />
                )}
              </div>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Theme Toggle */}
            <button
              type="button"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              aria-pressed={darkMode}
              onClick={() => setDarkMode(!darkMode)}
              className="relative h-8 w-[54px] rounded-full border border-slate-200 bg-slate-100 p-1 shadow-inner transition-all duration-300 dark:border-slate-700 dark:bg-slate-800"
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-all duration-500 ${darkMode ? "translate-x-[22px] bg-indigo-600" : "translate-x-0 bg-white"}`}
              >
                {darkMode ? (
                  <IoIosMoon className="text-white" size={14} />
                ) : (
                  <IoIosSunny className="text-amber-500" size={14} />
                )}
              </div>
            </button>

            {/* Menu Button */}
            <button
              type="button"
              aria-label={
                open ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-700 transition-all duration-300 hover:border-indigo-400 hover:text-indigo-600 active:scale-95 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white dark:hover:border-indigo-500 dark:hover:text-indigo-400"
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out lg:hidden ${open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="border-t border-slate-200/70 bg-white/95 px-5 py-6 backdrop-blur-2xl dark:border-slate-800/70 dark:bg-slate-950/95 sm:px-6">
          {/* Mobile Links */}
          <div className="space-y-2">
            {navItems.map(([href, label], index) => (
              <a
                key={label}
                href={href}
                onClick={handleNavClick}
                className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-semibold text-slate-700 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
              >
                <span className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-indigo-500/70 dark:text-indigo-400/70">
                    0{index + 1}
                  </span>

                  {label}
                </span>

                <FiArrowUpRight
                  size={17}
                  className="translate-x-[-8px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </a>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
            <Link
              to="/login"
              onClick={handleNavClick}
              className="flex items-center justify-center rounded-xl border border-slate-200 py-3.5 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={handleNavClick}
              className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/40"
            >
              Get Started
              <FiArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Mobile Brand Hint */}
          <div className="mt-5 text-center">
            <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
              Connect • Chat • Stay Connected
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
