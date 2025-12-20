import React from "react";

const PrivacyPolicy = () => (
  <div className="container mx-auto px-4 py-16 max-w-3xl">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    <p className="mb-4">Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Personal information you provide (name, email, etc.)</li>
      <li>Information collected automatically (cookies, usage data, etc.)</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Information</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>To provide and improve our services</li>
      <li>To communicate with you</li>
      <li>To comply with legal obligations</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">Your Rights</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>You can request access, correction, or deletion of your data</li>
      <li>You can opt out of marketing communications</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:codivrasolution@gmail.com" className="text-accent underline">codivrasolution@gmail.com</a>.</p>
  </div>
);

export default PrivacyPolicy;
