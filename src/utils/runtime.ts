export function runtime(minutesOfRuntime: number) {
  const minutes = minutesOfRuntime % 60;
  const hour = Math.floor(minutesOfRuntime / 60);

  return `${hour}h ${minutes}m`;
}
