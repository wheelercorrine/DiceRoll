export function DieResult({ roll, die, isRolling, index = 0 }) {
  const { value, isMax, isMin, sides, coinSide } = roll;

  // For d2 (Coin)
  if (sides === 2) {
    const isHeads = coinSide === "Heads" || value === 1;
    return (
      <div
        className={`die-card die-d2 ${isRolling ? "is-rolling" : ""}`}
        style={{ animationDelay: `${index * 45}ms` }}
        title={`Coin Flip: ${isHeads ? "Heads" : "Tails"} (${value})`}
      >
        <div className="coin-disc">
          <div className="coin-inner">
            <span className="coin-label">{isHeads ? "HEADS" : "TAILS"}</span>
            <span className="coin-value">{value}</span>
          </div>
        </div>
      </div>
    );
  }

  // Determine badge for extremes
  const showCritBadge = isMax && sides >= 4;
  const showFumbleBadge = isMin && sides >= 8;

  return (
    <div
      className={`die-card die-${die.id} ${isRolling ? "is-rolling" : ""} ${isMax ? "is-max" : ""} ${isMin ? "is-min" : ""}`}
      style={{
        animationDelay: `${index * 40}ms`,
        "--die-accent": die.color,
      }}
      title={`${die.name} rolled: ${value}`}
    >
      <div className="die-shape-wrapper">
        {die.id === "d4" && (
          <svg className="die-svg-bg" viewBox="0 0 100 90">
            <polygon points="50,6 94,84 6,84" />
          </svg>
        )}
        {die.id === "d6" && <div className="d6-face" />}
        {die.id === "d8" && (
          <svg className="die-svg-bg" viewBox="0 0 100 100">
            <polygon points="50,5 92,50 50,95 8,50" />
          </svg>
        )}
        {die.id === "d12" && (
          <svg className="die-svg-bg" viewBox="0 0 100 100">
            <polygon points="50,5 86,18 97,55 76,92 50,97 24,92 3,55 14,18" />
          </svg>
        )}
        {die.id === "d20" && (
          <svg className="die-svg-bg" viewBox="0 0 100 100">
            <polygon points="50,4 93,27 93,73 50,96 7,73 7,27" />
          </svg>
        )}

        <div className="die-content">
          <span className="die-number">{value}</span>
          <span className="die-type-label">{die.name}</span>
        </div>
      </div>

      {showCritBadge && (
        <div className="crit-badge max-crit">
          {sides === 20 ? "NAT 20!" : "MAX!"}
        </div>
      )}
      {showFumbleBadge && (
        <div className="crit-badge min-fumble">
          {sides === 20 ? "NAT 1" : "MIN"}
        </div>
      )}
    </div>
  );
}
