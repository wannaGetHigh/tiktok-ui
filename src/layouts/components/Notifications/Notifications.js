import { useState } from 'react'
import PropTypes from 'prop-types'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './Notifications.module.scss'
import { Wrapper } from '~/components/Popper'
import { HeartIcon, InboxIcon, CommentIcon, MentionIcon, FollowerIcon } from '~/components/Icons'
import { notiApi } from '~/assets/fakeApi'

const cx = classNames.bind(styles)

const Notifications = ({ attrs }) => {
  const [tab, setTab] = useState('all')
  const [loading, setLoading] = useState(false)
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
