import { doc, updateDoc } from 'firebase/firestore'
import { db } from '~/firebase'

const toggleLike = (currentUser, videoId, bool) => {
  const masterRef = doc(db, 'masters', currentUser.uid)

  // Set the "isFollowed" field of the user
  if (bool) {
    updateDoc(masterRef, {
      likedPostList: [...currentUser.likedPostList, videoId],
    })
  } else {
    updateDoc(masterRef, {
      likedPostList: currentUser.likedPostList.filter((item) => item !== videoId),
    })
  }
}

export default toggleLike
