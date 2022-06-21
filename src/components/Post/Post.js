import { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import TippyHeadless from '@tippyjs/react/headless'
import styles from './Post.module.scss'
import PropTypes from 'prop-types'

import Image from '../Image'
import { MusicNoteIcon } from '../Icons'
import { CommentIconSolid, HeartIconSolid, ShareIconSolid } from '../Icons'
import AccountInfoPopper from '../AccountInfoPopper'
import { usePlayVideoOnScreen } from '~/hooks'
import Menu from './Menu'
import Video from '~/components/Video'
import ReactIcon from '../ReactIcon'
import db from '~/firebase'
import FollowButton from '../FollowButton'

const cx = classNames.bind(styles)

const Post = ({ post }) => {
  const [author, setAuthor] = useState({})
  const [idAuthor, setIdAuthor] = useState(null)
  const [containRef, isVisible] = usePlayVideoOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
  })

  // Play video when visible
  if (containRef.current) {
    if (isVisible) {
      containRef.current.play()
    } else {
      containRef.current.pause()
    }
  }

  useEffect(() => {
    const fetchAuthor = async () => {
      const q = query(collection(db, 'users'), where('nickname', '==', post.video_owner.nickname))

      const querySnapshot = await getDocs(q)
      setAuthor(querySnapshot.docs[0].data())
      setIdAuthor(querySnapshot.docs[0].id)
    }

    fetchAuthor()
    // eslint-disable-next-line
  }, [])

  return (
    <div className={cx('post-container')}>
      <Link to={`/@${author.nickname}`} className={cx('author-avatar')}>
        <Image src={author.avatar} alt={author.nickname} />
      </Link>
      <div className={cx('post-body')}>
        <div className={cx('post-info')}>
          <TippyHeadless
            delay={[400, 0]}
            interactive
            render={() => <AccountInfoPopper account={author} id={idAuthor} bio />}
          >
            <Link to={`/@${author.nickname}`}>
              <h3 className={cx('author-nickname')}>{author.nickname}</h3>
              <h4 className={cx('author-fullname')}>{author.full_name}</h4>
            </Link>
          </TippyHeadless>
          <div className="post-content">
            <p>{post.video_content}</p>
          </div>
          <h4 className={cx('video-music')}>
            <Link to="">
              <MusicNoteIcon />
              {post.video_music}
            </Link>
          </h4>

          <FollowButton isFollowed={author.isFollowed} id={idAuthor} className={cx('follow-author')} />
        </div>

        <div className={cx('post-video')}>
          <Video ref={containRef} src={post.video_url} />

          <div className={cx('action-btn')}>
            <ReactIcon liked Icon={HeartIconSolid}>
              {post.likes}
            </ReactIcon>
            <ReactIcon Icon={CommentIconSolid}>{post.comments}</ReactIcon>
            <Menu>
              <ReactIcon Icon={ShareIconSolid}>{post.shares}</ReactIcon>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object,
}

export default Post
