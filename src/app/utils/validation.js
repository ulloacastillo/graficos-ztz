export function validateData(input) {
  const lines = input.trim().split('\n');
  const headers = lines[0].split(',');
  let dateCounts = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^(\d{2}-\d{2}-\d{4}|\d{4}-\d{2}-\d{2})$/);

    if (!match) {
      return { isValid: false, error: `La línea ${i + 1} no sigue el formato correcto.` };
    }

    let date = match[1];

    if (dateCounts[date]) {
      dateCounts[date]++;
    } else {
      dateCounts[date] = 1;
    }
  }

  const data = Object.entries(dateCounts)
    .map(([date, count]) => {

      if (date.includes('-')) {
        const parts = date.split('-');
        date = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return [new Date(date), count];
    })
    .sort((a, b) => a[0] - b[0])
    .map(([date, count]) => [date.toISOString().split('T')[0], count]);

  return { isValid: true, headers, data };
}
