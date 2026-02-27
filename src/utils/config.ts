export const CONFIG = {
  RECRUIT: true,
  RECRUIT_YEAR: 2026,
  get API_URL() { return import.meta.env.VITE_API_URL ?? "" },
  get CHANNEL_API_KEY() { return import.meta.env.VITE_CHANNEL_API_KEY ?? "" }
}