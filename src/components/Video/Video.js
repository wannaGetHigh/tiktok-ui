import { forwardRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Video.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faVolumeMute, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

const Video = forwardRef(({ src }, ref) => {
  const [play, setPlay] = useState()
  const [mute, setMute] = useState(false)
  const [volume, setVolume] = useState(0.5)

  const video = ref?.current

  function handlePlayVideo() {
    setPlay(true)
    video.play()
  }

  function handlePauseVideo() {
    setPlay(false)
    video.pause()
  }

  function handleMute() {
    setMute((prev) => !prev)
    if (video.muted) {
      setVolume(0.5)
      video.muted = false
    } else {
      setVolume(0)
      video.muted = true
    }
  }

  if (video) {
    video.volume = volume
  }

  return (
    <div className={cx('card')}>
      <video
        ref={ref}
        src={src}
        playsInline
        loop
        onError={() => console.log('video error')}
        onPlay={() => setPlay(true)}
        onPause={() => setPlay(false)}
        className={cx('player')}
      ></video>
      <div className={cx('play-btn')}>
        {play && video?.played ? (
          <FontAwesomeIcon icon={faPause} onClick={handlePauseVideo} />
        ) : (
          <FontAwesomeIcon icon={faPlay} onClick={handlePlayVideo} />
        )}
      </div>
      <div className={cx('volume-control')}>
        <div className={cx('volume-btn')} onClick={handleMute}>
          {video?.volume === 0 || mute ? (
            <FontAwesomeIcon icon={faVolumeMute} />
          ) : (
            <FontAwesomeIcon icon={faVolumeHigh} />
          )}
        </div>
        <div className={cx('volume-slider')}>
          <input type="range" max="1" min="0" step="0.01" value={volume} onChange={(e) => setVolume(e.target.value)} />
        </div>
      </div>
    </div>
  )
})
export default Video
