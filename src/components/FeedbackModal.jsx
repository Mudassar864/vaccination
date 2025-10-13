import React, { useState } from "react";

const FeedbackModal = ({
  isOpen,
  setIsFeedbackOpen,
  feedbackForm,
  setFeedbackForm,
  showPopup,
  COUNTRIES,
}) => {
  const [search, setSearch] = useState(""); // for country search
  const [showList, setShowList] = useState(false);

  if (!isOpen) return null;

  const handleFeedbackChange = (e) => {
    const { name, value, files } = e.target;
    setFeedbackForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCountrySelect = (country) => {
    setFeedbackForm((prev) => ({ ...prev, country }));
    setSearch(""); // clear search
    setShowList(false);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...feedbackForm,
      attachment: feedbackForm.attachment
        ? feedbackForm.attachment.name
        : null,
    };
    console.log("Feedback submitted:", formData);

    setFeedbackForm({
      name: "",
      email: "",
      country: "",
      message: "",
      attachment: null,
    });

    setIsFeedbackOpen(false);
    showPopup("Thank you for your feedback!", "success");
  };

  // filter countries
  const filteredCountries = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1001] p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsFeedbackOpen(false);
      }}
    >
      <div className="relative w-full max-w-[600px] bg-white rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col items-center p-5 rounded-3xl border border-gray-200 shadow-md bg-gradient-to-br from-white to-[#fdf6f1] relative">
          {/* Close button */}
          <span
            className="absolute top-4 right-5 text-2xl cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
            onClick={() => setIsFeedbackOpen(false)}
          >
            &times;
          </span>

          {/* Info text */}
          <p className="text-[clamp(13px,2.5vw,15px)] text-gray-700 text-left mb-6 leading-relaxed">
            <span className="font-semibold text-[var(--color-primary)]">
              We value your feedback!
            </span>{" "}
            This project is still in progress. If you have additional information
            or spot something we missed, please share it with us.
          </p>

          {/* Feedback form */}
          <form className="w-full flex flex-col gap-3" onSubmit={handleFeedbackSubmit}>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
              type="text"
              name="name"
              required
              placeholder="Name"
              value={feedbackForm.name}
              onChange={handleFeedbackChange}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
              type="email"
              name="email"
              required
              placeholder="Email"
              value={feedbackForm.email}
              onChange={handleFeedbackChange}
            />

            {/* Searchable Country Input */}
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                placeholder="Select a country"
                value={search || feedbackForm.country}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowList(true);
                }}
                onFocus={() => setShowList(true)}
                onBlur={() => setTimeout(() => setShowList(false), 200)}
                readOnly={false}
              />
              {showList && (
                <ul className="absolute top-full left-0 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg mt-1 shadow-md z-10">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <li
                        key={country}
                        className="px-3 py-2 cursor-pointer hover:bg-[var(--color-primary)] hover:text-white transition"
                        onClick={() => handleCountrySelect(country)}
                      >
                        {country}
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-gray-500">No matches</li>
                  )}
                </ul>
              )}
            </div>

            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg text-sm min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
              name="message"
              required
              placeholder="Message"
              value={feedbackForm.message}
              onChange={handleFeedbackChange}
            />

            {/* File upload + submit */}
            <div className="flex justify-center gap-3 items-center flex-wrap">
              <input
                type="file"
                id="attachment"
                name="attachment"
                className="hidden"
                onChange={handleFeedbackChange}
              />
              <button
                type="button"
                className="bg-gray-100 text-gray-700 py-2 px-5 rounded-lg text-sm border border-gray-300 hover:bg-gray-200 transition"
                onClick={() => document.getElementById("attachment").click()}
              >
                📎 Attachment
              </button>
              <button
                type="submit"
                className="bg-[var(--color-primary)] py-2 px-5 text-white cursor-pointer rounded-lg text-sm font-medium transition hover:bg-[var(--color-primary-hover)]"
              >
                🚀 Let&apos;s go!
              </button>
            </div>
          </form>

          {/* Decorative circles */}
          <div className="absolute top-5 right-5 bg-[var(--color-primary)] rounded-full -z-10 opacity-20 w-[100px] h-[100px] blur-xl"></div>
          <div className="absolute bottom-5 left-5 bg-[var(--color-primary)] rounded-full -z-10 opacity-20 w-20 h-20 blur-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
