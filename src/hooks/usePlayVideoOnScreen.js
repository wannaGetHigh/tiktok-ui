import { useEffect, useState, useRef } from 'react'

const usePlayVideoOnScreen = (options) => {
  const containRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const callbackFunc = (entries) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const obserer = new IntersectionObserver(callbackFunc, options)
    if (containRef.current) obserer.observe(containRef.current)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (containRef.current) obserer.unobserve(containRef.current)
    }
  }, [containRef, options])

  return [containRef, isVisible]
}
export default usePlayVideoOnScreen
