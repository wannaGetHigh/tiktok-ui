import classNames from 'classnames/bind'
import { useState } from 'react'
import styles from './Main.module.scss'
import { LockIcon, LockIconSolid, UserIcon } from '~/components/Icons'

const cx = classNames.bind(styles)

const Main = ({ username }) => {
  const [active, setActive] = useState('videos')
  const isPrivate = true

  const handleClick = (tab) => {
    setActive(tab)
  }

  return (
    <>
      <div className={cx('main-tab')}>
        <p onClick={handleClick.bind(this, 'videos')} className={cx('tab-item', { active: active === 'videos' })}>
          Videos
        </p>
        <p onClick={handleClick.bind(this, 'liked')} className={cx('tab-item', { active: active === 'liked' })}>
          {isPrivate && <LockIconSolid className={cx('private')} />}
          Liked
        </p>
      </div>
      <div className={cx('main-videos')}>
        <div className={cx('placeholder')}>
          {active === 'videos' ? (
            <>
              <UserIcon width="90" height="90" />
              <p style={{ marginTop: 12 }}>No content</p>
              <p>This user has not published any videos.</p>
            </>
          ) : (
            <>
              <LockIcon width="90" height="90" />
              <p>This user's liked videos are private</p>
              <p>Videos liked by {username} are currently hidden</p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
export default Main
