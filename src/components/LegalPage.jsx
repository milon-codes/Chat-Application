import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCheckCircle,
  FiDatabase,
  FiFileText,
  FiLock,
  FiMail,
  FiMessageCircle,
  FiShield,
  FiUser,
} from "react-icons/fi";

const privacySections = [
  {
    title: "Information We Collect",
    icon: <FiDatabase />,
    content: (
      <>
        <p>
          Chatly collects information that is necessary to provide and maintain
          the core features of the application.
        </p>

        <ul>
          <li>
            <strong>Account Information:</strong> Your name, email address,
            profile information, and authentication-related information.
          </li>
          <li>
            <strong>Profile Information:</strong> Your profile details and
            avatar, when you choose to provide them.
          </li>
          <li>
            <strong>Communication Data:</strong> Messages, images, and files
            that you send through conversations.
          </li>
          <li>
            <strong>Presence Information:</strong> Online, offline, typing, and
            related chat-status information used to support real-time
            communication.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "How We Use Information",
    icon: <FiUser />,
    content: (
      <>
        <p>
          Information collected by Chatly is used to operate and improve the
          application and provide its core communication features.
        </p>

        <ul>
          <li>Create and manage user accounts.</li>
          <li>Authenticate users and provide access to the application.</li>
          <li>Enable real-time conversations between users.</li>
          <li>Display profile and presence information where appropriate.</li>
          <li>Deliver messages and shared media.</li>
          <li>
            Maintain the functionality, security, and reliability of the
            application.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Messages & Shared Files",
    icon: <FiMessageCircle />,
    content: (
      <>
        <p>
          Chatly stores communication data required to provide the messaging
          experience. This may include messages, images, and files shared within
          conversations.
        </p>

        <p>
          Users should avoid sharing passwords, financial information, private
          identification documents, or other sensitive information through
          ordinary chat messages.
        </p>
      </>
    ),
  },
  {
    title: "Authentication & Security",
    icon: <FiLock />,
    content: (
      <>
        <p>
          Chatly uses Firebase Authentication for account authentication and
          Firebase Security Rules to help control access to application data.
        </p>

        <p>
          We take reasonable measures to protect the information used by the
          application. However, no online service can guarantee complete
          security or uninterrupted availability.
        </p>
      </>
    ),
  },
  {
    title: "Data Sharing",
    icon: <FiShield />,
    content: (
      <>
        <p>
          Chatly does not use your personal information for advertising
          purposes. Information may be processed by third-party services
          required to operate the application, such as Firebase services.
        </p>

        <p>
          We do not intentionally sell your personal information to advertisers.
        </p>
      </>
    ),
  },
  {
    title: "Your Choices",
    icon: <FiCheckCircle />,
    content: (
      <>
        <p>
          You may update available profile information through the application
          and may stop using Chatly at any time.
        </p>

        <p>
          If the application provides an account deletion option, you may use it
          to request deletion of your account and associated application data.
          Certain information may need to be retained where technically
          necessary or required by applicable law.
        </p>
      </>
    ),
  },
];

const termsSections = [
  {
    number: "01",
    title: "Using Chatly",
    content: (
      <p>
        Chatly is provided as a real-time communication application. By using
        the service, you agree to use it responsibly and in accordance with
        applicable laws and these Terms.
      </p>
    ),
  },
  {
    number: "02",
    title: "Your Account",
    content: (
      <p>
        You are responsible for keeping your account credentials secure and for
        the activity associated with your account. Do not intentionally share
        your login credentials with other people or attempt to access another
        user's account.
      </p>
    ),
  },
  {
    number: "03",
    title: "Acceptable Use",
    content: (
      <>
        <p>
          You agree not to use Chatly to distribute or facilitate content or
          activity that is illegal, threatening, abusive, fraudulent, or
          intended to harm other users.
        </p>

        <ul>
          <li>Do not impersonate another person or account.</li>
          <li>
            Do not attempt to gain unauthorized access to the application.
          </li>
          <li>
            Do not intentionally interfere with the application's operation.
          </li>
          <li>
            Do not use the service to distribute harmful or unlawful material.
          </li>
          <li>Respect the privacy and rights of other users.</li>
        </ul>
      </>
    ),
  },
  {
    number: "04",
    title: "Messages & User Content",
    content: (
      <p>
        You are responsible for the content you choose to send through Chatly.
        You should only share content that you have the right to share and
        should avoid sending private or sensitive information through chat.
      </p>
    ),
  },
  {
    number: "05",
    title: "Account Restrictions",
    content: (
      <p>
        Access to an account may be restricted, suspended, or terminated when
        there is a reasonable basis to believe that the account is being used in
        violation of these Terms, applicable law, or the security of the
        service.
      </p>
    ),
  },
  {
    number: "06",
    title: "Availability",
    content: (
      <p>
        We aim to keep Chatly available and functioning properly, but the
        service may occasionally be affected by maintenance, technical problems,
        third-party service issues, or other circumstances beyond our control.
        Availability is not guaranteed.
      </p>
    ),
  },
  {
    number: "07",
    title: "Changes to Chatly",
    content: (
      <p>
        Features, functionality, and these Terms may change as the project
        develops. When important changes are made, the updated version will be
        reflected on this page.
      </p>
    ),
  },
  {
    number: "08",
    title: "Contact",
    content: (
      <p>
        If you have questions about these Terms or the Chatly application,
        please contact the project owner using the support contact provided
        below.
      </p>
    ),
  },
];

const SectionTitle = ({ icon, children }) => (
  <div className="mb-5 flex items-center gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
      {icon}
    </div>

    <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
      {children}
    </h3>
  </div>
);

function LegalPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    location.pathname === "/terms" ? "terms" : "privacy",
  );

  const isPrivacy = activeTab === "privacy";

  useEffect(() => {
    const currentTab = location.pathname === "/terms" ? "terms" : "privacy";

    setActiveTab(currentTab);
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    navigate(tab === "privacy" ? "/privacy" : "/terms");
  };

  return (
    <div className="min-h-[100svh] overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 py-8 text-slate-900 transition-colors duration-500 dark:from-[#020617] dark:via-[#0b1120] dark:to-[#020617] dark:text-white sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition-all duration-300 hover:gap-3 dark:text-indigo-400"
          >
            <FiArrowLeft />
            Back to Chatly
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
                <FiShield />
                Chatly Legal
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
                Legal Information
              </h1>

              <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
                Information about privacy, account usage, security, and the
                terms that apply when using Chatly.
              </p>

              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Last updated: September 2026
              </p>
            </div>

            {/* URL-Based Tabs */}
            <div className="flex w-full rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:w-fit">
              <button
                type="button"
                onClick={() => handleTabChange("privacy")}
                aria-current={isPrivacy ? "page" : undefined}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-black transition-all duration-300 sm:flex-none sm:px-5 ${isPrivacy ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"}`}
              >
                <FiShield />
                Privacy
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("terms")}
                aria-current={!isPrivacy ? "page" : undefined}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-black transition-all duration-300 sm:flex-none sm:px-5 ${!isPrivacy ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"}`}
              >
                <FiFileText />
                Terms
              </button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <motion.main
          layout
          className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-xl shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:rounded-[2.5rem]"
        >
          {/* Content Header */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/80 px-6 py-7 dark:border-slate-800 dark:from-indigo-500/10 dark:via-slate-900 dark:to-purple-500/10 sm:px-8 md:px-12 md:py-9">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-xl text-white shadow-lg shadow-indigo-500/20">
                {isPrivacy ? <FiShield /> : <FiFileText />}
              </div>

              <div>
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                  {isPrivacy ? "Privacy & Data" : "Service Agreement"}
                </p>

                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
                  {isPrivacy
                    ? "How Chatly handles account, profile, messaging, and application data."
                    : "The basic rules and responsibilities for using the Chatly application."}
                </p>
              </div>
            </div>
          </div>

          {/* Animated Content */}
          <div className="px-6 py-8 sm:px-8 md:px-12 md:py-10">
            <AnimatePresence mode="wait">
              {isPrivacy ? (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-10"
                >
                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 dark:border-indigo-500/20 dark:bg-indigo-500/10 sm:p-6">
                    <div className="flex items-start gap-3">
                      <FiAlertCircle className="mt-0.5 shrink-0 text-lg text-indigo-600 dark:text-indigo-400" />

                      <p className="text-sm font-medium leading-7 text-indigo-900 dark:text-indigo-200">
                        This Privacy Policy describes how information is handled
                        within the Chatly application. It is intended to explain
                        the data used by the current version of the project.
                      </p>
                    </div>
                  </div>

                  {privacySections.map((section, index) => (
                    <motion.section
                      key={section.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <SectionTitle icon={section.icon}>
                        {section.title}
                      </SectionTitle>

                      <div className="space-y-4 pl-0 text-sm font-medium leading-7 text-slate-600 dark:text-slate-400 sm:pl-[3.25rem]">
                        {section.content}
                      </div>
                    </motion.section>
                  ))}

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50 sm:p-6">
                    <p className="text-sm font-medium leading-7 text-slate-600 dark:text-slate-400">
                      <strong className="font-black text-slate-900 dark:text-white">
                        Important:
                      </strong>{" "}
                      Chatly is a development project and its data practices may
                      change as new features are introduced. This page should be
                      updated whenever the application's actual data collection
                      or processing changes.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="terms"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 dark:border-indigo-500/20 dark:bg-indigo-500/10 sm:p-6">
                    <div className="flex items-start gap-3">
                      <FiAlertCircle className="mt-0.5 shrink-0 text-lg text-indigo-600 dark:text-indigo-400" />

                      <p className="text-sm font-medium leading-7 text-indigo-900 dark:text-indigo-200">
                        By creating an account or using Chatly, you agree to use
                        the application responsibly and follow these basic
                        terms.
                      </p>
                    </div>
                  </div>

                  {termsSections.map((section, index) => (
                    <motion.section
                      key={section.number}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-500 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-500 dark:group-hover:bg-indigo-500 dark:group-hover:text-white">
                          {section.number}
                        </span>

                        <div className="flex-1">
                          <h3 className="mb-3 text-lg font-black tracking-tight text-slate-900 dark:text-white sm:text-xl">
                            {section.title}
                          </h3>

                          <div className="space-y-4 text-sm font-medium leading-7 text-slate-600 dark:text-slate-400">
                            {section.content}
                          </div>
                        </div>
                      </div>
                    </motion.section>
                  ))}

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50 sm:p-6">
                    <p className="text-sm font-medium leading-7 text-slate-600 dark:text-slate-400">
                      <strong className="font-black text-slate-900 dark:text-white">
                        Disclaimer:
                      </strong>{" "}
                      Chatly is provided as a software project and is subject to
                      technical limitations, maintenance, and changes as the
                      project develops. These Terms are intended as general
                      application terms and should be reviewed and adapted to
                      the applicable laws and actual deployment requirements
                      before production use.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.main>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-lg shadow-slate-200/20 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <FiMail />
            </div>

            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Have Questions?
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
              If you have questions about Chatly, its privacy practices, or
              these terms, you can contact the project owner.
            </p>

            <a
              href="mailto:mdmilonmia.developer@gmail.com"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              <FiMail />
              Contact Support
            </a>
          </div>

          <div className="py-6 text-center">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} Chatly. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LegalPage;
