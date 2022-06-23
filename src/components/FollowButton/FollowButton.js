import { useContext } from 'react'
import toggleFollow from '~/utils/toggleFollow'
import Button from '~/components/Button'
import { CurrentUserContext } from '~/App'

const FollowButton = ({ isFollowed, id, className }) => {
  const { currentUser } = useContext(CurrentUserContext)

  if (!currentUser) return null

  return isFollowed ? (
    <Button className={className} outline onClick={() => toggleFollow(id, false)}>
      Following
    </Button>
  ) : (
    <Button className={className} primary onClick={() => toggleFollow(id, true)}>
      Follow
    </Button>
  )
}
export default FollowButton
