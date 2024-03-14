export const getTimeString = (dateString: string) => {
  const date = new Date(dateString);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  return `${hours}:${minutes}`;
};
