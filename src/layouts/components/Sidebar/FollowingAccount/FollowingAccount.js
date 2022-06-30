import { useEffect, useState, useContext } from 'react'
import classNames from 'classnames/bind'
import styles from './FollowingAccount.module.scss'
import { Link } from 'react-router-dom'
import 'tippy.js/dist/tippy.css'
import { db } from '~/firebase'
import { doc, getDoc } from 'firebase/firestore'
import AccountItem from '~/components/AccountItem'
import { AuthContext } from '~/context/AuthContext'
import Button from '~/components/Button'
import config from '~/config'
import PropTypes from 'prop-types'

const cx = classNames.bind(styles)

const FollowingAccount = ({ options }) => {
  const [followingList, setFollowingList] = useState([])
  const [shortenList, setShortenList] = useState([])
  const [suggestBtnText, setSuggestBtnText] = useState('See more')
  const { currentUser } = useContext(AuthContext)
  const handleSeeMore = () => {
    if (suggestBtnText === 'See more') {
      setSuggestBtnText('See less')
      setShortenList(followingList)
    } else {
      setShortenList(followingList.slice(0, 5))
      setSuggestBtnText('See more')
    }
  }

  useEffect(() => {
    const fetchFollowingList = async () => {
      const followingList = []
      if (currentUser?.followedUserList?.length === 0) {
        setFollowingList([])
        return
      } else {
        currentUser?.followedUserList?.forEach(async (id) => {
          const userSnap = await getDoc(doc(db, 'users', id))
          if (userSnap.exists()) {
            followingList.push(userSnap.data())
            setFollowingList(followingList)
            setShortenList(followingList.slice(0, 5))
          }
        })
      }
    }

    fetchFollowingList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.followedUserList])

  if (!currentUser) {
    return (
      <div className={cx('following-wrapper')}>
        <p className={cx('following-title')}>Log in to follow creators, like videos, and view comments.</p>
        <Link to={config.routes.login}>
          <Button outline primary large style={{ width: '100%' }}>
            Log in
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className={cx('following-wrapper')}>
      <p className={cx('following-title')}>Following accounts</p>
      {followingList.length > 0 ? (
        <>
          <div className={cx('suggest-accounts')}>
            {shortenList.map((account) => (
              <div key={account.nickname}>
                <AccountItem data={account} options={options} />
              </div>
            ))}
          </div>
          {followingList.length > 5 ? (
            <div className={cx('suggest-btn')}>
              <p className={cx('see-more')} onClick={handleSeeMore}>
                {suggestBtnText}
              </p>
            </div>
          ) : null}
        </>
      ) : (
        <p className={cx('follow-empty-hint')}>Accounts you follow will appear here</p>
      )}
    </div>
  )
}

FollowingAccount.propTypes = {
  options: PropTypes.object,
}

export default FollowingAccount
