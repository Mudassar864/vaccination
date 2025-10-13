import React from "react";

function PrivacyPolicy() {
  return (
    <main className="max-w-6xl mx-auto my-12 bg-white shadow-lg rounded-md p-12 md:p-16">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Privacy Policy</h1>

      <p className="text-gray-800 mb-6 text-base md:text-lg">
        We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit{" "}
        <a
          href="https://id-ea.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 font-bold hover:underline"
        >
          id-ea.org
        </a>.
      </p>

      <section className="space-y-8 text-gray-800 text-sm md:text-base">

        <div id="data-we-collect">
          <h3 className="text-lg font-bold mb-2">1. Data We Collect</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Automatic Data:</strong> IP address, browser type, pages visited, access times, and similar usage data.</li>
            <li><strong>User Feedback:</strong> Name, email, and any information voluntarily submitted via portal chat or contact forms.</li>
            <li><strong>Country Data:</strong> Publicly available vaccination data compiled for analysis and reporting.</li>
          </ul>
        </div>

        <div id="use-of-data">
          <h3 className="text-lg font-bold mb-2">2. Use of Data</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Improve site performance and user experience.</li>
            <li>Verify and correct vaccination data.</li>
            <li>Communicate with users who provide feedback.</li>
            <li>Conduct aggregated, anonymous usage analysis.</li>
          </ul>
        </div>

        <div id="data-sharing">
          <h3 className="text-lg font-bold mb-2">3. Data Sharing</h3>
          <p>We do not sell, rent, or trade personal information. Aggregated, anonymized data may be shared with research partners or for reporting purposes.</p>
        </div>

        <div id="cookies">
          <h3 className="text-lg font-bold mb-2">4. Cookies</h3>
          <p>We may use cookies or similar technologies for functionality and analytics. You may disable cookies through your browser, though some features may not function properly.</p>
        </div>

        <div id="data-retention">
          <h3 className="text-lg font-bold mb-2">5. Data Retention</h3>
          <p>We retain personal data only as long as necessary to fulfil the purposes outlined above, or as required by law.</p>
        </div>

        <div id="data-protection">
          <h3 className="text-lg font-bold mb-2">6. Data Protection</h3>
          <p>We use reasonable technical and organizational safeguards to protect your information. However, no system is completely secure, and we cannot guarantee absolute security.</p>
        </div>

        <div id="user-rights">
          <h3 className="text-lg font-bold mb-2">7. User Rights</h3>
          <p>Subject to applicable laws, you may request access, correction, or deletion of your personal data, or withdraw consent to its processing, by contacting us at{" "}
            <a href="mailto:info@globalhealthpress.org" className="text-orange-600 font-bold hover:underline">
              info@globalhealthpress.org
            </a>.
          </p>
        </div>

        <div id="children-privacy">
          <h3 className="text-lg font-bold mb-2">8. Children’s Privacy</h3>
          <p>Our site is not directed at children under 16. We do not knowingly collect personal data from minors. If we become aware of such data collection, we will delete it.</p>
        </div>

        <div id="policy-updates">
          <h3 className="text-lg font-bold mb-2">9. Policy Updates</h3>
          <p>We may update this Privacy Policy from time to time. The revised policy will be posted here with an updated “Last updated” date.</p>
        </div>

      </section>

      
    </main>
  );
}

export default PrivacyPolicy;
