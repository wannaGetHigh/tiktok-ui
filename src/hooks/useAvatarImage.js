import { useState, useEffect } from 'react'
import { downloadImage } from '~/firebase'

function useAvatarImage(uid) {
  const [avatarSrc, setAvatarSrc] = useState()

  useEffect(() => {
    if (uid) {
      downloadImage(uid).then((url) => setAvatarSrc(url))
    }
  }, [uid])

  return avatarSrc
}

export default useAvatarImage
