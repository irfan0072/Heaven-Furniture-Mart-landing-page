type BrandLogoProps = {
  className?: string;
  size?: 'small' | 'medium' | 'large';
};

export function BrandLogo({
  className = '',
  size = 'medium',
}: BrandLogoProps) {
  return (
    <span
      className={`brand-logo brand-logo--${size} ${className}`}
      aria-label="Heaven Furniture Mart"
    >
      <span className="brand-logo__word" aria-hidden="true">
        <span>HE</span>
        <svg
          className="brand-logo__letter-a"
          viewBox="0 0 64 72"
          role="presentation"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M4 68 25 4h14l21 64H45.5l-4.4-14H22.9l-4.4 14H4Zm23-27h10L32 24.7 27 41Z"
          />
          <path fill="currentColor" d="M12 44h40v9H12z" />
        </svg>
        <span>VEN</span>
      </span>
      <span className="brand-logo__descriptor" aria-hidden="true">
        Furniture Mart
      </span>
    </span>
  );
}
