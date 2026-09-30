import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { auth, db } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaEnvelope, FaRocket, FaShieldAlt } from "react-icons/fa";
import { IoIosChatbubbles, IoIosKey } from "react-icons/io";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import Swal from "sweetalert2";

const benefits = [
  {
    icon: <FiCheckCircle />,
    title: "Quick Password Recovery",
    description:
      "Reset your password through a secure link sent directly to your registered email.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Protected Account Access",
    description:
      "Password recovery is handled through Firebase Authentication for your Chatly account.",
  },
  {
    icon: <FaEnvelope />,
    title: "Simple Email Verification",
    description:
      "Use your registered email address to receive the password reset instructions.",
  },
];

function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const getSwalTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");

    return {
      background: isDark ? "#0f172a" : "#ffffff",
      color: isDark ? "#f8fafc" : "#111827",
      confirmButtonColor: "#4f46e5",
    };
  };

  const handleReset = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.email.value.trim().toLowerCase();

    if (!email) {
      await Swal.fire({
        title: "Email Required",
        text: "Please enter your email address.",
        icon: "warning",
        ...getSwalTheme(),
      });
      return;
    }

    setLoading(true);

    try {
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("email", "==", email));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        await Swal.fire({
          title: "Account Not Found",
          text: "No Chatly account was found with this email address.",
          icon: "error",
          ...getSwalTheme(),
        });
        return;
      }

      await sendPasswordResetEmail(auth, email);

      await Swal.fire({
        title: "Check Your Email!",
        text: "A password reset link has been sent to your email address.",
        icon: "success",
        ...getSwalTheme(),
      });

      form.reset();
    } catch (error) {
      console.error("Password Reset Error:", error);

      let message = "Could not send the reset email. Please try again.";

      switch (error.code) {
        case "auth/user-not-found":
          message = "This email is not registered with Chatly.";
          break;
        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          break;
        case "auth/too-many-requests":
          message =
            "Too many requests. Please wait a moment and try again later.";
          break;
        case "auth/network-request-failed":
          message = "Network error. Please check your internet connection.";
          break;
        default:
          message = "Something went wrong. Please try again.";
      }

      await Swal.fire({
        title: "Reset Failed",
        text: message,
        icon: "error",
        ...getSwalTheme(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-4 transition-colors duration-500 dark:bg-[#020617] sm:px-5 sm:py-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl items-center sm:min-h-[calc(100vh-3rem)]">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] transition-colors duration-500 dark:border-slate-800 dark:bg-slate-950 dark:shadow-[0_25px_80px_rgba(0,0,0,0.3)] lg:grid-cols-[1.02fr_0.98fr] lg:rounded-[2.5rem]">
          {/* LEFT SIDE */}
          <section className="relative hidden min-h-[700px] overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-10 text-slate-900 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#1e1b4b] dark:text-white lg:flex xl:p-14">
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10" />
            <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-purple-400/15 blur-3xl dark:bg-purple-500/10" />
            <div className="pointer-events-none absolute right-1/4 top-1/2 h-72 w-72 rounded-full bg-indigo-300/10 blur-[120px] dark:bg-indigo-500/10" />

            <div className="relative z-10 flex w-full flex-col justify-between">
              <div>
                {/* BRAND */}
                <Link
                  to="/"
                  className="mb-14 inline-flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-2xl text-white shadow-lg shadow-indigo-500/20 dark:bg-indigo-500">
                    <IoIosChatbubbles />
                  </div>

                  <div>
                    <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                      Chatly
                    </h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
                      Connect. Chat. Share.
                    </p>
                  </div>
                </Link>

                {/* INTRO */}
                <div className="max-w-xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-100/70 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-700 backdrop-blur-md dark:border-indigo-400/20 dark:bg-white/10 dark:text-indigo-200">
                    <FaRocket />
                    Account Recovery
                  </div>

                  <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-slate-950 dark:text-white xl:text-5xl">
                    Get back to your conversations.
                  </h2>

                  <p className="mt-6 max-w-lg text-base font-medium leading-7 text-slate-600 dark:text-slate-300">
                    Forgot your password? No problem. Use your registered email
                    address and follow the reset link to get back into your
                    Chatly account.
                  </p>
                </div>

                {/* BENEFITS */}
                <div className="mt-10 space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/20 dark:hover:bg-white/10"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg text-indigo-600 transition-transform duration-300 group-hover:scale-110 dark:bg-indigo-500/15 dark:text-indigo-300">
                        {benefit.icon}
                      </div>

                      <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white">
                          {benefit.title}
                        </h3>
                        <p className="mt-1 text-xs font-medium leading-5 text-slate-500 dark:text-slate-400">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* BOTTOM */}
              <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-white/10">
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Remember your password?
                  </p>

                  <Link
                    to="/login"
                    className="mt-1 inline-flex items-center gap-2 text-sm font-black text-indigo-600 transition-all hover:gap-3 dark:text-indigo-300"
                  >
                    Back to Login
                    <FiArrowRight />
                  </Link>
                </div>

                <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-400 xl:flex">
                  <FaShieldAlt className="text-indigo-500" />
                  Secure Recovery
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT SIDE */}
          <section className="relative flex items-center p-5 sm:p-8 md:p-10 xl:p-14">
            {/* CLOSE BUTTON */}
            <Link
              to="/login"
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-all duration-300 hover:rotate-90 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white sm:right-6 sm:top-6"
            >
              <FiX size={20} />
            </Link>

            <div className="mx-auto w-full max-w-md">
              {/* MOBILE LOGO */}
              <div className="mb-8 lg:hidden">
                <Link to="/" className="inline-flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-xl text-white shadow-lg shadow-indigo-500/20">
                    <IoIosChatbubbles />
                  </div>

                  <div>
                    <h1 className="font-black text-slate-900 dark:text-white">
                      Chatly
                    </h1>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      Connect. Chat. Share.
                    </p>
                  </div>
                </Link>
              </div>

              {/* HEADING */}
              <div className="mb-7 sm:mb-8">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <FiCheck />
                  Account Recovery
                </span>

                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Forgot your password?
                </h2>

                <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
                  Enter your registered email and we'll send you a password
                  reset link.
                </p>
              </div>

              {/* KEY ICON */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto mb-7 flex items-center justify-center h-20 w-20  rounded-[1.5rem] bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 shadow-sm dark:from-indigo-500/10 dark:to-purple-500/10 dark:text-indigo-400"
              >
                <IoIosKey size={38} />
              </motion.div>

              {/* FORM */}
              <form onSubmit={handleReset} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400"
                  >
                    Email Address
                  </label>

                  <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition-all duration-300 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900/80 dark:focus-within:border-indigo-500 dark:focus-within:bg-slate-900">
                    <FaEnvelope className="shrink-0 text-sm text-slate-400 transition-colors group-focus-within:text-indigo-500" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                    />
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-400 disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-none"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending Link...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </form>

              {/* LOGIN */}
              <div className="mt-7 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="font-black text-indigo-600 transition-colors hover:text-indigo-700 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Login Now
                  </Link>
                </p>
              </div>

              {/* SECURITY CARD */}
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 dark:border-indigo-500/10 dark:bg-indigo-500/5">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <FaShieldAlt size={13} />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Protected password recovery
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                    Password reset emails are handled through Firebase
                    Authentication.
                  </p>
                </div>
              </div>

              {/* BOTTOM STATUS */}
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <FaShieldAlt className="text-indigo-500" />
                Secure account recovery
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
