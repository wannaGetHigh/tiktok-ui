import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Discover.module.scss'
import { HashtagIcon, MusicNoteIcon } from '~/components/Icons'
// fakeApi
import { discover } from '~/assets/fakeApi'

const cx = classNames.bind(styles)

const Discover = () => {
  const [discoverApi, setDiscoverdApi] = useState([])

  const convertMusic = (text) => {
    return text.split('-')[0].split(' ').join('-')
  }

  useEffect(() => {
    const fetchApi = () => {
      setDiscoverdApi(discover)
    }

    fetchApi()
  }, [])

  return (
    <div className={cx('discover-container')}>
      <p className={cx('discover-title')}>Discover</p>
      <div className={cx('discover-list')}>
        {discoverApi.map((item) => (
          <a
            href={
              item.type === 'hashtag'
                ? `https://www.tiktok.com/tag/${item.text}`
                : `https://www.tiktok.com/music/${convertMusic(item.text)}`
            }
            key={item.id}
          >
            <div className={cx('discover-item')}>
              {item.type === 'hashtag' ? <HashtagIcon /> : <MusicNoteIcon />}
              <p className={cx('discover-text')}>{item.text}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Discover
