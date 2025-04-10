export const identifyDominantProfile = (scores) => {
  if (
    !scores ||
    typeof scores !== "object" ||
    Object.keys(scores).length === 0
  ) {
    return null;
  }

  const normalizedScores = Object.fromEntries(
    Object.entries(scores).map(([key, value]) => [
      key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
      Number(value) || 0,
    ])
  );

  const maxScore = Math.max(...Object.values(normalizedScores));

  if (maxScore === 0) {
    return null;
  }

  const dominantTypes = Object.keys(normalizedScores)
    .filter((type) => normalizedScores[type] === maxScore)
    .sort();

  return dominantTypes.length === 1
    ? dominantTypes[0]
    : dominantTypes.slice(0, 2).join("-");
};

export const classify = (archetypeScore, temperamentScore) => {
  const dominantArchetype = identifyDominantProfile(archetypeScore);
  const dominantTemperament = identifyDominantProfile(temperamentScore);

  return {
    dominantArchetype,
    dominantTemperament,
    metadata: {
      processedAt: new Date().toISOString(),
    },
  };
};
