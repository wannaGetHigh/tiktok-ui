import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisVertical,
  faCircleQuestion,
  faKeyboard,
  faEarthAsia,
  faPlus,
  faUser,
  faCoins,
  faGear,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons'
import 'tippy.js/dist/tippy.css'

import images from '~/assets/images'
import styles from './Header.module.scss'
import Button from '~/components/Button'
import Menu from '~/components/Popper/Menu'
import { Link } from 'react-router-dom'
import { InboxIcon, MessageIcon } from '~/components/Icons'
import Image from '~/components/Image'
import Search from '../Search'

const cx = classNames.bind(styles)

const Header = () => {
  const currentUser = true

  const MENU_ITEMS = [
    {
      icon: <FontAwesomeIcon icon={faEarthAsia} />,
      title: 'English',
      children: {
        title: 'Language',
        data: [
          {
            code: 'en',
            title: 'English',
          },
          {
            code: 'es',
            title: 'Español',
          },
          {
            code: 'vi',
            title: 'Tiếng Việt',
          },
        ],
      },
    },
    {
      icon: <FontAwesomeIcon icon={faCircleQuestion} />,
      title: 'Feedback and help',
      to: '/feedback',
    },
    {
      icon: <FontAwesomeIcon icon={faKeyboard} />,
      title: 'Keyboard shortcuts',
    },
  ]

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/user',
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      to: '/logout',
      separate: true,
    },
  ]

  function handleMenuChange(menuItem) {
    console.log(menuItem)
  }

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to="/">
          <Image src={images.logo} alt="Tiktok" />
        </Link>

        <Search />

        <div className={cx('actions')}>
          <Link to="/upload">
            <Button outline leftIcon={<FontAwesomeIcon icon={faPlus} to="/upload" />}>
              Upload
            </Button>
          </Link>
          {currentUser ? (
            <>
              <Tippy content="Message" placement="bottom">
                <button className={cx('action-btn')}>
                  <MessageIcon width="2.6rem" height="2.6rem" />
                </button>
              </Tippy>
              <Tippy content="Inbox" placement="bottom">
                <button className={cx('action-btn')}>
                  <InboxIcon />
                  <span className={cx('badge')}>12</span>
                </button>
              </Tippy>
            </>
          ) : (
            <Button primary>Log in</Button>
          )}
          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <Image
                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/1674599926121478~c5_100x100.jpeg?x-expires=1654506000&x-signature=sMhzRM5i3mNoTuxhmJimgtTdIoM%3D"
                className={cx('user-avatar')}
                alt="Nguyen Van A"
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  )
}
export default Header
