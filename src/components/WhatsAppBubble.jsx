import { useLang } from '../context/LangContext.jsx'
import styles from './WhatsAppBubble.module.css'

export default function WhatsAppBubble() {
  const { t } = useLang()

  return (
    <>
      <a
        className={styles.waBubble}
        href="https://wa.me/573053704481?text=Hola%20Aikata%2C%20quiero%20saber%20m%C3%A1s%20sobre%20sus%20servicios"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('wa.tooltip')}
      >
        <svg viewBox="0 0 32 32">
          <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.35.63 4.55 1.73 6.45L4 29l7.7-1.68a11.9 11.9 0 0 0 4.32.8h.01c6.63 0 12.02-5.4 12.02-12.02C28.05 8.4 22.66 3 16.02 3Zm7.02 17.02c-.3.85-1.7 1.62-2.35 1.72-.6.1-1.36.14-2.2-.14-.5-.16-1.15-.38-1.98-.74-3.48-1.5-5.75-5-5.93-5.24-.17-.24-1.42-1.9-1.42-3.62 0-1.72.9-2.57 1.22-2.92.31-.35.68-.44.9-.44h.65c.21 0 .49-.08.77.58.3.7.99 2.42 1.07 2.6.09.17.14.38.03.62-.1.24-.16.38-.3.58-.15.2-.32.44-.46.6-.15.16-.31.34-.13.66.17.32.77 1.28 1.66 2.08 1.14 1.02 2.11 1.34 2.43 1.5.32.16.51.13.7-.08.2-.2.83-.96 1.05-1.3.22-.32.44-.27.74-.16.3.1 1.92.9 2.25 1.07.32.16.53.24.6.38.08.14.08.8-.22 1.65Z"/>
        </svg>
      </a>
      <span className={styles.waTooltip}>{t('wa.tooltip')}</span>
    </>
  )
}