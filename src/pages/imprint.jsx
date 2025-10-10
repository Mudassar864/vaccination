import React from "react";

function Imprint() {
  return (
    <main className="max-w-6xl mx-auto my-12 bg-white shadow-lg rounded-md p-12 md:p-16">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Imprint</h1>

      <p className="text-gray-800 mb-6 text-base md:text-lg">
        The following provides information about the publisher and operator of{" "}
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
        <div id="imprint-content">
          <h2 className="text-2xl font-bold mb-4">Publisher & Operator</h2>
          <p className="mb-4">
            Global Health Press Pte Ltd – ID-EA.ORG publisher and online training provider
          </p>
          <p className="mb-4">
            <strong>Website:</strong> VacciNATION (id-ea.org)
          </p>

          <h2 className="text-2xl font-bold mb-4">Company Address</h2>
          <p className="mb-4">
            Global Health Press Pte Ltd<br />
            50 Kaki Bukit Pl, #04-01 Jean Yip Group<br />
            Singapore 415926
          </p>

          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Email:</strong> info@globalhealthpress.org</li>
            <li><strong>Tel:</strong> +65 6836 1807</li>
            <li><strong>Fax:</strong> +65 6235 1706</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Imprint;