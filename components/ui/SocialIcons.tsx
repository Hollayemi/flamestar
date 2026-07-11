import type { SVGProps } from "react";
import { FaTwitter, FaInstagram } from "react-icons/fa"

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconX(props: IconProps) {
  return (
    <FaTwitter />
  );
}

export function IconInstagram(props: IconProps) {
  return (
   <FaInstagram />
  );
}

export function IconLinkedIn(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4.2c0-1.6 1-2.6 2.4-2.6 1.3 0 2.1 1 2.1 2.6V17" />
      <line x1="11.5" y1="10" x2="11.5" y2="17" />
    </svg>
  );
}

export function IconYouTube(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M11 9.7l4 2.3-4 2.3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const socialIconMap: Record<string, (props: IconProps) => React.ReactElement> = {
  X: IconX,
  Instagram: IconInstagram,
  LinkedIn: IconLinkedIn,
  YouTube: IconYouTube,
};
