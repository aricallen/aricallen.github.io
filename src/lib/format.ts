/** Two-digit index, e.g. 3 → "03". */
export const pad = (value: number) => String(value).padStart(2, '0')

/** Content strings mark emphasis with underscores ("people _love to use_"); this strips the markers. */
export const plainText = (text: string) => text.replace(/_/g, '')

/** Show the bare address ("github.com/aricallen") rather than the full URL. */
export const displayUrl = (url: string) => url.replace(/^(mailto:|https?:\/\/(www\.)?)/, '').replace(/\/$/, '')
