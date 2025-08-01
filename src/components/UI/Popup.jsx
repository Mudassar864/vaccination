import React, { useEffect } from "react";

const Popup = ({ popup, onClose }) => {
  if (!popup.show) return null;

  const getPopupConfig = () => {
    switch (popup.type) {
      case "error":
        return {
          gradient: "linear-gradient(135deg, #ff6b6b, #ee5a52)",
          iconBg: "linear-gradient(135deg, #ff9a9e, #fecfef)",
          icon: "✕",
          buttonColor: "#ff4757"
        };
      case "warning":
        return {
          gradient: "linear-gradient(135deg, #ffa726, #ffb74d)",
          iconBg: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
          icon: "⚠",
          buttonColor: "#ff9f43"
        };
      default:
        return {
          gradient: "linear-gradient(135deg, #667eea, #764ba2)",
          iconBg: "linear-gradient(135deg, #a8edea, #fed6e3)",
          icon: "ℹ",
          buttonColor: "#5f27cd"
        };
    }
  };

  const config = getPopupConfig();

  // Add CSS animations if not already added
  useEffect(() => {
    if (!document.head.querySelector('style[data-popup-styles]')) {
      const styleSheet = document.createElement("style");
      styleSheet.setAttribute('data-popup-styles', 'true');
      styleSheet.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .popup-button:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2) !important;
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(4px)",
      zIndex: 1000,
      animation: "fadeIn 0.3s ease-out"
    },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(1)",
      background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
      borderRadius: "20px",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
      zIndex: 1001,
      minWidth: "380px",
      maxWidth: "480px",
      textAlign: "center",
      overflow: "hidden",
      animation: "popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
    },
    header: {
      background: config.gradient,
      padding: "32px 32px 24px 32px",
      color: "white"
    },
    iconContainer: {
      width: "80px",
      height: "80px",
      margin: "0 auto 16px auto",
      borderRadius: "50%",
      background: config.iconBg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "32px",
      fontWeight: "bold",
      color: "#333",
      border: "4px solid rgba(255, 255, 255, 0.3)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)"
    },
    body: {
      padding: "24px 32px 32px 32px"
    },
    message: {
      margin: "0 0 24px 0",
      fontSize: "16px",
      lineHeight: "1.6",
      color: "#2c3e50",
      fontWeight: "500"
    },
    button: {
      background: `linear-gradient(135deg, ${config.buttonColor}, ${config.buttonColor}dd)`,
      color: "white",
      border: "none",
      borderRadius: "12px",
      padding: "14px 32px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      minWidth: "120px"
    }
  };

  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      <div style={styles.modal}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>{config.icon}</div>
          <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>
            {popup.type === "error" ? "Error" : popup.type === "warning" ? "Warning" : "Information"}
          </h3>
        </div>
        <div style={styles.body}>
          <p style={styles.message}>{popup.message}</p>
          <button className="popup-button" onClick={onClose} style={styles.button}>
            Got it!
          </button>
        </div>
      </div>
    </>
  );
};

export default Popup;