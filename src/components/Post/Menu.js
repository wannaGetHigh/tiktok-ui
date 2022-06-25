import { useState } from 'react'
import TippyHeadless from '@tippyjs/react/headless'
import ShareAction from '../ShareAction'
import PropTypes from 'prop-types'

const Menu = ({ children }) => {
  const [showAll, setShowAll] = useState(false)

  return (
    <TippyHeadless
      placement="top-start"
      trigger="mouseenter click"
      offset={[-24, 0]}
      interactive
      onHide={() => setShowAll(false)}
      render={() => <ShareAction showAll={showAll} setShowAll={setShowAll} />}
    >
      {children}
    </TippyHeadless>
  )
}

Menu.propTypes = {
  children: PropTypes.node,
}

export default Menu
