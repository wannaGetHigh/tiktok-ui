import toggleFollow from '~/utils/toggleFollow'
import Button from '~/components/Button'

const FollowButton = ({ isFollowed, id, className }) => {
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
