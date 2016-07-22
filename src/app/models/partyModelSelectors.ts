const attendingPercentCalculation =  (people) => {
  const totalAttending = people.filter(person => person.attending).length;
  const total = people.length;
  return total > 0 ? Math.round((totalAttending / total) * 100) : 0;
};

export const partyModel = () => {
  return state => state
    .map(([people, filter]) => {
      return {
            total: people.length,
            people: people.filter(filter),
            attending: people.filter(person => person.attending).length,
            guests: people.reduce((acc, curr) => acc + curr.guests, 0),
            attendingPercent: attendingPercentCalculation(people)
          };
    });
};
