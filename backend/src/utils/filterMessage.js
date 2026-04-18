const blockedWords = ["idiot", "stupid", "hate", "dumb"];

const filterMessage = (message) => {
  let filtered = message;

  blockedWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    filtered = filtered.replace(regex, "*".repeat(word.length));
  });

  return filtered;
};

module.exports = filterMessage;
