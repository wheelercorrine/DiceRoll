export function RollHistory({ history, onReroll, onClear }) {
  if (!history || history.length === 0) {
    return (
      <div className="history-empty">
        <p>
          No rolls yet. Select your dice and hit <strong>Roll</strong>!
        </p>
      </div>
    );
  }

  return (
    <div className="history-section">
      <div className="history-header">
        <h3>Roll History ({history.length})</h3>
        <button
          type="button"
          onClick={onClear}
          className="btn-text-danger"
          title="Clear roll history"
        >
          Clear
        </button>
      </div>

      <div className="history-list">
        {history.map((item) => {
          const isCoin = item.die.sides === 2;
          const timeStr = item.timestamp
            ? new Date(item.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : "";

          return (
            <div key={item.id} className="history-item">
              <div className="history-item-top">
                <div className="history-item-info">
                  <span
                    className="history-die-badge"
                    style={{
                      backgroundColor: `${item.die.color}22`,
                      color: item.die.color,
                      borderColor: `${item.die.color}55`,
                    }}
                  >
                    {item.count}
                    {item.die.name}
                    {item.modifier > 0
                      ? `+${item.modifier}`
                      : item.modifier < 0
                        ? `${item.modifier}`
                        : ""}
                  </span>
                  <span className="history-time">{timeStr}</span>
                </div>
                <div className="history-item-actions">
                  <span className="history-total">
                    = <strong>{item.total}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => onReroll(item)}
                    className="btn-reroll"
                    title={`Reroll ${item.count}${item.die.name}`}
                  >
                    ↺
                  </button>
                </div>
              </div>

              <div className="history-dice-rolls">
                {item.rolls.map((r, idx) => (
                  <span
                    key={idx}
                    className={`history-roll-chip ${r.isMax ? "chip-max" : ""} ${r.isMin ? "chip-min" : ""}`}
                    title={
                      isCoin
                        ? r.value === 1
                          ? "Heads"
                          : "Tails"
                        : `Rolled ${r.value}`
                    }
                  >
                    {isCoin ? (r.value === 1 ? "H" : "T") : r.value}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
