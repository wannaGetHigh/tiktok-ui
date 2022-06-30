import { useContext } from 'react'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react'
import TippyHeadless from '@tippyjs/react/headless'
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
import config from '~/config'
import Notifications from '../Notifications'
import { AuthContext } from '~/context/AuthContext'
import PropTypes from 'prop-types'

const cx = classNames.bind(styles)

const Header = ({ full = false }) => {
  const { currentUser, handleLogout } = useContext(AuthContext)

  const MENU_ITEMS = [
    {
      icon: <FontAwesomeIcon icon={faEarthAsia} />,
      title: 'Language',
      children: {
        title: 'Language',
        data: [
          {
            code: 'en',
            title: 'English',
          },
          {
            code: 'ar',
            title: 'العربية',
          },
          {
            code: 'cs',
            title: 'Čeština (Česká republika)',
          },
          {
            code: 'de',
            title: 'Deutsch',
          },
          {
            code: 'es',
            title: 'Español',
          },
          {
            code: 'fi',
            title: 'Suomi (Suomi)',
          },
          {
            code: 'fil',
            title: 'Filipino (Pilipinas)',
          },
          {
            code: 'it',
            title: 'Italiano (Italia)',
          },
          {
            code: 'jp',
            title: '日本語（日本）',
          },
          {
            code: 'ko',
            title: '한국어 (대한민국)',
          },
          {
            code: 'jv-ID',
            title: 'Basa Jawa (Indonesia)',
          },
          {
            code: 'pl',
            title: 'Polski (Polska)',
          },
          {
            code: 'pt',
            title: 'Português (Brasil)',
          },
          {
            code: 'ro',
            title: 'Română (Romania)',
          },
          {
            code: 'vi',
            title: 'Tiếng Việt',
          },
          {
            code: 'zh-Hans',
            title: '简体中文',
          },
          {
            code: 'zh-Hans-TW',
            title: '繁體中文',
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
      to: config.routes.user,
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
      onClick: handleLogout,
      separate: true,
    },
  ]

  function handleMenuChange(menuItem) {
    if (menuItem) {
      menuItem()
    }
  }

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner', { full })}>
        <Link to={config.routes.home} className={cx('logo-link')}>
          <Image src={images.logo} alt="Tiktok" />
        </Link>

        <Search />

        <div className={cx('actions')}>
          <Link to={config.routes.upload}>
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
                <TippyHeadless
                  trigger="click"
                  offset={[-28, 8]}
                  render={(attrs) => <Notifications attrs={attrs} />}
                  interactive
                  zIndex={10000}
                >
                  <button className={cx('action-btn')}>
                    <InboxIcon />
                    <span className={cx('badge')}>12</span>
                  </button>
                </TippyHeadless>
              </Tippy>
            </>
          ) : (
            <Link to={config.routes.login}>
              <Button primary className={cx('login-btn')}>
                Log in
              </Button>
            </Link>
          )}
          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <Image src={currentUser.avatar} className={cx('user-avatar')} alt={currentUser.name} />
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

Header.propTypes = {
  full: PropTypes.bool,
}

export default Header
