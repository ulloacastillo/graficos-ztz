import { count } from 'd3';

export function validateData(input, dateType) {
  const DATE_TYPES_FORMAT = {
    'DD-MM-AA': {
      regex: /^(\d{1,2}[-\/]\d{1,2}[-\/]\d{2})$/,
      getDate: (string) => {
        let splitChar;
        if (string.includes('/')) splitChar = '/';
        else splitChar = '-';
        const [day, month, year] = string.split(splitChar);
        return `${month}/${day}/20${year}`;
      },
    },
    'MM-DD-AA': {
      regex: /^(\d{1,2}[-\/]\d{1,2}[-\/]\d{2})$/,
      getDate: (string) => {
        let splitChar;
        if (string.includes('/')) splitChar = '/';
        else splitChar = '-';
        const [month, day, year] = string.split(splitChar);
        return `${month}/${day}/20${year}`;
      },
    },
    'DD-MM-AAAA': {
      regex: /^(\d{1,2}[-\/]\d{1,2}[-\/]\d{4})$/,
      getDate: (string) => {
        let splitChar;
        if (string.includes('/')) splitChar = '/';
        else splitChar = '-';
        const [day, month, year] = string.split(splitChar);

        return `${month}/${day}/${year}`;
      },
    },
    'MM-DD-AAAA': {
      regex: /^(\d{1,2}[-\/]\d{1,2}[-\/]\d{4})$/,
      getDate: (string) => {
        let splitChar;
        if (string.includes('/')) splitChar = '/';
        else splitChar = '-';
        const [month, day, year] = string.split(splitChar);
        return `${month}/${day}/${year}`;
      },
    },
  };

  const lines = input.trim().split('\n');
  const headers = lines[0].split(',');
  let dateCounts = {};
  let notAnswered = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (headers.length === 1) {
      const match = line.match(DATE_TYPES_FORMAT[dateType].regex);

      if (!match) {
        return {
          isValid: false,
          error: `La línea ${i + 1} no sigue el formato correcto.`,
        };
      }
      let date = DATE_TYPES_FORMAT[dateType].getDate(line);

      if (dateCounts[date]) {
        dateCounts[date]++;
      } else {
        dateCounts[date] = 1;
      }
    } else if (headers.length === 2) {
      let [date, answer] = line.split(',');
      const match = date.match(DATE_TYPES_FORMAT[dateType].regex);
      if (!match) {
        return {
          isValid: false,
          error: `La línea ${i + 1} no sigue el formato correcto.`,
        };
      }

      notAnswered += answer === 'SI' || answer === 'NO' ? 1 : 0;
      date = DATE_TYPES_FORMAT[dateType].getDate(date);
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
    .sort((a, b) => a[0] - b[0])
    .map(([date, count]) => {
      return [new Date(date).toISOString().split('T')[0], count];
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
