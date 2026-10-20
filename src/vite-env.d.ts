/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_FORM_ENDPOINT?: string
  readonly VITE_LINKEDIN_URL?: string
  readonly VITE_INSTAGRAM_URL?: string
  readonly VITE_BASE?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
