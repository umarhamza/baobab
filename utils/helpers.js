export const mapTranslations = (data) =>
  data.map((rows, index) => ({
    id: index + 1,
    english: rows[0] || '',
    wolof: rows[1] || '',
    arabic: rows[2] || '',
  }));
