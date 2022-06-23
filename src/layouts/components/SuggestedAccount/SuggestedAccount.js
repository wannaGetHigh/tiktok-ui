import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './SuggestedAccount.module.scss'
import TippyHeadless from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'
import { db } from '~/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

import AccountItem from '~/components/AccountItem'
import AccountInfoPopper from '~/components/AccountInfoPopper'

const cx = classNames.bind(styles)

const SuggestedAccount = ({ options }) => {
  const [suggestedList, setSuggestedList] = useState([])
  const [suggestBtnText, setSuggestBtnText] = useState('See more')

  const handleSeeMore = () => {
    if (suggestBtnText === 'See more') {
      setSuggestBtnText('See less')
    } else {
      setSuggestBtnText('See more')
    }
  }

  useEffect(() => {
    const fetchApi = async () => {
      const q = query(collection(db, 'users'), where('suggested', '==', true))

      const querySnapshot = await getDocs(q)
      setSuggestedList(querySnapshot.docs)
    }

    fetchApi()
  }, [])

  return (
    <div className={cx('suggest-wrapper')}>
      <p className={cx('suggest-title')}>Suggested accounts</p>
      <div className={cx('suggest-accounts')}>
        {suggestedList.map((account) => (
          <div key={account.id}>
            <TippyHeadless
              delay={[700, 0]}
              interactive
              offset={[-28, 8]}
              placement="bottom-start"
              render={() => <AccountInfoPopper account={account.data()} id={account.id} />}
            >
              <AccountItem data={account.data()} options={options} />
            </TippyHeadless>
          </div>
        ))}
      </div>
      <div className={cx('suggest-btn')}>
        <p className={cx('see-more')} onClick={handleSeeMore}>
          {suggestBtnText}
        </p>
      </div>
    </div>
  )
}
export default SuggestedAccount
