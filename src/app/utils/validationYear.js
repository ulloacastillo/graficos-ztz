export function validateData(input) {
    const lines = input.replace(/\s/g, '').split(',');
    const data = [];
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^(\d{4})=(\d+)$/);
  
      if (!match) {
        return { isValid: false, error: `La línea ${i + 1} no sigue el formato correcto.` };
      }
  
      const year = parseInt(match[1], 10);
      const quantity = parseInt(match[2], 10);
  
      if (isNaN(year) || isNaN(quantity)) {
        return { isValid: false, error: `La línea ${i + 1} contiene un número no válido.` };
      }
  
      data.push([year, quantity]);
    }
  
    return { isValid: true, data };
}