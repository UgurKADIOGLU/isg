import React from "react";

function InputField({ id, label, type = "text", value, onChange }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;