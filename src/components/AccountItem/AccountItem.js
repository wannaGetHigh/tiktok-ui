import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './AccountItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Image from '~/components/Image'
import { forwardRef } from 'react'
import { useAvatarImage } from '~/hooks'

const cx = classNames.bind(styles)

const AccountItem = forwardRef(({ data, options = {} }, ref) => {
  const { small, hidden } = options
  const avatarSrc = useAvatarImage(data.uid)

  return (
    <Link to={`/@${data.nickname}`} className={cx('wrapper')} ref={ref}>
      <Image className={cx('avatar', { small })} src={avatarSrc} alt={data.full_name} />
      <div className={cx('info', { hidden })}>
        <h4 className={cx('nickname', { small })}>
          <span>{data.nickname}</span>
          {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
        </h4>
        <h3 className={cx('username', { small })}>{data.full_name}</h3>
      </div>
    </Link>
  )
})

AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
}

export default AccountItem
