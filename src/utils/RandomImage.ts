// eslint-disable-next-line import/prefer-default-export
export const generateRandomImageUrl = () => {
  const randomNumber = Math.floor(Math.random() * 220) + 1;
  return `https://loremflickr.com/320/480/paris,${randomNumber}`;
};
