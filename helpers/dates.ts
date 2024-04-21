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

// "20 juillet 2016"
export const parseFrenchDate = (frenchDateString: string) => {
  const frenchMonths: { [key: string]: string } = {
    janvier: "January",
    février: "February",
    mars: "March",
    avril: "April",
    mai: "May",
    juin: "June",
    juillet: "July",
    août: "August",
    septembre: "September",
    octobre: "October",
    novembre: "November",
    décembre: "December",
  };
  const [day, month, year] = frenchDateString.split(" ");
  const englishMonth = frenchMonths[month.toLowerCase()];

  if (!englishMonth) {
    throw new Error("Mois non reconnu");
  }

  const date = new Date(`${englishMonth} ${day}, ${year}`);
  return date;
};
