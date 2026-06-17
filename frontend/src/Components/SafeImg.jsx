import React from "react";

const SafeImg = ({ src, fallback = "/nav-logo.png", alt, className, ...props }) => {
  return (
    <img
      src={src || fallback}
      alt={alt || ""}
      className={className}
      loading="lazy"
      onError={(e) => { e.target.src = fallback }}
      {...props}
    />
  );
};

export default SafeImg;