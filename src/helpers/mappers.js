export const mapOutcomes = (outcomeTags) => {
  const possibleColors = ['lightPurple', 'pink', 'purple', 'red', 'green', 'blue', 'mediumBlue', 'darkPurple'];
    let outcomeObject = {};
    outcomeTags.forEach((outcomeTag, index) => {
      outcomeObject[index] = {
        color: possibleColors[index],
        label: outcomeTag,
      };
    });
    return outcomeObject;
}