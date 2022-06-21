import { useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faClose, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import TippyHeadless from '@tippyjs/react/headless'
// import Video from '../Video'
import Tippy from '@tippyjs/react'

import Image from '../Image'
import styles from './Modal.module.scss'
import {
  BrowseLogo,
  FlagIcon,
  MusicNoteIcon,
  HeartIconSolid,
  CommentIconSolid,
  TagIcon,
  EmojiIcon,
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
  ShareIconSolid,
} from '../Icons'
import Button from '../Button'
import AccountInfoPopper from '../AccountInfoPopper'
import ReactIcon from '../ReactIcon'

const cx = classNames.bind(styles)

const Modal = ({ post }) => {
  const [input, setInput] = useState('')
  const videoRef = useRef(null)

  const classes = cx('comment-submit', {
    'text-primary': input,
  })

  function handlePlay() {
    videoRef.current.play()
  }

  return (
    <div className={cx('modal-container')}>
      <div className={cx('video-container')}>
        <div className={cx('video-player')}>
          <video src={post.video_url} ref={videoRef} onClick={handlePlay} />
        </div>
        <button className={cx('video-btn', 'close-video')}>
          <FontAwesomeIcon icon={faClose} className={cx('close-video')} />
        </button>
        <BrowseLogo className={cx('browse-logo')} />
        <button className={cx('video-btn', 'prev-video')}>
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
        <button className={cx('video-btn', 'next-video')}>
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        <div className={cx('video-report')}>
          <FlagIcon />
          Report
        </div>
      </div>
      <div className={cx('content-container')}>
        <div className={cx('content-info')}>
          <Link to={`/@${post.video_owner.nickname}`} className={cx('author-avatar')}>
            <Image src={post.video_owner.avatar} alt={post.video_owner.nickname} />
          </Link>

          <TippyHeadless
            delay={[400, 0]}
            interactive
            render={() => <AccountInfoPopper account={post.video_owner} bio />}
          >
            <Link to={`/@${post.video_owner.nickname}`} className={cx('author-name')}>
              <span className={cx('author-nickname')}>{post.video_owner.nickname}</span>
              <br />
              <span className={cx('author-fullname')}>
                {post.video_owner.full_name}
                <span style={{ margin: '0px 4px' }}> · </span>
                <span>{post.createdAt}</span>
              </span>
            </Link>
          </TippyHeadless>
          <Button outline primary>
            Follow
          </Button>
        </div>
        <div className={cx('content-main')}>
          <div className={cx('content-desc')}>{post.video_content}</div>
          <h4 className={cx('content-music')}>
            <Link to="">
              <MusicNoteIcon className={cx('music-icon')} />
              {post.video_music}
            </Link>
          </h4>

          <div className={cx('content-wrapper')}>
            <div className={cx('content-action')}>
              <div className={cx('action-react')}>
                <ReactIcon Icon={HeartIconSolid} small row>
                  {post.likes}
                </ReactIcon>

                <ReactIcon Icon={CommentIconSolid} small row>
                  {post.comments}
                </ReactIcon>
              </div>

              <div className={cx('action-share')}>
                <Link to="" className={cx('share-link')}>
                  <EmbededIcon />
                </Link>
                <Link to="" className={cx('share-link')}>
                  <ShareLinkIcon />
                </Link>
                <Link to="" className={cx('share-link')}>
                  <FacebookIcon />
                </Link>
                <Link to="" className={cx('share-link')}>
                  <WhatsAppIcon />
                </Link>
                <Link to="" className={cx('share-link')}>
                  <TwitterIcon />
                </Link>

                <ShareIconSolid />
              </div>
            </div>

            <div className={cx('copy-link')}>
              <p className={cx('copy-text')}>{window.location.href}</p>
              <Button text small>
                Copy
              </Button>
            </div>
          </div>
        </div>
        <div className={cx('list-comment')}></div>
        <div className={cx('bottom-comment')}>
          <div className={cx('comment-input')}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add comment..." />

            <Tippy content='"@" a user to tag them in your comments' interactive>
              <div className={cx('comment-tag')}>
                <TagIcon />
              </div>
            </Tippy>

            <Tippy content="Click to add emojis" interactive>
              <div className={cx('comment-tag')}>
                <EmojiIcon />
              </div>
            </Tippy>
          </div>
          <button className={classes} type="submit">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
export default Modal
