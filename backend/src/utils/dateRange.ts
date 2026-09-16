// NOTE: `${date}T00:00:00` is parsed in the server's local timezone, so the
// returned window is a local day expressed as UTC instants, not a UTC day.
// This is long-standing behavior that queries depend on -- do not "fix" it here
// without checking the callers.
// export function dayRangeUTC(date: string) {
//   const startLocal = new Date(`${date}T00:00:00`);
//   const endLocal = new Date(`${date}T00:00:00`);
//   endLocal.setDate(endLocal.getDate() + 1);

//   return {
//     start: new Date(startLocal.toISOString()),
//     end: new Date(endLocal.toISOString()),
//   };
// }
export function dayRangeUTC(date: string) {
  const start = new Date(`${date}T00:00:00+09:00`);
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

  return { start, end };
}