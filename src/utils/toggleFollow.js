import { doc, updateDoc } from 'firebase/firestore'
import { db } from '~/firebase'

const toggleFollow = (id, bool) => {
  const profileRef = doc(db, 'users', id)

  // Set the "isFollowed" field of the user
  updateDoc(profileRef, {
    isFollowed: bool,
  })
}

export default toggleFollow
