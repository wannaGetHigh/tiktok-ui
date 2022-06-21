import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import Post from '~/components/Post'
import styles from './Home.module.scss'
// import { apiPost } from '~/assets/fakeApi'
// import Modal from '~/components/Modal'
import db from '~/firebase'

const cx = classNames.bind(styles)

const Home = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideo = async () => {
      const querySnapshot = await getDocs(collection(db, 'videos'))
      setVideos(querySnapshot.docs)
    }

    fetchVideo()
  }, [])

  return (
    <main className={cx('main-content')}>
      <div className={cx('content')}>
        {videos.map((video) => (
          <Post key={video.id} post={video.data()} />
        ))}
      </div>
      {/* <Modal post={apiPost[0]} /> */}
    </main>
  )
}
export default Home
