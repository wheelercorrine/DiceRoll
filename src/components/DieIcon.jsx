export function DieIcon({ type, size = 32, className = "" }) {
  switch (type) {
    case "d2":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <circle
            cx="16"
            cy="16"
            r="14"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="currentColor"
            fillOpacity="0.15"
          />
          <circle
            cx="16"
            cy="16"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          <path
            d="M14 11H18V21M13 21H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "d4":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <polygon
            points="16,3 29,27 3,27"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="currentColor"
            fillOpacity="0.15"
            strokeLinejoin="round"
          />
          <line
            x1="16"
            y1="3"
            x2="16"
            y2="20"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line
            x1="16"
            y1="20"
            x2="3"
            y2="27"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line
            x1="16"
            y1="20"
            x2="29"
            y2="27"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "d6":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect
            x="4"
            y="4"
            width="24"
            height="24"
            rx="5"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="currentColor"
            fillOpacity="0.15"
          />
          <circle cx="10" cy="10" r="2" fill="currentColor" />
          <circle cx="22" cy="10" r="2" fill="currentColor" />
          <circle cx="10" cy="22" r="2" fill="currentColor" />
          <circle cx="22" cy="22" r="2" fill="currentColor" />
          <circle cx="10" cy="16" r="2" fill="currentColor" />
          <circle cx="22" cy="16" r="2" fill="currentColor" />
        </svg>
      );
    case "d8":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <polygon
            points="16,2 29,16 16,30 3,16"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="currentColor"
            fillOpacity="0.15"
            strokeLinejoin="round"
          />
          <line
            x1="16"
            y1="2"
            x2="16"
            y2="30"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line
            x1="3"
            y1="16"
            x2="29"
            y2="16"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "d12":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Outer regular dodecagon/decagon polygon */}
          <polygon
            points="16,2 25,6 30,15 27,25 19,30 13,30 5,25 2,15 7,6"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="currentColor"
            fillOpacity="0.15"
            strokeLinejoin="round"
          />
          {/* Inner pentagon facet */}
          <polygon
            points="16,9 23,14 20,22 12,22 9,14"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
            fillOpacity="0.1"
            strokeLinejoin="round"
          />
          <line
            x1="16"
            y1="2"
            x2="16"
            y2="9"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="25"
            y1="6"
            x2="23"
            y2="14"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="27"
            y1="25"
            x2="20"
            y2="22"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="5"
            y1="25"
            x2="12"
            y2="22"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="7"
            y1="6"
            x2="9"
            y2="14"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "d20":
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Outer hexagon */}
          <polygon
            points="16,2 29,9 29,23 16,30 3,23 3,9"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="currentColor"
            fillOpacity="0.15"
            strokeLinejoin="round"
          />
          {/* Inner triangle */}
          <polygon
            points="16,9 26,20 6,20"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
            fillOpacity="0.1"
            strokeLinejoin="round"
          />
          <line
            x1="16"
            y1="2"
            x2="16"
            y2="9"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="29"
            y1="9"
            x2="16"
            y2="9"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="3"
            y1="9"
            x2="16"
            y2="9"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="29"
            y1="23"
            x2="26"
            y2="20"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="3"
            y1="23"
            x2="6"
            y2="20"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="16"
            y1="30"
            x2="26"
            y2="20"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="16"
            y1="30"
            x2="6"
            y2="20"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
  }
}
