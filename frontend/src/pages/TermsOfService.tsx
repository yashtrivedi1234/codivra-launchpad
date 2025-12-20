import React from "react";

const TermsOfService = () => (
  <div className="container mx-auto px-4 py-16 max-w-3xl">
    <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
    <p className="mb-4">By using our website and services, you agree to the following terms and conditions. Please read them carefully.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">Use of Services</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>You must use our services in compliance with all applicable laws</li>
      <li>You may not misuse our services or attempt to access them using unauthorized means</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">Intellectual Property</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>All content and materials are the property of Codivra or its licensors</li>
      <li>You may not copy, modify, or distribute our content without permission</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">Limitation of Liability</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>We are not liable for any damages resulting from your use of our services</li>
      <li>Our services are provided "as is" without warranties of any kind</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">Changes to Terms</h2>
    <p>We may update these Terms of Service from time to time. Continued use of our services constitutes acceptance of the new terms.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
    <p>If you have any questions about these Terms, please contact us at <a href="mailto:codivrasolution@gmail.com" className="text-accent underline">codivrasolution@gmail.com</a>.</p>
  </div>
);

export default TermsOfService;
