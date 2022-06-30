import { collection, getDocs, query, where } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import Post from '~/components/Post'
import styles from './Following.module.scss'
import Loader from '~/components/Loader'
// import Modal from '~/components/Modal'
import { db } from '~/firebase'
import { AuthContext } from '~/context/AuthContext'
import { Link } from 'react-router-dom'
import ScrollToTopBtn from '~/components/ScrollToTopBtn'

const cx = classNames.bind(styles)

const Following = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true)

        const q = query(collection(db, 'users'), where('isFollowed', '==', true))
        const followedUserSnap = await getDocs(q)
        followedUserSnap.forEach(async (doc) => {
          if (doc.data().video_own) {
            const videoQuery = query(collection(db, 'videos'), where('video_owner.nickname', '==', doc.data().nickname))
            const videoSnap = await getDocs(videoQuery)
            setVideos((prev) => [...prev, ...videoSnap.docs])
          }
        })

        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchVideo()
  }, [])

  return currentUser ? (
    <main className={cx('main-content')}>
      {loading && <Loader />}
      <div>
        {videos.map((video) => (
          <Post key={video.id} post={video.data()} />
        ))}
      </div>
      {videos.length > 0 && <ScrollToTopBtn />}
      {!loading && videos.length === 0 && <h2>Please follow other accounts to see their videos</h2>}
      {/* <Modal /> */}
    </main>
  ) : (
    <main className={cx('main-content')}>
      <h2>
        Please <Link to="/login">log in</Link> see other videos
      </h2>
    </main>
  )
}
export default Following
