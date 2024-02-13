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
  let excelError = null;
  const lines = input.trim().split('\n');
  const headers = lines[0].split(',');
  let dateCounts = {};
  let notAnswered = { total: 0 };

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

      date = DATE_TYPES_FORMAT[dateType].getDate(date);
      const yearDate = date.split('/')[2];

      if (answer === 'SI' || answer === 'NO') {
        if (notAnswered[yearDate]) {
          notAnswered[yearDate]++;
        } else {
          notAnswered[yearDate] = 1;
        }
        notAnswered.total++;
      }

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

  console.log(notAnswered);
  const data = Object.entries(dateCounts)
    .sort((a, b) => a[0] - b[0])
    .map(([date, count]) => {
      try {
        return [new Date(date).toISOString().split('T')[0], count];
      } catch {
        excelError = {
          isValid: false,
          error: `La columna ${headers[0]} no posee el formato ${dateType}`,
        };
      }
    });
  if (excelError) {
    return {
      isValid: false,
      error: `La columna ${headers[0]} no posee el formato ${dateType}.\nPor favor seleccione el formato de fecha correcto`,
    };
  }

  return {
    isValid: true,
    headers,
    data,
    notAnswered,
    total: lines.length - 1,
    colNumber: headers.length,
  };
}
