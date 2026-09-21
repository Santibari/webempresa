import styles from './Skeleton.module.css'

export default function Skeleton({ width, height, borderRadius, style, className = '', aspectRatio }) {
  const customStyles = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(borderRadius ? { borderRadius } : {}),
    ...(aspectRatio ? { aspectRatio } : {}),
    ...style,
  }

  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={customStyles}
      aria-hidden="true"
    />
  )
}
