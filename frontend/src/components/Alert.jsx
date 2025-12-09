import React from "react";

function Alert({ message, type = "success" }) {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
}

export default Alert;
