import { Timestamp } from 'firebase/firestore';

/**
 * Normalises a Firestore Timestamp, date string, or Date to an ISO 8601 string.
 */
export function toIsoTimestamp(value: unknown): string {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  if (typeof value === 'string') {
    return value;
  }
  if (value && typeof (value as { toDate?: () => Date }).toDate === 'function') {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  return new Date().toISOString();
}
