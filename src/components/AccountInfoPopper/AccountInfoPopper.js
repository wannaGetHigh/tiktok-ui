import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './AccountInfoPopper.module.scss'
import { Wrapper } from '~/components/Popper'
import Image from '~/components/Image'
import { CheckCircle } from '../Icons'
import FollowButton from '../FollowButton'
import { useAvatarImage } from '~/hooks'

const cx = classNames.bind(styles)

const AccountInfoPopper = ({ account, id, bio = false }) => {
  const avatarSrc = useAvatarImage(id)

  return (
    <Wrapper className={cx('account-info-containter')}>
      <div className={cx('account-info-head')}>
        <Link to={`/@${account.nickname}`} className={cx('avatar')}>
          <Image src={avatarSrc} alt={account.full_name} />
        </Link>

        <FollowButton id={id} />
      </div>
      <Link to={`/@${account.nickname}`} className={cx('account-info-title')}>
        {account.nickname}
        {account.tick && <CheckCircle className={cx('check')} />}
      </Link>
      <Link to={`/@${account.nickname}`} className={cx('account-info-nickname')}>
        {account.full_name}
      </Link>
      <p className={cx('stat-container')}>
        <span className={cx('stat-desc')}>{account.followers_count}</span>
        <span className={cx('stat-text')}>Followers</span>
        <span className={cx('stat-desc')}>{account.likes_count}</span>
        <span className={cx('stat-text')}>Likes</span>
      </p>
      {bio && <p className={cx('account-info-bio')}>{account.bio}</p>}
    </Wrapper>
  )
}

AccountInfoPopper.propTypes = {
  account: PropTypes.object.isRequired,
  id: PropTypes.string,
  bio: PropTypes.bool,
}

export default AccountInfoPopper
