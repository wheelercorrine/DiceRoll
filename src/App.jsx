import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { DieIcon } from "./components/DieIcon";
import { DieResult } from "./components/DieResult";
import { RollHistory } from "./components/RollHistory";
import { RollSummary } from "./components/RollSummary";
import { DICE_TYPES, rollDiceGroup } from "./utils/dice";
import { playDiceSound } from "./utils/sound";

const QUICK_COUNTS = [1, 2, 3, 4, 5, 6, 8, 10];

export default function App() {
  const [selectedDie, setSelectedDie] = useState(DICE_TYPES[2]); // d6 default
  const [count, setCount] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState(null);
  const [displayRolls, setDisplayRolls] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("diceroller_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "diceroller_history",
        JSON.stringify(history.slice(0, 50)),
      );
    } catch {
      // Ignore storage errors
    }
  }, [history]);

  const animIntervalRef = useRef(null);

  const performRoll = useCallback(
    (dieToRoll = selectedDie, countToRoll = count, modToRoll = modifier) => {
      if (isRolling) return;
      setIsRolling(true);

      if (soundEnabled) {
        playDiceSound(countToRoll);
      }

      // Generate intermediate random numbers for roll animation effect
      let frame = 0;
      const totalFrames = 8;
      animIntervalRef.current = setInterval(() => {
        frame++;
        const tempRolls = Array.from({ length: countToRoll }, (_, i) => ({
          id: `temp-${i}`,
          value: Math.floor(Math.random() * dieToRoll.sides) + 1,
          sides: dieToRoll.sides,
          isMax: false,
          isMin: false,
          coinSide:
            dieToRoll.sides === 2
              ? Math.random() > 0.5
                ? "Heads"
                : "Tails"
              : null,
        }));
        setDisplayRolls(tempRolls);

        if (frame >= totalFrames) {
          clearInterval(animIntervalRef.current);
          const finalResult = rollDiceGroup(dieToRoll, countToRoll, modToRoll);
          setCurrentRoll(finalResult);
          setDisplayRolls(finalResult.rolls);
          setIsRolling(false);
          setHistory((prev) => [finalResult, ...prev.slice(0, 49)]);
        }
      }, 55);
    },
    [selectedDie, count, modifier, isRolling, soundEnabled],
  );

  // Roll initial die on first load if no roll exists
  useEffect(() => {
    if (!currentRoll) {
      const initial = rollDiceGroup(DICE_TYPES[2], 1, 0);
      setCurrentRoll(initial);
      setDisplayRolls(initial.rolls);
    }
    return () => {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard shortcut: Space or Enter to roll
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is focused inside an input
      if (["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) return;

      if (e.code === "Space") {
        e.preventDefault();
        performRoll();
      }
      // Quick keys 1-6 to switch dice
      if (
        ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6"].includes(
          e.code,
        )
      ) {
        const index = parseInt(e.code.replace("Digit", ""), 10) - 1;
        if (DICE_TYPES[index]) {
          setSelectedDie(DICE_TYPES[index]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [performRoll]);

  const handleCountChange = (delta) => {
    setCount((prev) => Math.max(1, Math.min(50, prev + delta)));
  };

  const handleCountDirectInput = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      setCount(1);
    } else {
      setCount(Math.max(1, Math.min(50, val)));
    }
  };

  const handleModifierChange = (delta) => {
    setModifier((prev) => prev + delta);
  };

  const handleReroll = (historyItem) => {
    setSelectedDie(historyItem.die);
    setCount(historyItem.count);
    setModifier(historyItem.modifier || 0);
    performRoll(historyItem.die, historyItem.count, historyItem.modifier || 0);
  };

  const isCoin = selectedDie.sides === 2;
  const rollButtonText = isRolling
    ? isCoin
      ? "Flipping..."
      : "Rolling..."
    : isCoin
      ? count === 1
        ? "Flip Coin"
        : `Flip ${count} Coins`
      : `Roll ${count}${selectedDie.name}${modifier > 0 ? ` +${modifier}` : modifier < 0 ? ` ${modifier}` : ""}`;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-logo-badge">
            <DieIcon type="d20" size={28} />
          </div>
          <div>
            <h1>Dice Roller</h1>
            <p className="header-subtitle">
              Multi-dice simulator & coin flipper
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className={`btn-icon ${soundEnabled ? "active" : ""}`}
            onClick={() => setSoundEnabled((v) => !v)}
            title={soundEnabled ? "Mute sound" : "Enable sound"}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
            <span className="sound-label">
              {soundEnabled ? "Sound On" : "Muted"}
            </span>
          </button>
        </div>
      </header>

      <main className="app-main-layout">
        {/* Left Column: Controls & Selection */}
        <section className="controls-panel">
          {/* Die Selection Section */}
          <div className="control-group">
            <div className="control-group-header">
              <label>Select Die Type</label>
              <span className="control-hint">Press 1-6 to switch</span>
            </div>

            <div className="dice-type-grid">
              {DICE_TYPES.map((die, index) => {
                const isSelected = selectedDie.id === die.id;
                return (
                  <button
                    key={die.id}
                    type="button"
                    className={`die-select-btn ${isSelected ? "selected" : ""}`}
                    onClick={() => setSelectedDie(die)}
                    style={{
                      "--die-color": die.color,
                    }}
                    title={die.description}
                  >
                    <span className="die-index-badge">{index + 1}</span>
                    <div className="die-select-icon">
                      <DieIcon type={die.id} size={36} />
                    </div>
                    <div className="die-select-info">
                      <span className="die-select-name">{die.label}</span>
                      <span className="die-select-sides">
                        {die.sides === 2 ? "2 Faces (1-2)" : `1 - ${die.sides}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Multiples / Count Selection */}
          <div className="control-group">
            <div className="control-group-header">
              <label htmlFor="dice-count-input">Number of Dice</label>
              <span className="control-hint">Roll multiples together</span>
            </div>

            <div className="count-selector-row">
              <button
                type="button"
                className="count-btn"
                onClick={() => handleCountChange(-1)}
                disabled={count <= 1}
                title="Decrease count"
              >
                −
              </button>

              <div className="count-input-wrapper">
                <input
                  id="dice-count-input"
                  type="number"
                  min="1"
                  max="50"
                  value={count}
                  onChange={handleCountDirectInput}
                  className="count-input"
                  aria-label="Number of dice"
                />
                <span className="count-unit-label">
                  {isCoin ? "coin(s)" : "dice"}
                </span>
              </div>

              <button
                type="button"
                className="count-btn"
                onClick={() => handleCountChange(1)}
                disabled={count >= 50}
                title="Increase count"
              >
                +
              </button>
            </div>

            {/* Quick Pills */}
            <div className="quick-count-pills">
              {QUICK_COUNTS.map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`pill-btn ${count === num ? "active" : ""}`}
                  onClick={() => setCount(num)}
                >
                  {num}x
                </button>
              ))}
            </div>
          </div>

          {/* Optional Modifier (for RPGs / calculations) */}
          <div className="control-group modifier-group">
            <div className="control-group-header">
              <label htmlFor="modifier-input">Modifier</label>
              <span className="control-hint">Add or subtract from total</span>
            </div>
            <div className="modifier-row">
              <button
                type="button"
                className="modifier-step-btn"
                onClick={() => handleModifierChange(-1)}
                title="Minus 1"
              >
                −
              </button>
              <input
                id="modifier-input"
                type="number"
                value={modifier}
                onChange={(e) => setModifier(parseInt(e.target.value, 10) || 0)}
                className="modifier-input"
                aria-label="Roll Modifier"
              />
              <button
                type="button"
                className="modifier-step-btn"
                onClick={() => handleModifierChange(1)}
                title="Plus 1"
              >
                +
              </button>
              {modifier !== 0 && (
                <button
                  type="button"
                  className="modifier-reset-btn"
                  onClick={() => setModifier(0)}
                  title="Reset modifier to 0"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Big Roll Action Button */}
          <div className="roll-action-container">
            <button
              type="button"
              className={`btn-roll-main ${isRolling ? "rolling" : ""}`}
              onClick={() => performRoll()}
              disabled={isRolling}
              style={{
                "--roll-btn-color": selectedDie.color,
              }}
            >
              <div className="btn-roll-content">
                <DieIcon type={selectedDie.id} size={28} />
                <span className="btn-roll-text">{rollButtonText}</span>
              </div>
            </button>
            <span className="roll-shortcut-tip">
              Press <kbd>Space</kbd> anywhere to roll
            </span>
          </div>

          {/* Quick Presets Bar */}
          <div className="quick-presets-section">
            <span className="presets-label">Popular Rolls:</span>
            <div className="presets-buttons">
              <button
                type="button"
                className="preset-btn"
                onClick={() => {
                  setSelectedDie(DICE_TYPES[0]);
                  setCount(1);
                  setModifier(0);
                  performRoll(DICE_TYPES[0], 1, 0);
                }}
              >
                1d2 (Coin)
              </button>
              <button
                type="button"
                className="preset-btn"
                onClick={() => {
                  setSelectedDie(DICE_TYPES[2]);
                  setCount(2);
                  setModifier(0);
                  performRoll(DICE_TYPES[2], 2, 0);
                }}
              >
                2d6
              </button>
              <button
                type="button"
                className="preset-btn"
                onClick={() => {
                  setSelectedDie(DICE_TYPES[2]);
                  setCount(4);
                  setModifier(0);
                  performRoll(DICE_TYPES[2], 4, 0);
                }}
              >
                4d6
              </button>
              <button
                type="button"
                className="preset-btn"
                onClick={() => {
                  setSelectedDie(DICE_TYPES[5]);
                  setCount(1);
                  setModifier(0);
                  performRoll(DICE_TYPES[5], 1, 0);
                }}
              >
                1d20
              </button>
              <button
                type="button"
                className="preset-btn"
                onClick={() => {
                  setSelectedDie(DICE_TYPES[5]);
                  setCount(2);
                  setModifier(0);
                  performRoll(DICE_TYPES[5], 2, 0);
                }}
              >
                2d20 (Adv/Dis)
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Active Roll Showcase & History */}
        <section className="results-panel">
          {/* Active Roll Card / Summary */}
          {currentRoll && (
            <div className="current-roll-area">
              <RollSummary rollResult={currentRoll} />

              <div className="dice-display-container">
                <div
                  className={`dice-display-grid count-${Math.min(displayRolls.length, 12)}`}
                >
                  {displayRolls.map((roll, index) => (
                    <DieResult
                      key={roll.id || index}
                      roll={roll}
                      die={currentRoll.die}
                      isRolling={isRolling}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* History Panel */}
          <RollHistory
            history={history}
            onReroll={handleReroll}
            onClear={() => setHistory([])}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Dice Roller • Choose between{" "}
          <strong>d2 (coin), d4, d6, d8, d12, d20</strong> with multiple dice
          rolling support.
        </p>
      </footer>
    </div>
  );
}
