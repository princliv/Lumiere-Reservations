/** Client-generated temporary id for new sub-entities (e.g. a new testimonial) before the next save round-trips a server id. */
export function tempId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
