/**
 * Hamster Loading 组件
 * 基于原Vue版本的React实现，使用module CSS + Tailwind
 */

import styles from './HamsterLoading.module.css'

interface HamsterLoadingProps {
  visible?: boolean
}

export default function HamsterLoading({ visible = true }: HamsterLoadingProps) {
  if (!visible) return null

  return (
    <div
      className={`${styles.wheelAndHamster} flex items-center justify-center`}
      aria-label="Orange and tan hamster running in a metal wheel"
      role="img"
    >
      <div className={styles.wheel} />
      <div className={styles.hamster}>
        <div className={styles.hamsterBody}>
          <div className={styles.hamsterHead}>
            <div className={styles.hamsterEar} />
            <div className={styles.hamsterEye} />
            <div className={styles.hamsterNose} />
          </div>
          <div className={`${styles.hamsterLimbFr} hamster__limb`} />
          <div className={`${styles.hamsterLimbFl} hamster__limb`} />
          <div className={`${styles.hamsterLimbBr} hamster__limb`} />
          <div className={`${styles.hamsterLimbBl} hamster__limb`} />
          <div className={styles.hamsterTail} />
        </div>
      </div>
      <div className={styles.spoke} />
    </div>
  )
}