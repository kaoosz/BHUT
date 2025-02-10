export function requiredMessage(field: unknown): string {
  return `The field ${field} is required`;
}

export function invalidTypeMessage(field: unknown, type: string): string {
  return `The field ${field} is type ${type}.`;
}
