import { useState, useEffect, useRef } from 'react'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import HeadlessTippy from '@tippyjs/react/headless'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'

import { SearchIcon } from '~/components/Icons'
import { useDebounce } from '~/hooks'
import * as searchService from '~/apiServices/searchService'
import AccountItem from '~/components/AccountItem'
import { Wrapper as PopperWrapper } from '~/components/Popper'

const cx = classNames.bind(styles)

const Search = () => {
  const [searchResult, setSearchResult] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [showResult, setShowResult] = useState(true)
  const [loading, setLoading] = useState(false)

  const debounceSearchValue = useDebounce(searchValue, 500)

  const inputRef = useRef()

  const handleClear = () => {
    setSearchValue('')
    setSearchResult([])
    inputRef.current.focus()
  }

  const handleHideResult = () => {
    setShowResult(false)
  }

  useEffect(() => {
    if (!debounceSearchValue.trim()) {
      setSearchResult([])
      return
    }

    const fetchApi = async () => {
      setLoading(true)

      const result = await searchService.search(debounceSearchValue)
      setSearchResult(result)

      setLoading(false)
    }

    fetchApi()
  }, [debounceSearchValue])

  return (
    <HeadlessTippy
      visible={showResult && searchResult.length > 0}
      interactive={true}
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h4 className={cx('search-title')}>Accounts</h4>
            {searchResult.map((result) => (
              <AccountItem key={result.id} data={result} />
            ))}
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
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowResult(true)}
        />
        {!!searchValue && !loading && (
          <button className={cx('clear')} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
        <button className={cx('search-btn')}>
          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  )
}
export default Search
