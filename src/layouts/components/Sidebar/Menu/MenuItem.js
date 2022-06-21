import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import styles from './Menu.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Menu = ({ title, to, Icon, ActiveIcon }) => {
  const isActive = to === window.location.pathname

  return (
    <NavLink to={to} className={(nav) => cx('menu-item', { active: nav.isActive })}>
      {isActive ? <ActiveIcon /> : <Icon />}
      <span className={cx('menu-text')}>{title}</span>
    </NavLink>
  )
}

Menu.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  ActiveIcon: PropTypes.elementType.isRequired,
}

export default Menu
