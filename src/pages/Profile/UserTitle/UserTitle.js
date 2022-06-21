import classNames from 'classnames/bind'
import styles from './UserTitle.module.scss'
import Tippy from '@tippyjs/react'

import Image from '~/components/Image'
import Button from '~/components/Button'
import { CheckCircle, UserFollowed } from '~/components/Icons'
import toggleFollow from '~/utils/toggleFollow'
// import { useReducer } from 'react'

const cx = classNames.bind(styles)

const Header = ({ account, id }) => {
  // const [, forceUpdate] = useReducer((x) => x + 1, 0)

  console.log('render', account.isFollowed)

  return (
    <div className={cx('user-container')}>
      <Image src={account.avatar} alt={account.nickname} className={cx('user-avatar')} />

      <div className={cx('user-info')}>
        <h2 className={cx('user-title')}>
          {account.nickname}
          {account.tick && <CheckCircle className={cx('check')} />}
        </h2>
        <h1 className={cx('user-subtitle')}>{account.full_name}</h1>
        {account.isFollowed ? (
          <div className={cx('followed-container')}>
            <Button primary outline large className={cx('button')}>
              Message
            </Button>
            <Tippy content="Unfollow" placement="bottom">
              <div
                className={cx('followed-icon')}
                onClick={() => {
                  toggleFollow(id, false)
                  // forceUpdate()
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
              toggleFollow(id, true)
              // forceUpdate()
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
