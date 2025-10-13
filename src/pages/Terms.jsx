import React from "react";

function Terms() {
  return (
    <main className="max-w-6xl mx-auto my-12 bg-white shadow-lg rounded-md p-12 md:p-16">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Terms and Conditions</h1>

      <p className="text-gray-800 mb-6 text-base md:text-lg">
        Welcome to <strong>VacciNATION (id-ea.org)</strong>, operated by Global Health Press Pte Ltd (“we”, “us”, “our”). By accessing or using this site, you agree to be bound by the following Terms & Conditions. If you do not agree, please discontinue use immediately.
      </p>

      {/* Section container */}
      <section className="space-y-8 text-gray-800 text-sm md:text-base">

        <div id="service-description">
          <h3 className="text-lg font-bold mb-2">1. Service Description</h3>
          <p>id-ea.org is a free-access website providing comparative vaccination data across multiple countries. Our mission is to deliver reliable vaccination insights for educational and informational purposes.</p>
        </div>

        <div id="use-of-site">
          <h3 className="text-lg font-bold mb-2">2. Use of the Site</h3>
          <p className="mb-2">You may view, share, and use our content subject to the following conditions:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>You may view, share, and use our content for personal, educational, or non-commercial purposes, provided clear attribution to <strong>VacciNATION (id-ea.org)</strong> is given.</li>
            <li>Commercial use, including redistribution, resale, or integration into paid services, requires our prior written consent.</li>
            <li>You must not misuse the site, attempt unauthorized access, scrape data, or use the site in violation of applicable laws or regulations.</li>
          </ul>
        </div>

        <div id="user-feedback">
          <h3 className="text-lg font-bold mb-2">3. User Feedback</h3>
          <p>If you identify errors in vaccination data, you may notify us via portal chat or our contact form. We will review such feedback at our discretion but are under no obligation to implement changes or provide confirmation.</p>
        </div>

        <div id="accuracy">
          <h3 className="text-lg font-bold mb-2">4. Accuracy of Data</h3>
          <p>All content is provided “as is” and “as available”. While we strive for accuracy, we make no representation or warranty that the content is error-free, complete, or current. We disclaim all implied warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.</p>
        </div>

        <div id="intellectual-property">
          <h3 className="text-lg font-bold mb-2">5. Intellectual Property</h3>
          <p>All logos, text, graphics, datasets, and tables on this site are the property of, or licensed to, Global Health Press Pte Ltd. You may not copy, reproduce, distribute, or modify materials beyond permitted personal or educational use without our written permission.</p>
        </div>

        <div id="limitation-of-liability">
          <h3 className="text-lg font-bold mb-2">6. Limitation of Liability</h3>
          <p>To the fullest extent permitted by law, we are not liable for any direct, indirect, incidental, consequential, or punitive damages (including loss of profits, data, or goodwill) arising out of your use of, or reliance on, the site’s content. Your sole remedy is to stop using the site.</p>
        </div>

        <div id="indemnification">
          <h3 className="text-lg font-bold mb-2">7. Indemnification</h3>
          <p>You agree to indemnify and hold harmless Global Health Press Pte Ltd, its officers, employees, and affiliates, against any claims, liabilities, damages, or expenses arising from your misuse of the site or breach of these Terms.</p>
        </div>

        <div id="third-party-links">
          <h3 className="text-lg font-bold mb-2">8. Third-Party Links</h3>
          <p>Our site may contain links to external websites. We are not responsible for the content, accuracy, or practices of third-party sites. Accessing such sites is at your own risk.</p>
        </div>

        <div id="changes-to-terms">
          <h3 className="text-lg font-bold mb-2">9. Changes to Terms</h3>
          <p>We may amend these Terms from time to time. Updates will be posted with a revised “Last updated” date. Continued use of the site after changes constitutes acceptance.</p>
        </div>

        <div id="governing-law">
          <h3 className="text-lg font-bold mb-2">10. Governing Law</h3>
          <p>These Terms are governed by the laws of Singapore, and any disputes shall be resolved exclusively in the courts of Singapore.</p>
        </div>
      </section>
    </main>
  );
}

export default Terms;
