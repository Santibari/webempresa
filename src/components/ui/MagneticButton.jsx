import { useMagnetic } from '../../hooks/useMagnetic.js'
import { ArrowUpRight } from './Icons.jsx'

/**
 * Botón/enlace magnético con icono que se revela en hover.
 * `as`: 'a' | 'button'. Acepta cualquier prop nativa.
 */
export default function MagneticButton({
  as = 'a',
  variant = 'primary',
  size = '',
  icon = <ArrowUpRight />,
  strength = 0.3,
  className = '',
  children,
  ...rest
}) {
  const ref = useMagnetic({ strength })
  const Tag = as
  return (
    <Tag ref={ref} className={`btn btn-${variant} ${size ? `btn-${size}` : ''} ${className}`} {...rest}>
      <span>{children}</span>
      {icon && <span className="btn-icon" aria-hidden="true">{icon}</span>}
    </Tag>
  )
}
