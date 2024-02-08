export function validateData(input) {
  const lines = input.trim().split('\n');
  const headers = lines[0].split(',');
  let dateCounts = {};
  let notAnswered = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    if (headers.length === 1) {
      const match = line.match(
        /^(\d{1,2}\/\d{1,2}\/\d{2}|\d{2}-\d{2}-\d{4}|\d{4}-\d{2}-\d{2})$/,
      );
      if (!match) {
        return {
          isValid: false,
          error: `La línea ${i + 1} no sigue el formato correcto.`,
        };
      }
      let date = match[1];

      if (dateCounts[date]) {
        dateCounts[date]++;
      } else {
        dateCounts[date] = 1;
      }
    } else if (headers.length === 2) {
      const match = line.match(
        /^(\d{1,2}\/\d{1,2}\/\d{2}|\d{2}-\d{2}-\d{4}|\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{2}),+(\d{1,2}\/\d{1,2}\/\d{2}|\d{2}-\d{2}-\d{4}|\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{2}|[A-Z]{2})$/,
      );
      if (!match) {
        return {
          isValid: false,
          error: `La línea ${i + 1} no sigue el formato correcto.`,
        };
      }

      const [date, answer] = line.split(',');
      notAnswered += answer === 'SI' || answer === 'NO' ? 1 : 0;
      if (dateCounts[date]) {
        dateCounts[date]++;
      } else {
        dateCounts[date] = 1;
      }
    } else {
      return {
        isValid: false,
        error: `Se ha ingresado un excel con mas de dos columnas`,
      };
    }
  }

  const data = Object.entries(dateCounts)
    .map(([date, count]) => {
      if (date.includes('-')) {
        const parts = date.split('-');
        date = `${parts[1]}/${parts[0]}/${parts[2]}`;
      }
      return [new Date(date), count];
    })
    .sort((a, b) => a[0] - b[0])
    .map(([date, count]) => {
      return [date.toISOString().split('T')[0], count];
    });

  return {
    isValid: true,
    headers,
    data,
    notAnswered,
    total: lines.length - 1,
    colNumber: headers.length,
  };
}
