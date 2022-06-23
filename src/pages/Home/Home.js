import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import Post from '~/components/Post'
import styles from './Home.module.scss'
// import Modal from '~/components/Modal'
import { db } from '~/firebase'

const cx = classNames.bind(styles)

const Home = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'))
        setVideos(querySnapshot.docs)
      } catch (error) {
        console.error(error)
      }
    }

    fetchVideo()
  }, [])

  return (
    <main className={cx('main-content')}>
      <div>
        {videos.map((video) => (
          <Post key={video.id} post={video.data()} />
        ))}
      </div>
      {/* <Modal /> */}
    </main>
  )
}
export default Home
