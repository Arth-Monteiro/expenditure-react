// export const TODAY = new Date();
export const TODAY = new Date('2021-06-01T00:00:00');

export function dateToISOString(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function ISOStringToDate(date: string): Date {
  return new Date(date + 'T00:00:00');
}
