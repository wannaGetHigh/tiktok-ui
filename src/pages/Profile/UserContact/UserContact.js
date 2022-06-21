import classNames from 'classnames/bind'
import styles from './UserContact.module.scss'
import { ChainIcon } from '~/components/Icons'

const cx = classNames.bind(styles)

const UserContact = ({ account }) => {
  const url = account.website_url
  return (
    <>
      <h2 className={cx('user-count')}>
        <div className={cx('count-container')}>
          <strong>{account.followings_count}</strong>
          <span className={cx('count-desc')}>Following</span>
        </div>
        <div className={cx('count-container')}>
          <strong>{account.followers_count}</strong>
          <span className={cx('count-desc')}>Followers</span>
        </div>
        <div className={cx('count-container')}>
          <strong>{account.likes_count}</strong>
          <span className={cx('count-desc')}>Likes</span>
        </div>
      </h2>
      <h2 className={cx('user-bio')}>{account.bio?.replace(/\\n/g, '\n')}</h2>
      <div className={cx('link-container')}>
        <a
          target="_blank"
          rel="noreferrer"
          href={url?.includes('https') ? url : `//${url}`}
          className={cx('user-link')}
        >
          <ChainIcon />
          <span className={cx('span-link')}>{url}</span>
        </a>
      </div>
    </>
  )
}
export default UserContact
