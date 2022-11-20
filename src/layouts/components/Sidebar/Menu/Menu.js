import React from 'react'
import PropTypes from 'prop-types'

export default function Menu({ children }) {
  return <nav>{children}</nav>
}

Menu.prototype = {
  children: PropTypes.node.isRequired,
}
