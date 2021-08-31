import styles from './card.module.css'
import cn from 'classnames'

export default function Card({ children, type }) {
  return (
    <section
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
        [styles.card]: true,
      })}
    >
      {children}
    </section>
  )
}