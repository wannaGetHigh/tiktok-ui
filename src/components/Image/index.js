import { forwardRef, useState } from 'react'
import images from '~/assets/images'
import styles from './Image.module.scss'
import classNames from 'classnames'

const Image = forwardRef(({ src, className, fallback = images.noImage, alt }, ref) => {
  const [_fallback, setFallback] = useState('')

  const handleError = () => {
    setFallback(fallback)
  }

  return (
    <img
      className={classNames(styles.wrapper, className)}
      ref={ref}
      src={_fallback || src}
      alt={alt}
      onError={handleError}
    />
  )
})
export default Image
