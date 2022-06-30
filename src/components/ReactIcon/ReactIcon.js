import { useState } from 'react'
import styles from './ReactIcon.module.scss'
import classNames from 'classnames/bind'
import { forwardRef } from 'react'
import PropTypes from 'prop-types'

const cx = classNames.bind(styles)

const ReactIcon = forwardRef(({ children, Icon, small, row, liked, wrap = true }, ref) => {
  const [isLiked, setIsLiked] = useState(false)
  let dropLiked

  if (liked) {
    dropLiked = () => {
      setIsLiked((prev) => !prev)
    }
  }

  return wrap ? (
    <button ref={ref} className={cx({ row })}>
      <span className={cx('icon-wrapper', { small })} onClick={dropLiked}>
        <Icon width="24" height="24" className={cx({ liked: isLiked })} />
      </span>
      <strong>{children}</strong>
    </button>
  ) : (
    <div ref={ref}>
      <Icon />
    </div>
  )
})

ReactIcon.propTypes = {
  children: PropTypes.node,
  Icon: PropTypes.elementType,
  small: PropTypes.bool,
  row: PropTypes.bool,
  liked: PropTypes.bool,
  wrap: PropTypes.bool,
}

export default ReactIcon
