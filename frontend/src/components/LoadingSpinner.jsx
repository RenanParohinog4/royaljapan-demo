import React from "react";

function Spinner({ visible = false }) {
  if (!visible) return null; // Don't render anything if not visible

  return (
    <div className="loader-content" id="loadingOverlay">
      <svg
        className="spinner"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="spinner-path"
          fill="none"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
    </div>
  );
}

export default Spinner;
