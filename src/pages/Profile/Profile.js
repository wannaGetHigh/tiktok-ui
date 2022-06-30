import { useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Profile.module.scss'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '~/firebase'

import ShareAction, { MoreAction } from './ShareAction'
import UserTitle from './UserTitle'
import UserContact from './UserContact'
import Main from './Main'
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

const Profile = () => {
  const user = useParams()
  const [account, setAccount] = useState({})
  const [id, setId] = useState(null)

  useEffect(() => {
    async function getUser() {
      const profileQuery = query(collection(db, 'users'), where('nickname', '==', user.nickname))

      const profileSnap = await getDocs(profileQuery)
      setAccount(profileSnap.docs[0].data())
      setId(profileSnap.docs[0].id)
    }

    getUser()
  }, [user])

  return (
    <div className={cx('layout-content')}>
      <div className={cx('layout-header')}>
        <UserTitle account={account} id={id} />
        <UserContact account={account} />
        <ShareAction />
        <MoreAction />
      </div>
      <div className={cx('layout-main')}>
        <Main username={account.nickname} />
      </div>
    </div>
  )
}
export default Profile
