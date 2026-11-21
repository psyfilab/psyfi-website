type LogoProps = {
  className?: string;
  /** On dark backgrounds the logo is turned fully white (the coral accents become white too). */
  onDark?: boolean;
};

/** PsyFi logo, loaded from /public/psyfi-logo.svg */
export function Logo({ className = "", onDark = false }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/psyfi-logo.svg"
      alt="PsyFi"
      draggable={false}
      className={`select-none ${onDark ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}