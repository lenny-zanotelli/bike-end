// eslint-disable-next-line import/prefer-default-export
export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  return `${hours}h${minutes.toString().padStart(2, '0')}`;
};
