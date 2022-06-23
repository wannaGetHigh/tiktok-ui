import { useEffect, useState, useContext } from 'react'
import classNames from 'classnames/bind'
import styles from './FollowingAccount.module.scss'
import { Link } from 'react-router-dom'
import 'tippy.js/dist/tippy.css'
import { db } from '~/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import AccountItem from '~/components/AccountItem'
import { CurrentUserContext } from '~/App'
import Button from '~/components/Button'
import config from '~/config'

const cx = classNames.bind(styles)

const FollowingAccount = ({ options }) => {
  const [followingList, setFollowingList] = useState([])
  const [suggestBtnText, setSuggestBtnText] = useState('See more')
  const { currentUser } = useContext(CurrentUserContext)

  const handleSeeMore = () => {
    if (suggestBtnText === 'See more') {
      setSuggestBtnText('See less')
    } else {
      setSuggestBtnText('See more')
    }
  }

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const q = query(collection(db, 'users'), where('isFollowed', '==', true))

        const querySnapshot = await getDocs(q)
        setFollowingList(querySnapshot.docs)
      } catch (error) {
        console.log(error)
      }
    }

    fetchApi()
  }, [])

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
            {followingList.map((account) => (
              <div key={account.id}>
                <AccountItem data={account.data()} options={options} />
              </div>
            ))}
          </div>
          <div className={cx('suggest-btn')}>
            <p className={cx('see-more')} onClick={handleSeeMore}>
              {suggestBtnText}
            </p>
          </div>
        </>
      ) : (
        <p className={cx('follow-empty-hint')}>Accounts you follow will appear here</p>
      )}
    </div>
  )
}
export default FollowingAccount
