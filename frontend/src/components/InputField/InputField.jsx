import React from "react";

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="form-label fw-semibold text-secondary small"
      >
        {label}
      </label>
      <input
        className="form-control form-control-lg border-2 shadow-sm"
        style={{
          borderRadius: "12px",
          transition: "all 0.3s ease",
          borderColor: "#e0e0e0",
        }}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={(e) => {
          e.target.style.borderColor = "#667eea";
          e.target.style.boxShadow = "0 0 0 0.2rem rgba(102, 126, 234, 0.25)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e0e0e0";
          e.target.style.boxShadow = "";
        }}
      />
    </div>
  );
}

export default InputField;
