export const mapTranslations = (data) =>
  data.map((rows) => ({
    english: rows[0] || '',
    wolof: rows[1] || '',
    arabic: rows[2] || '',
  }));
