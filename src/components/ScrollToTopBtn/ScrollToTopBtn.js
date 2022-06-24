import { useRef, useEffect } from 'react'
import styles from './ScrollToTopBtn.module.scss'
import { UpArrow } from '~/components/Icons'

function ScrollToTopBtn() {
  const toTopBtnRef = useRef(null)

  const hideBtn = () => {
    if (toTopBtnRef?.current) {
      if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        toTopBtnRef.current.style.display = 'block'
      } else {
        toTopBtnRef.current.style.display = 'none'
      }
    }
  }

  const handleScrollToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  useEffect(() => {
    window.addEventListener('scroll', hideBtn)

    return () => window.addEventListener('scroll', hideBtn)
  }, [])

  return (
    <button onClick={handleScrollToTop} className={styles['to-top-btn']} ref={toTopBtnRef}>
      <UpArrow />
    </button>
  )
}
export default ScrollToTopBtn
