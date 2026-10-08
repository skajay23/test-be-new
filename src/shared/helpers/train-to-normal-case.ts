export const trainToNormalCase = (str: string) => {
  const strArr = str.split("_");
  const capitalized = strArr.map((word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalized.join(" ");
};
