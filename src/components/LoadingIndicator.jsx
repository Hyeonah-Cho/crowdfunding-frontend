import "./LoadingIndicator.css";

export const LoadingIndicator = ({
  message = "Loading...",
  fullPage = false,
}) => {
  return (
    <div className={`loading-container ${fullPage ? "full-page" : ""}`}>
      <div className="spinner" />
      <p className="loading-text">{message}</p>
    </div>
  );
};
