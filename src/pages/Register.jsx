import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { updateProfile } from "firebase/auth";
import {
  FaGoogle,
  FaLock,
  FaRocket,
  FaShieldAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import {
  FiArrowRight,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiX,
  FiZap,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const benefits = [
  {
    icon: <FiZap />,
    title: "Real-Time Messaging",
    description:
      "Connect with friends and enjoy fast, real-time conversations without unnecessary complexity.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure & Private",
    description:
      "Your account and conversations are protected with Firebase authentication and security.",
  },
  {
    icon: <FaUsers />,
    title: "Connect With People",
    description:
      "Find friends, build meaningful connections, and stay connected with people who matter.",
  },
];

const Register = () => {
  const { createUser, sendEmail, GoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const userName = form.userName.value.trim().toLowerCase();
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (userName.length < 3) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Username",
        text: "Username must contain at least 3 characters.",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords Don't Match",
        text: "Please make sure both passwords are the same.",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Your password should contain at least 6 characters.",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: fullName,
      });

      localStorage.setItem("userName", userName);

      await sendEmail(user);

      await Swal.fire({
        icon: "success",
        title: "Account Created!",
        html: `
          <p style="margin-bottom:8px;">We've sent a verification link to</p>
          <strong>${email}</strong>
          <p style="margin-top:8px;">Please verify your email before logging in.</p>
        `,
        confirmButtonColor: "#4f46e5",
        confirmButtonText: "Continue to Login",
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);

      let errorMessage = "Registration failed. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email address is already registered.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Please choose a stronger password.";
      }

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
        confirmButtonColor: "#4f46e5",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    try {
      const result = await GoogleLogin();

      if (result?.user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Google Registration Error:", error);

      Swal.fire({
        icon: "error",
        title: "Google Sign Up Failed",
        text: "Unable to continue with Google. Please try again.",
        confirmButtonColor: "#4f46e5",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-4 transition-colors duration-500 dark:bg-[#020617] sm:px-5 sm:py-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl items-center sm:min-h-[calc(100vh-3rem)]">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] transition-colors duration-500 dark:border-slate-800 dark:bg-slate-950 dark:shadow-[0_25px_80px_rgba(0,0,0,0.3)] lg:grid-cols-[1.02fr_0.98fr] lg:rounded-[2.5rem]">
          {/* ================= LEFT SIDE ================= */}
          <section className="relative hidden min-h-[760px] overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-10 text-slate-900 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#1e1b4b] dark:text-white lg:flex xl:p-14">
            {/* Background Decorations */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10" />

            <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-purple-400/15 blur-3xl dark:bg-purple-500/10" />

            <div className="pointer-events-none absolute right-1/4 top-1/2 h-72 w-72 rounded-full bg-indigo-300/10 blur-[120px] dark:bg-indigo-500/10" />

            <div className="relative z-10 flex w-full flex-col justify-between">
              {/* Brand */}
              <div>
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

                {/* Intro */}
                <div className="max-w-xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-100/70 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-700 backdrop-blur-md dark:border-indigo-400/20 dark:bg-white/10 dark:text-indigo-200">
                    <FaRocket />
                    Your conversations start here
                  </div>

                  <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-slate-950 dark:text-white xl:text-5xl">
                    Stay connected with the people who matter.
                  </h2>

                  <p className="mt-6 max-w-lg text-base font-medium leading-7 text-slate-600 dark:text-slate-300">
                    Create your Chatly account and experience a simple, fast,
                    and modern way to communicate with friends.
                  </p>
                </div>

                {/* Benefits */}
                <div className="mt-10 space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.2 + index * 0.1,
                        duration: 0.5,
                      }}
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

              {/* Bottom */}
              <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-white/10">
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Already have an account?
                  </p>

                  <Link
                    to="/login"
                    className="mt-1 inline-flex items-center gap-2 text-sm font-black text-indigo-600 transition-all hover:gap-3 dark:text-indigo-300"
                  >
                    Sign in to Chatly
                    <FiArrowRight />
                  </Link>
                </div>

                <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-400 xl:flex">
                  <FaShieldAlt className="text-indigo-500" />
                  Secure Platform
                </div>
              </div>
            </div>
          </section>

          {/* ================= RIGHT SIDE ================= */}
          <section className="relative flex items-center p-5 sm:p-8 md:p-10 xl:p-14">
            {/* Close Button */}
            <Link
              to="/"
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-all duration-300 hover:bg-slate-100 hover:text-slate-700 hover:rotate-90 dark:hover:bg-slate-800 dark:hover:text-white sm:right-6 sm:top-6"
            >
              <FiX size={20} />
            </Link>

            <div className="mx-auto w-full max-w-md">
              {/* Mobile Logo */}
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

              {/* Heading */}
              <div className="mb-7 sm:mb-8">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <FiCheck />
                  Join Chatly
                </span>

                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Create your account
                </h2>

                <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
                  Get started in a few seconds and begin connecting with your
                  friends.
                </p>
              </div>

              {/* ================= FORM ================= */}
              <form onSubmit={handleRegister} className="space-y-5">
                {/* Username + Full Name */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Username */}
                  <div>
                    <label className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Username
                    </label>

                    <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition-all duration-300 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900/80 dark:focus-within:border-indigo-500 dark:focus-within:bg-slate-900">
                      <FaUser className="shrink-0 text-sm text-slate-400 transition-colors group-focus-within:text-indigo-500" />

                      <input
                        name="userName"
                        type="text"
                        placeholder="username"
                        autoComplete="username"
                        required
                        className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Full Name
                    </label>

                    <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition-all duration-300 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900/80 dark:focus-within:border-indigo-500 dark:focus-within:bg-slate-900">
                      <FaUser className="shrink-0 text-sm text-slate-400 transition-colors group-focus-within:text-indigo-500" />

                      <input
                        name="fullName"
                        type="text"
                        placeholder="Your name"
                        autoComplete="name"
                        required
                        className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Email Address
                  </label>

                  <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition-all duration-300 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900/80 dark:focus-within:border-indigo-500 dark:focus-within:bg-slate-900">
                    <FaUser className="shrink-0 text-sm text-slate-400 transition-colors group-focus-within:text-indigo-500" />

                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                    />
                  </div>
                </div>

                {/* Passwords */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Password */}
                  <div>
                    <label className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Password
                    </label>

                    <div className="group relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition-all duration-300 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900/80 dark:focus-within:border-indigo-500 dark:focus-within:bg-slate-900">
                      <FaLock className="shrink-0 text-sm text-slate-400 transition-colors group-focus-within:text-indigo-500" />

                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        required
                        className="w-full bg-transparent pr-7 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                      />

                      <button
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 text-slate-400 transition-colors hover:text-indigo-500"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Confirm Password
                    </label>

                    <div className="group relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition-all duration-300 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900/80 dark:focus-within:border-indigo-500 dark:focus-within:bg-slate-900">
                      <FaLock className="shrink-0 text-sm text-slate-400 transition-colors group-focus-within:text-indigo-500" />

                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        required
                        className="w-full bg-transparent pr-7 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                      />

                      <button
                        type="button"
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 text-slate-400 transition-colors hover:text-indigo-500"
                      >
                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3 text-xs font-medium leading-5 text-slate-500 dark:text-slate-400">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-indigo-600"
                  />

                  <span>
                    I agree to Chatly&apos;s{" "}
                    <Link
                      to="/terms"
                      className="font-black text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-black text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-400 disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-none"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Or continue with
                </span>

                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3.5 text-sm font-black text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
              >
                {isGoogleLoading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                ) : (
                  <FaGoogle className="text-red-500" />
                )}

                {isGoogleLoading ? "Connecting..." : "Continue with Google"}
              </button>

              {/* Login */}
              <p className="mt-7 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-black text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Login Now
                </Link>
              </p>

              {/* Security */}
              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <FaShieldAlt className="text-indigo-500" />
                Your information is protected
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Register;
