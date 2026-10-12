/** Two-digit index, e.g. 3 → "03". */
export const pad = (value: number) => String(value).padStart(2, '0')

/** Show the bare address ("github.com/aricallen") rather than the full URL. */
export const displayUrl = (url: string) => url.replace(/^(mailto:|https?:\/\/(www\.)?)/, '').replace(/\/$/, '')
