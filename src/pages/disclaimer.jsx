import React from "react";

function Disclaimer() {
  return (
    <main className="max-w-6xl mx-auto my-12 bg-white shadow-lg rounded-md p-12 md:p-16 ">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Disclaimer</h1>

      <p className="text-gray-800 mb-6 text-base md:text-lg">
        The following outlines important disclaimers regarding the content on{" "}
        <a
          href="https://id-ea.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 font-bold hover:underline"
        >
          id-ea.org
        </a>.
      </p>

      <section className="space-y-6 text-gray-800 text-sm md:text-base">
        <div id="disclaimer-content">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>The content on id-ea.org is provided for informational purposes only.</li>
            <li>It is not a substitute for professional medical advice. Always consult a qualified healthcare provider before making vaccination or medical decisions.</li>
            <li>While we strive for accuracy, no warranty is given as to completeness, reliability, or timeliness.</li>
            <li>The Country Vaccination Score (CVS) is based on publicly available data and may contain errors, limitations, or delays.</li>
            <li>We do not guarantee uninterrupted or error-free access to the site.</li>
            <li>Use of this site is entirely at your own risk.</li>
          </ul>
        </div>
      </section>

      
    </main>
  );
}

export default Disclaimer;
