import React from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'

import styles from './SuggestedAccounts.module.scss'
import { Wrapper as PopperWrapper } from '../Popper'
import Button from '../Button'

const cx = classNames.bind(styles)

function AccountItem() {
  const renderPreview = (props) => (
    <div tabIndex="-1" {...props}>
      <PopperWrapper>
        <div className={cx('preview')}>
          <header className={cx('header')}>
            <img className={cx('avatar')} src="" alt="" />
            <Button className={cx('follow-btn')} primary>
              Follow
            </Button>
          </header>

          <div className={cx('body')}>
            <p className={cx('nickname')}>
              <strong>ABC</strong>
              <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
            </p>
            <p className={cx('name')}>ABC</p>
            <p className={cx('static')}>
              <strong>6.7 M</strong>
              &nbsp;
              <span className={cx('static-label')}>Followers</span>
              &nbsp;
              <strong>6.7 M</strong>
              &nbsp;
              <span className={cx('static-label')}>Likes</span>
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
          <img className={cx('avatar')} src="" alt="" />
          <div className={cx('item-info')}>
            <p className={cx('nickname')}>
              <strong>ABC</strong>
              <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
            </p>
            <p className={cx('name')}>ABC</p>
          </div>
        </div>
      </Tippy>
    </div>
  )
}

export default AccountItem
