import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Sidebar from '~/layouts/components/Sidebar'
import styles from './FullLayout.module.scss'

const cx = classNames.bind(styles)

function FullLayout({ children }) {
  const options = {
    small: true,
    hidden: true,
  }

  return (
    <div className={cx('wrapper')}>
      <Header full={true} />
      <div className={cx('container')}>
        <div className={cx('side-bar')}>
          <Sidebar options={options} />
        </div>
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  )
}

FullLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FullLayout
