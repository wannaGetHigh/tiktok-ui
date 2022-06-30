import { doc, updateDoc } from 'firebase/firestore'
import { db } from '~/firebase'

const toggleFollow = (currentUser, followUserId, bool) => {
  const masterRef = doc(db, 'masters', currentUser.uid)

  // Set the "isFollowed" field of the user
  if (bool) {
    updateDoc(masterRef, {
      followedUserList: [...currentUser.followedUserList, followUserId],
    })
  } else {
    updateDoc(masterRef, {
      followedUserList: currentUser.followedUserList.filter((item) => item !== followUserId),
    })
  }
}

export default toggleFollow
