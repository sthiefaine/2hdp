export const shortDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const monthIndex = date.getMonth();

  const months = [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ];

  const formattedDate = day + " " + months[monthIndex];

  return formattedDate;
};
