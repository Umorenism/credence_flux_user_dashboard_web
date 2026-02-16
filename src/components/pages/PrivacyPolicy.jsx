// src/pages/PrivacyPolicy.jsx
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ui/ThemeContext";

export default function PrivacyPolicy() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen pt-16 pb-20 px-5 sm:px-8 transition-colors ${isDark ? "bg-slate-950 text-gray-200" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: February 16, 2026
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="prose prose-lg dark:prose-invert max-w-none space-y-10"
        >
          <section>
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>Flux Trading Platform</strong> ("we", "our", "us").  
              We are committed to protecting your personal information and your right to privacy.  
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application, or engage with our services (collectively, the "Services").
            </p>
            <p className="mt-4">
              By accessing or using the Services, you agree to the terms of this Privacy Policy.  
              If you do not agree, please do not use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              2. Information We Collect
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-3">Personal Information You Provide</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Full name, email address, phone number</li>
                  <li>Wallet addresses (for deposits/withdrawals)</li>
                  <li>KYC documents (ID, proof of address) if you verify your account</li>
                  <li>Bank/card details (only if you choose fiat on-ramp/off-ramp partners)</li>
                  <li>Referral codes and invited users' information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address, browser type, device information</li>
                  <li>Operating system, language, time zone</li>
                  <li>Pages visited, time spent, clickstream data</li>
                  <li>Transaction metadata (not private keys)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3">Information from Third Parties</h3>
                <p>
                  We may receive information about you from KYC providers, blockchain analytics services (for AML compliance), and payment processors.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>To create and manage your account</li>
              <li>To process deposits, trades, and withdrawals</li>
              <li>To verify identity and prevent fraud (KYC/AML)</li>
              <li>To send service updates, security alerts, and marketing (you can opt out)</li>
              <li>To improve our platform and develop new features</li>
              <li>To comply with legal obligations and respond to lawful requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              4. Sharing Your Information
            </h2>
            <p>We do <strong>not</strong> sell your personal data.</p>
            <p className="mt-4">We may share information with:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Service providers (cloud hosting, analytics, email, KYC/AML vendors)</li>
              <li>Payment processors and banking partners (only necessary data)</li>
              <li>Law enforcement, regulators, or courts when required by law</li>
              <li>Successors in case of merger, acquisition, or asset sale</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              5. Data Security
            </h2>
            <p>
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Encryption in transit (TLS 1.3) and at rest</li>
              <li>Two-factor authentication (2FA)</li>
              <li>Regular security audits and penetration testing</li>
              <li>Cold storage for the majority of user funds</li>
              <li>Multi-signature wallets where applicable</li>
            </ul>
            <p className="mt-4">
              However, no method of transmission over the internet or electronic storage is 100% secure.  
              We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              6. Your Rights & Choices
            </h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Access, correct, or delete your personal data</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent (where processing is consent-based)</li>
              <li>Request restriction of processing or data portability</li>
              <li>Lodge a complaint with your data protection authority</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at <strong>support@fluxtrading.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              7. International Data Transfers
            </h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence,  
              including countries that may not have the same data protection laws.  
              We ensure appropriate safeguards (e.g., Standard Contractual Clauses) are in place.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              8. Children's Privacy
            </h2>
            <p>
              Our Services are not directed to individuals under the age of 18.  
              We do not knowingly collect personal information from children under 18.  
              If we learn we have collected such data, we will delete it immediately.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time.  
              The updated version will be posted on this page with a revised "Last updated" date.  
              We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong>Email:</strong> support@fluxtrading.com</p>
              <p><strong>Address:</strong> Port Harcourt, Rivers State, Nigeria</p>
            </div>
          </section>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400"
        >
          © {new Date().getFullYear()} Flux Trading Platform. All rights reserved.
        </motion.p>
      </div>
    </div>
  );
}