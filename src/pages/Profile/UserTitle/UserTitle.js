import { useContext } from 'react'
import classNames from 'classnames/bind'
import styles from './UserTitle.module.scss'
import Tippy from '@tippyjs/react'

import Image from '~/components/Image'
import Button from '~/components/Button'
import { CheckCircle, UserFollowed } from '~/components/Icons'
import toggleFollow from '~/services/toggleFollow'
import { AuthContext } from '~/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useAvatarImage } from '~/hooks'

const cx = classNames.bind(styles)

const UserTitle = ({ account, id }) => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const avatarSrc = useAvatarImage(id)

  // Find master followed other user list
  const isFollowed = currentUser?.followedUserList?.includes(id)

  return (
    <div className={cx('user-container')}>
      <Image src={avatarSrc} alt={account.nickname} className={cx('user-avatar')} />

      <div className={cx('user-info')}>
        <h2 className={cx('user-title')}>
          {account.nickname}
          {account.tick && <CheckCircle className={cx('check')} />}
        </h2>
        <h1 className={cx('user-subtitle')}>{account.full_name}</h1>
        {isFollowed ? (
          <div className={cx('followed-container')}>
            <Button primary outline large className={cx('button')}>
              Message
            </Button>
            <Tippy content="Unfollow" placement="bottom">
              <div
                className={cx('followed-icon')}
                onClick={() => {
                  toggleFollow(currentUser, id, false)
                }}
              >
                <UserFollowed />
              </div>
            </Tippy>
          </div>
        ) : (
          <Button
            primary
            large
            className={cx('button')}
            onClick={() => {
              if (currentUser) {
                toggleFollow(currentUser, id, true)
              } else {
                navigate('/login')
              }
            }}
          >
            Follow
          </Button>
        )}
      </div>
    </div>
  )
}
export default UserTitle
