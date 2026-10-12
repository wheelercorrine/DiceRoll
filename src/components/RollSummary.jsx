export function RollSummary({ rollResult }) {
  if (!rollResult) return null;

  const { die, count, modifier, rolls, rawSum, total, min, max, average } =
    rollResult;

  const formula = `${count}${die.name}${modifier > 0 ? ` + ${modifier}` : modifier < 0 ? ` - ${Math.abs(modifier)}` : ""}`;

  // For coins, count heads and tails
  const isCoin = die.sides === 2;
  const headsCount = isCoin ? rolls.filter((r) => r.value === 1).length : 0;
  const tailsCount = isCoin ? rolls.filter((r) => r.value === 2).length : 0;

  return (
    <div className="roll-summary-card">
      <div className="summary-main">
        <div className="summary-left">
          <span className="summary-formula-pill">{formula}</span>
          <div className="summary-total-container">
            <span className="summary-total-label">Total</span>
            <span className="summary-total-value">{total}</span>
          </div>
        </div>

        {isCoin && (
          <div className="coin-breakdown-badges">
            <div className="coin-stat heads">
              <span className="coin-stat-title">Heads</span>
              <span className="coin-stat-count">{headsCount}</span>
            </div>
            <div className="coin-stat tails">
              <span className="coin-stat-title">Tails</span>
              <span className="coin-stat-count">{tailsCount}</span>
            </div>
          </div>
        )}

        {count > 1 && !isCoin && (
          <div className="summary-stats-grid">
            <div className="stat-pill">
              <span className="stat-pill-label">Highest</span>
              <span className="stat-pill-value">{max}</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-label">Lowest</span>
              <span className="stat-pill-value">{min}</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-label">Average</span>
              <span className="stat-pill-value">{average}</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-label">Raw Sum</span>
              <span className="stat-pill-value">{rawSum}</span>
            </div>
          </div>
        )}
      </div>

      {count > 1 && (
        <div className="summary-breakdown-text">
          <span className="breakdown-label">Breakdown:</span>{" "}
          <span className="breakdown-formula">
            (
            {rolls
              .map((r) =>
                isCoin ? (r.value === 1 ? "Heads" : "Tails") : r.value,
              )
              .join(" + ")}
            )
            {modifier !== 0 &&
              (modifier > 0 ? ` + ${modifier}` : ` - ${Math.abs(modifier)}`)}
            {" = "}
            <strong>{total}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
