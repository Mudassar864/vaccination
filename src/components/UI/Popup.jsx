import React from "react";

const Popup = ({ popup, onClose }) => {
  if (!popup.show) return null;

  const getPopupConfig = () => {
    switch (popup.type) {
      case "error":
        return {
          gradient: "from-red-500 to-red-600",
          iconBg: "from-red-200 to-red-300",
          icon: "✕",
          buttonColor: "bg-red-500 hover:bg-red-600"
        };
      case "warning":
        return {
          gradient: "from-orange-400 to-orange-500",
          iconBg: "from-orange-100 to-orange-200",
          icon: "⚠",
          buttonColor: "bg-orange-500 hover:bg-orange-600"
        };
      case "success":
        return {
          gradient: "from-green-500 to-green-600",
          iconBg: "from-green-100 to-green-200",
          icon: "✓",
          buttonColor: "bg-green-500 hover:bg-green-600"
        };
      default:
        return {
          gradient: "from-blue-500 to-purple-600",
          iconBg: "from-blue-100 to-purple-200",
          icon: "ℹ",
          buttonColor: "bg-purple-600 hover:bg-purple-700"
        };
    }
  };

  const config = getPopupConfig();

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.25)] z-[1001] min-w-[380px] max-w-[480px] text-center overflow-hidden animate-[popIn_0.4s_cubic-bezier(0.68,-0.55,0.265,1.55)]">
        <div className={`bg-gradient-to-br ${config.gradient} p-8 pb-6 text-white`}>
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${config.iconBg} flex items-center justify-center text-3xl font-bold text-gray-800 border-4 border-white/30 shadow-[0_8px_16px_rgba(0,0,0,0.1)]`}>
            {config.icon}
          </div>
          <h3 className="m-0 text-xl font-semibold">
            {popup.type === "error" ? "Error" : popup.type === "warning" ? "Warning" : popup.type === "success" ? "Success" : "Information"}
          </h3>
        </div>
        <div className="p-6 pt-4">
          <p className="m-0 mb-6 text-base leading-relaxed text-gray-700 font-medium">{popup.message}</p>
          <button
            onClick={onClose}
            className={`${config.buttonColor} text-white border-none rounded-xl px-8 py-3 text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(0,0,0,0.15)] min-w-[120px] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)]`}
          >
            Got it!
          </button>
        </div>
      </div>
    </>
  );
};

export default Popup;
