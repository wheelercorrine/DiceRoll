export const DICE_TYPES = [
  {
    id: "d2",
    name: "d2",
    label: "d2 (Coin)",
    shortLabel: "Coin",
    sides: 2,
    color: "#eab308",
    gradient: "linear-gradient(135deg, #facc15 0%, #ca8a04 100%)",
    description: "Two-sided coin flip (Heads/Tails)",
  },
  {
    id: "d4",
    name: "d4",
    label: "d4",
    shortLabel: "d4",
    sides: 4,
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)",
    description: "Four-sided tetrahedral die (1-4)",
  },
  {
    id: "d6",
    name: "d6",
    label: "d6",
    shortLabel: "d6",
    sides: 6,
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
    description: "Classic six-sided cube die (1-6)",
  },
  {
    id: "d8",
    name: "d8",
    label: "d8",
    shortLabel: "d8",
    sides: 8,
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
    description: "Eight-sided octahedron die (1-8)",
  },
  {
    id: "d12",
    name: "d12",
    label: "d12",
    shortLabel: "d12",
    sides: 12,
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #f472b6 0%, #db2777 100%)",
    description: "Twelve-sided dodecahedron die (1-12)",
  },
  {
    id: "d20",
    name: "d20",
    label: "d20",
    shortLabel: "d20",
    sides: 20,
    color: "#f97316",
    gradient: "linear-gradient(135deg, #fb923c 0%, #ea580c 100%)",
    description: "Twenty-sided icosahedron die (1-20)",
  },
];

export function getRandomRoll(sides) {
  // Use crypto for high quality randomness if available, else Math.random
  if (
    typeof window !== "undefined" &&
    window.crypto &&
    window.crypto.getRandomValues
  ) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return (array[0] % sides) + 1;
  }
  return Math.floor(Math.random() * sides) + 1;
}

export function rollDiceGroup(dieType, count = 1, modifier = 0) {
  const diceDef =
    DICE_TYPES.find((d) => d.id === dieType.id || d.id === dieType) ||
    DICE_TYPES[2];
  const rolls = [];

  for (let i = 0; i < count; i++) {
    const val = getRandomRoll(diceDef.sides);
    rolls.push({
      id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
      value: val,
      sides: diceDef.sides,
      isMax: val === diceDef.sides,
      isMin: val === 1,
      coinSide: diceDef.sides === 2 ? (val === 1 ? "Heads" : "Tails") : null,
    });
  }

  const rawSum = rolls.reduce((acc, curr) => acc + curr.value, 0);
  const total = rawSum + modifier;
  const values = rolls.map((r) => r.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const average = Number((rawSum / count).toFixed(2));

  return {
    id: `roll-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date(),
    die: diceDef,
    count,
    modifier,
    rolls,
    rawSum,
    total,
    min,
    max,
    average,
  };
}
