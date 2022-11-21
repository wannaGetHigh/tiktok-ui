import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'

import styles from './SuggestedAccounts.module.scss'
import Image from '../Image'
import { Wrapper as PopperWrapper } from '../Popper'
import Button from '../Button'

const cx = classNames.bind(styles)

function AccountItem({ data }) {
  const renderPreview = (props) => (
    <div tabIndex="-1" {...props}>
      <PopperWrapper>
        <div className={cx('preview')}>
          <header className={cx('header')}>
            <Image className={cx('avatar')} src={data?.avatar} alt={data?.nickname} />
            <Button className={cx('follow-btn')} primary>
              Follow
            </Button>
          </header>

          <div className={cx('body')}>
            <p className={cx('nickname')}>
              <strong>{data?.nickname}</strong>
              {data?.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
            </p>
            <p className={cx('name')}>{data?.first_name + ' ' + data?.last_name}</p>
            <p className={cx('static')}>
              <strong>{data?.followers_count}</strong>
              &nbsp;
              <span className={cx('static-label')}>{data?.followers_count ? 'Followers' : 'Follower'}</span>
              &nbsp;
              <strong>{data?.likes_count}</strong>
              &nbsp;
              <span className={cx('static-label')}>{data?.likes_count > 1 ? 'Likes' : 'Like'}</span>
            </p>
          </div>
        </div>
      </PopperWrapper>
    </div>
  )

  return (
    <div>
      <Tippy offset={[-12, 0]} interactive placement="bottom" delay={[800, 0]} render={renderPreview}>
        <div className={cx('account-item')}>
          <Image className={cx('avatar')} src={data?.avatar} alt={data?.nickname || data?.first_name} />
          <div className={cx('item-info')}>
            <p className={cx('nickname')}>
              <strong>{data?.nickname}</strong>
              {data?.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
            </p>
            <p className={cx('name')}>{data?.first_name + ' ' + data?.last_name}</p>
          </div>
        </div>
      </Tippy>
    </div>
  )
}

AccountItem.propsType = {
  data: PropTypes.object.isRequired,
}

export default AccountItem
