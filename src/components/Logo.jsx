import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Logo({ className = "" }) {
  const { theme } = useTheme();
  const fillColor = theme === "dark" ? "white" : "#0F172A"; // Use white for dark mode, slate-900 for light

  return (
    <svg
      className={className}
      width="121"
      height="32"
      viewBox="0 0 121 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.3432 0.512207L14.0312 20.4162L6.71924 0.512207H0.223236L10.3752 31.0722H17.6872L27.8392 0.512207H21.3432Z" fill={fillColor} />
      <path d="M38.8795 31.0722V0.512207H32.7355V31.0722H38.8795Z" fill={fillColor} />
      <path d="M54.1285 15.7922C54.1285 24.5442 49.0885 31.4082 40.2085 31.4082C31.3285 31.4082 26.2885 24.5442 26.2885 15.7922C26.2885 7.04021 31.3285 0.176208 40.2085 0.176208C49.0885 0.176208 54.1285 7.04021 54.1285 15.7922ZM48.0965 15.7922C48.0965 10.2082 44.7205 5.92021 40.2085 5.92021C35.6965 5.92021 32.3205 10.2082 32.3205 15.7922C32.3205 21.3762 35.6965 25.6642 40.2085 25.6642C44.7205 25.6642 48.0965 21.3762 48.0965 15.7922Z" fill={fillColor} />
      <path d="M68.5063 0.512207V31.0722H74.6503V18.8802L80.1143 31.0722H84.8983L79.0903 18.2562L84.8983 5.92021H79.9463L74.6503 16.9602V0.512207H68.5063Z" fill={fillColor} />
      <path d="M100.839 0.512207V31.0722H106.983V18.8802L112.447 31.0722H117.231L111.423 18.2562L117.231 5.92021H112.279L106.983 16.9602V0.512207H100.839Z" fill={fillColor} />
      <path d="M65.0949 0.512207H58.9509V31.0722H65.0949V0.512207Z" fill={fillColor} />
      <path d="M97.4277 0.512207H91.2837V31.0722H97.4277V0.512207Z" fill={fillColor} />
    </svg>
  );
}