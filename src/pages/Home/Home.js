import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import Post from '~/components/Post'
import styles from './Home.module.scss'
// import Modal from '~/components/Modal'
import { db } from '~/firebase'
import ScrollToTopBtn from '~/components/ScrollToTopBtn'
import Loader from '~/components/Loader'

const cx = classNames.bind(styles)

const Home = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true)

        const querySnapshot = await getDocs(collection(db, 'videos'))
        setVideos(querySnapshot.docs)

        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchVideo()
  }, [])

  return (
    <main className={cx('main-content')}>
      {loading && <Loader />}
      <div>
        {videos.map((video) => (
          <Post key={video.id} post={video.data()} />
        ))}
      </div>
      <ScrollToTopBtn />
      {/* <Modal /> */}
    </main>
  )
}
export default Home
