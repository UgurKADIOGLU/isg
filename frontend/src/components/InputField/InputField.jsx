import React from "react";

function InputField({ id, label, type = "text", value, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        className="form-control"
        id={id}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
