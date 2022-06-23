import { useContext } from 'react'
import classNames from 'classnames/bind'
import styles from './UserTitle.module.scss'
import Tippy from '@tippyjs/react'

import Image from '~/components/Image'
import Button from '~/components/Button'
import { CheckCircle, UserFollowed } from '~/components/Icons'
import toggleFollow from '~/utils/toggleFollow'
import { CurrentUserContext } from '~/App'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

const Header = ({ account, id }) => {
  const { currentUser } = useContext(CurrentUserContext)
  const navigate = useNavigate()

  return (
    <div className={cx('user-container')}>
      <Image src={account.avatar} alt={account.nickname} className={cx('user-avatar')} />

      <div className={cx('user-info')}>
        <h2 className={cx('user-title')}>
          {account.nickname}
          {account.tick && <CheckCircle className={cx('check')} />}
        </h2>
        <h1 className={cx('user-subtitle')}>{account.full_name}</h1>
        {account.isFollowed && currentUser ? (
          <div className={cx('followed-container')}>
            <Button primary outline large className={cx('button')}>
              Message
            </Button>
            <Tippy content="Unfollow" placement="bottom">
              <div
                className={cx('followed-icon')}
                onClick={() => {
                  toggleFollow(id, false)
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
                toggleFollow(id, true)
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
export default Header
