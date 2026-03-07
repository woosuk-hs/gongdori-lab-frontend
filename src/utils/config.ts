export const CONFIG = {
  RECRUIT: true,
  YEAR: 2026,
  get API_URL() { return import.meta.env.VITE_API_URL ?? "" },
  get CHANNEL_KEY() { return import.meta.env.VITE_CHANNEL_KEY ?? "" },
}