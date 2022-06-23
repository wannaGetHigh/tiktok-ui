import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import classNames from 'classnames/bind'
import styles from './Discover.module.scss'
import { HashtagIcon, MusicNoteIcon } from '~/components/Icons'
import { db } from '~/firebase'

const cx = classNames.bind(styles)

const Discover = () => {
  const [discoverApi, setDiscoverdApi] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const discoverSnap = await getDocs(collection(db, 'discovers'))
      setDiscoverdApi(discoverSnap.docs)
    }

    fetchApi()
  }, [])

  return (
    <div className={cx('discover-container')}>
      <p className={cx('discover-title')}>Discover</p>
      <div className={cx('discover-list')}>
        {discoverApi.map((item) => {
          const data = item.data()
          return (
            <a
              href={
                data.type === 'hashtag'
                  ? `https://www.tiktok.com/tag/${data.content}`
                  : `https://www.tiktok.com/music/${data.content}`
              }
              key={item.id}
            >
              <div className={cx('discover-item')}>
                {data.type === 'hashtag' ? <HashtagIcon /> : <MusicNoteIcon />}
                <p className={cx('discover-text')}>{data.content}</p>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Discover
