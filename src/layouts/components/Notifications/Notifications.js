import { useState } from 'react'
import PropTypes from 'prop-types'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './Notifications.module.scss'
import { Wrapper } from '~/components/Popper'
import { HeartIcon, InboxIcon, CommentIcon, MentionIcon, FollowerIcon } from '~/components/Icons'

const cx = classNames.bind(styles)

const Notifications = ({ attrs }) => {
  const [tab, setTab] = useState('all')
  const [loading, setLoading] = useState(false)

  const notiApi = [
    {
      type: 'all',
      icon: 'inbox',
      title: 'All activity',
      desc: 'Notifications about your account will appear here.',
    },
    {
      type: 'likes',
      icon: 'heart',
      title: 'Likes on your videos',
      desc: "When someone likes one of your videos, you'll see it here",
    },
    {
      type: 'comments',
      icon: 'comments',
      title: 'Comments on your videos',
      desc: "When someone comments on one of your videos, you'll see it here",
    },
    {
      type: 'mention',
      icon: 'mention',
      title: 'Mentions of You',
      desc: "When someone mentions you, you'll see it here",
    },
    {
      type: 'follower',
      icon: 'follower',
      title: 'New followers',
      desc: "When someone new follows you, you'll see it here",
    },
  ]

  const notiErrorBody = notiApi.filter((noti) => noti.type === tab)[0]
  const notiErrorIcon =
    notiErrorBody.icon === 'inbox' ? (
      <InboxIcon width="70" height="70" />
    ) : notiErrorBody.icon === 'heart' ? (
      <HeartIcon />
    ) : notiErrorBody.icon === 'comments' ? (
      <CommentIcon />
    ) : notiErrorBody.icon === 'mention' ? (
      <MentionIcon />
    ) : (
      <FollowerIcon />
    )

  const handleClick = (navTab) => {
    setLoading(true)
    setTab(navTab)
    setLoading(false)
  }

  function caplockFirstLetter(str) {
    if (typeof str === 'string') {
      return str[0].toUpperCase() + str.slice(1)
    }
  }

  return (
    <Wrapper className={cx('noti-wrapper')} {...attrs}>
      <div className={cx('noti-container')}>
        <div className={cx('noti-nav')}>
          <h4 className={cx('noti-header')}>Notifications</h4>
          <div className={cx('noti-nav-list')}>
            {notiApi.map((noti) => (
              <span
                key={noti.type}
                className={cx('noti-nav-item', { active: tab === noti.type })}
                onClick={handleClick.bind(this, noti.type)}
              >
                {/* Uppercase the first letter */}
                {caplockFirstLetter(noti.type)}
              </span>
            ))}
          </div>
        </div>
        <div className={cx('noti-outlet')}>
          {loading ? (
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
          ) : (
            <div className={cx('noti-empty')}>
              {notiErrorIcon}
              <p className={cx('error-title')}>{notiErrorBody.title}</p>
              <p className={cx('error-desc')}>{notiErrorBody.desc}</p>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

Notifications.propsTypes = {
  attrs: PropTypes.object,
}

export default Notifications
