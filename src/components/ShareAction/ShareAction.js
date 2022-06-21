import classNames from 'classnames/bind'
import { Wrapper } from '../Popper'
import styles from './ShareAction.module.scss'
import PropTypes from 'prop-types'
import {
  EmbededIcon,
  ShareLinkIcon,
  FacebookIcon,
  WhatsAppIcon,
  CopyLinkIcon,
  TwitterIcon,
  LinkedInIcon,
  RedditIcon,
  TelegramIcon,
  MailIcon,
  LineIcon,
  PinterestIcon,
} from '~/components/Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

const ShareAction = ({ showAll, setShowAll }) => {
  const shareActionList = [
    {
      icon: EmbededIcon,
      text: 'Embeded',
    },
    {
      icon: ShareLinkIcon,
      text: 'Send to friends',
    },
    {
      icon: FacebookIcon,
      text: 'Share to Facebook',
    },
    {
      icon: WhatsAppIcon,
      text: 'Share to WhatsApp',
    },
    {
      icon: CopyLinkIcon,
      text: 'Copy link',
    },
    {
      icon: TwitterIcon,
      text: 'Share to Twitter',
    },
    {
      icon: LinkedInIcon,
      text: 'Share to LinkedIn',
    },
    {
      icon: RedditIcon,
      text: 'Share to Reddit',
    },
    {
      icon: TelegramIcon,
      text: 'Share to Telegram',
    },
    {
      icon: MailIcon,
      text: 'Share to Mail',
    },
    {
      icon: LineIcon,
      text: 'Share to Line',
    },
    {
      icon: PinterestIcon,
      text: 'Share to Pinterest',
    },
  ]

  const showListAction = showAll ? shareActionList : shareActionList.slice(0, 4)

  const handleShowAll = () => {
    setShowAll((showAll) => !showAll)
  }

  return (
    <Wrapper className={cx('share-list')}>
      {showListAction.map((action, index) => {
        if (showAll && index === 5) return null
        return (
          <div className={cx('share-item')} key={index}>
            <action.icon />
            <span className={cx('share-desc')}>{action.text}</span>
          </div>
        )
      })}
      {!showAll && (
        <div className={cx('show-more-action')} onClick={handleShowAll}>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      )}
    </Wrapper>
  )
}

ShareAction.propsType = {
  showAll: PropTypes.bool,
  setShowAll: PropTypes.func,
}

export default ShareAction
