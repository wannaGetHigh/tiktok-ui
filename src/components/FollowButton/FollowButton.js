import { useContext } from 'react'
import toggleFollow from '~/services/toggleFollow'
import Button from '~/components/Button'
import { AuthContext } from '~/context/AuthContext'
import PropTypes from 'prop-types'

const FollowButton = ({ id, className }) => {
  const { currentUser } = useContext(AuthContext)
  const isFollowed = currentUser?.followedUserList?.includes(id)

  if (!currentUser) return null

  return isFollowed ? (
    <Button className={className} outline onClick={() => toggleFollow(currentUser, id, false)}>
      Following
    </Button>
  ) : (
    <Button className={className} primary onClick={() => toggleFollow(currentUser, id, true)}>
      Follow
    </Button>
  )
}

FollowButton.propTypes = {
  isFollowed: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
}

export default FollowButton
