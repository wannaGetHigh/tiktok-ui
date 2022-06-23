import { useState, useEffect, useRef } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import HeadlessTippy from '@tippyjs/react/headless'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'

import { SearchIcon } from '~/components/Icons'
// import { useDebounce } from '~/hooks'
// import * as searchService from '~/services/searchService'
import AccountItem from '~/components/AccountItem'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import { db } from '~/firebase'

const cx = classNames.bind(styles)

const Search = () => {
  const [searchResult, setSearchResult] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)

  // const debouncedSearchValue = useDebounce(searchValue, 500)

  const inputRef = useRef()

  const handleClear = () => {
    setSearchValue('')
    setSearchResult([])
    inputRef.current.focus()
  }

  const handleHideResult = () => {
    setShowResult(false)
  }

  const handleChange = (e) => {
    const searchValue = e.target.value
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    // if (!debouncedSearchValue.trim()) {
    //   setSearchResult([])
    //   return
    // }

    // const fetchApi = async () => {
    //   setLoading(true)

    //   const result = await searchService.search(debouncedSearchValue)
    //   setSearchResult(result)

    //   setLoading(false)
    // }

    const fetchApi = async () => {
      setLoading(true)

      const querySnapshot = await getDocs(collection(db, 'users'))
      setSearchResult(querySnapshot.docs)

      setLoading(false)
    }

    fetchApi()
    // }, [debouncedSearchValue])
  }, [])

  return (
    // Interactive tippy element may not be accessible via keyboard navigation
    // Using a wrapper <div> or <span> tag around the reference element solve this problem
    <div>
      <HeadlessTippy
        visible={showResult && searchResult?.length > 0}
        interactive={true}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Accounts</h4>
              {searchResult.map((result) => {
                /* return <AccountItem key={result.id} data={result} /> */

                if (result.data().nickname.includes(searchValue)) {
                  return <AccountItem key={result.id} data={result.data()} />
                } else {
                  return null
                }
              })}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search accounts and videos"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
          <button className={cx('search-btn')} onMouseDown={handleSubmit}>
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  )
}
export default Search
