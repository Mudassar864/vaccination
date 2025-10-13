const FeedbackButton = ({ setIsFeedbackOpen }) => (
  <div className="fixed bottom-[70px] right-5 text-center z-[1000] group">
    <button
      onClick={() => setIsFeedbackOpen(true)}
      className="w-20 h-20 rounded-full bg-white border-none cursor-pointer flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-colors relative z-[1001]"
    >
      <img src="ghp-logo.png" alt="Feedback" className="w-4/5 h-auto p-1" />
    </button>
    <div className="absolute right-[70px] bottom-0 bg-[#f5ac57] p-2 rounded-lg z-10 hidden group-hover:block whitespace-nowrap text-xs">
      <h4 className="text-left">Any Feedback?</h4>
      <p className="text-left text-[#333] text-sm mb-2 font-medium">
        Help us improve by sharing your insights.
      </p>
    </div>
  </div>
);

export default FeedbackButton;
