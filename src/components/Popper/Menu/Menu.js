import { useState } from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react/headless'
import styles from './Menu.module.scss'
import classNames from 'classnames/bind'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import MenuItem from './MenuItem'
import Header from './Header'

const cx = classNames.bind(styles)

const defaultFn = () => {}

const Menu = ({ children, items = [], hideOnClick = false, onChange = defaultFn }) => {
  const [history, setHistory] = useState([{ data: items }])

  const current = history.at(-1)

  const renderItems = current.data.map((item, index) => {
    const isParent = !!item.children

    return (
      <MenuItem
        key={index}
        data={item}
        onClick={() => (isParent ? setHistory((prev) => [...prev, item.children]) : onChange(item))}
      />
    )
  })

  const renderResult = (attrs) => (
    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
      <PopperWrapper>
        {history.length > 1 && <Header title="Language" onBack={handleBack} />}
        <div className={cx('menu-body')}>{renderItems}</div>
      </PopperWrapper>
    </div>
  )

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1))
  }

  // Reset to firest page
  const handleReset = () => {
    setHistory((prev) => prev.slice(0, 1))
  }

  return (
    <Tippy
      interactive
      delay={[0, 700]}
      offset={[12, 8]}
      hideOnClick={hideOnClick}
      placement="bottom-end"
      render={renderResult}
      onHide={handleReset}
    >
      {children}
    </Tippy>
  )
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
}

export default Menu
