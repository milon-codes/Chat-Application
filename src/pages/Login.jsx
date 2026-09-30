import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  FaEnvelope,
  FaGoogle,
  FaLock,
  FaRocket,
  FaShieldAlt,
  FaUserFriends,
} from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import {
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiX,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const profilePhoto =
  "https://res.cloudinary.com/da65g97jk/image/upload/v1767769170/Chatly_App_Profile_Photo_epjuzc.jpg";
const coverPhoto =
  "https://res.cloudinary.com/da65g97jk/image/upload/v1767769270/Chatly_App_cover_photo_pod6ak.jpg";

const features = [
  {
    icon: <FiCheckCircle />,
    title: "Real-Time Conversations",
    description:
      "Continue your conversations with fast and responsive real-time messaging.",
  },
  {
    icon: <FaUserFriends />,
    title: "Stay Connected",
    description:
      "See online status, typing activity, and stay connected with your friends.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Protected Access",
    description:
      "Your account access is secured through Firebase Authentication.",
  },
];

function Login() {
  const { setUser, loginUser, sendEmail, logoutUser, GoogleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const getSwalTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");

    return {
      background: isDark ? "#0f172a" : "#ffffff",
      color: isDark ? "#f8fafc" : "#111827",
      confirmButtonColor: "#4f46e5",
    };
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value;

    if (!email || !password) return;

    setIsLoading(true);

    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        try {
          await sendEmail(user);
        } catch (verificationError) {
          console.error("Verification email error:", verificationError);
        }

        await logoutUser();

        await Swal.fire({
          title: "Email Not Verified",
          text: "A new verification link has been sent to your email. Please verify your email before signing in.",
          icon: "warning",
          ...getSwalTheme(),
        });

        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      let finalUserData;

      if (!userDoc.exists()) {
        const savedUserName = localStorage.getItem("userName");

        finalUserData = {
          uid: user.uid,
          fullName: user.displayName || "New User",
          userName:
            savedUserName || `user_${Math.floor(Math.random() * 100000)}`,
          email: user.email,
          profilePhoto: user.photoURL || profilePhoto,
          coverPhoto,
          createdAt: serverTimestamp(),
          isVerified: true,
          status: "Online",
        };

        await setDoc(userDocRef, finalUserData);
        localStorage.removeItem("userName");
      } else {
        const existingData = userDoc.data();

        await updateDoc(userDocRef, {
          status: "Online",
          isVerified: true,
        });

        finalUserData = {
          ...existingData,
          status: "Online",
          isVerified: true,
        };
      }

      if (setUser) {
        setUser({
          ...user,
          ...finalUserData,
        });
      }

      await Swal.fire({
        title: "Welcome Back!",
        text: `Great to see you again, ${finalUserData.fullName || "User"}!`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        ...getSwalTheme(),
      });

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);

      let message = "Unable to sign in. Please check your email and password.";

      switch (error.code) {
        case "auth/user-not-found":
          message = "No account was found with this email address.";
          break;
        case "auth/wrong-password":
          message = "The password you entered is incorrect.";
          break;
        case "auth/invalid-credential":
          message = "The email or password you entered is incorrect.";
          break;
        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          break;
        case "auth/too-many-requests":
          message = "Too many attempts. Please wait a moment and try again.";
          break;
        case "auth/user-disabled":
          message = "This account has been disabled.";
          break;
        default:
          message = error.message || message;
      }

      Swal.fire({
        title: "Login Failed",
        text: message,
        icon: "error",
        ...getSwalTheme(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isGoogleLoading || isLoading) return;

    setIsGoogleLoading(true);

    try {
      const result = await GoogleLogin();
      const loggedInUser = result?.user;

      if (!loggedInUser) {
        throw new Error("Google login did not return a user.");
      }

      const userDocRef = doc(db, "users", loggedInUser.uid);
      const userSnap = await getDoc(userDocRef);

      let finalUserData;

      if (!userSnap.exists()) {
        const emailPrefix = loggedInUser.email?.split("@")[0] || "user";
        const randomId = Math.random().toString(36).substring(2, 7);

        finalUserData = {
          uid: loggedInUser.uid,
          fullName: loggedInUser.displayName || "Google User",
          userName: `${emailPrefix}_${randomId}`,
          email: loggedInUser.email,
          profilePhoto: loggedInUser.photoURL || profilePhoto,
          coverPhoto,
          createdAt: serverTimestamp(),
          isVerified: loggedInUser.emailVerified,
          status: "Online",
        };

        await setDoc(userDocRef, finalUserData);
      } else {
        const existingData = userSnap.data();

        finalUserData = {
          ...existingData,
          status: "Online",
          isVerified: loggedInUser.emailVerified,
        };

        await updateDoc(userDocRef, {
          status: "Online",
          isVerified: loggedInUser.emailVerified,
        });
      }

      if (setUser) {
        setUser({
          ...loggedInUser,
          ...finalUserData,
        });
      }

      await Swal.fire({
        title: "Welcome to Chatly!",
        text: `You're signed in as ${finalUserData.fullName || "User"}.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        ...getSwalTheme(),
      });

      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);

      if (error?.code === "auth/popup-closed-by-user") return;

      Swal.fire({
        title: "Google Login Failed",
        text: "We couldn't sign you in with Google. Please try again.",
        icon: "error",
        ...getSwalTheme(),
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-4 transition-colors duration-500 dark:bg-[#020617] sm:px-5 sm:py-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl items-center sm:min-h-[calc(100vh-3rem)]">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] transition-colors duration-500 dark:border-slate-800 dark:bg-slate-950 dark:shadow-[0_25px_80px_rgba(0,0,0,0.3)] lg:grid-cols-[1.02fr_0.98fr] lg:rounded-[2.5rem]">
          {/* LEFT SIDE */}
          <section className="relative hidden min-h-[760px] overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-10 text-slate-900 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#1e1b4b] dark:text-white lg:flex xl:p-14">
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
                    Welcome Back
                  </div>

                  <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-slate-950 dark:text-white xl:text-5xl">
                    Welcome back to your conversations.
                  </h2>

                  <p className="mt-6 max-w-lg text-base font-medium leading-7 text-slate-600 dark:text-slate-300">
                    Sign in to continue your conversations, see live updates,
                    share files, and stay connected with the people who matter.
                  </p>
                </div>

                {/* FEATURES */}
                <div className="mt-10 space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/20 dark:hover:bg-white/10"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg text-indigo-600 transition-transform duration-300 group-hover:scale-110 dark:bg-indigo-500/15 dark:text-indigo-300">
                        {feature.icon}
                      </div>

                      <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="mt-1 text-xs font-medium leading-5 text-slate-500 dark:text-slate-400">
                          {feature.description}
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
                    New to Chatly?
                  </p>

                  <Link
                    to="/register"
                    className="mt-1 inline-flex items-center gap-2 text-sm font-black text-indigo-600 transition-all hover:gap-3 dark:text-indigo-300"
                  >
                    Create your account
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

          {/* RIGHT SIDE */}
          <section className="relative flex items-center p-5 sm:p-8 md:p-10 xl:p-14">
            {/* CLOSE BUTTON */}
            <Link
              to="/"
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
                  Welcome Back
                </span>

                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Sign in to Chatly
                </h2>

                <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
                  Enter your account details to continue your conversations.
                </p>
              </div>

              {/* LOGIN FORM */}
              <form onSubmit={handleLogin} className="space-y-5">
                {/* EMAIL */}
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

                {/* PASSWORD */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-bold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="group relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition-all duration-300 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900/80 dark:focus-within:border-indigo-500 dark:focus-within:bg-slate-900">
                    <FaLock className="shrink-0 text-sm text-slate-400 transition-colors group-focus-within:text-indigo-500" />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="w-full bg-transparent pr-7 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 text-slate-400 transition-colors hover:text-indigo-500 dark:hover:text-indigo-400"
                    >
                      {showPassword ? (
                        <FiEyeOff size={17} />
                      ) : (
                        <FiEye size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-400 disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-none"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </form>

              {/* DIVIDER */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Or continue with
                </span>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* GOOGLE */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading || isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3.5 text-sm font-black text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
              >
                {isGoogleLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <FaGoogle className="text-red-500" />
                    Continue with Google
                  </>
                )}
              </button>

              {/* SECURITY CARD */}
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 dark:border-indigo-500/10 dark:bg-indigo-500/5">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <FaShieldAlt size={13} />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Protected account access
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                    Your sign-in is securely handled through Firebase
                    Authentication.
                  </p>
                </div>
              </div>

              {/* REGISTER */}
              <div className="mt-7 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-black text-indigo-600 transition-colors hover:text-indigo-700 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

              {/* SECURITY */}
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <FaShieldAlt className="text-indigo-500" />
                Your information is protected
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Login;
