import classNames from 'classnames/bind'

import Menu, { MenuItem } from './Menu'
import config from '~/config'
import styles from './Sidebar.module.scss'
import SuggestedAccounts from '~/components/SuggestedAccounts'
import { HomeIcon, UserGroupIcon, LiveIcon, UserGroupSolidIcon, HomeSolidIcon, LiveSolidIcon } from '~/components/Icons'

const cx = classNames.bind(styles)

const Sidebar = () => {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeSolidIcon />} />
        <MenuItem
          title="Following"
          to={config.routes.following}
          icon={<UserGroupIcon />}
          activeIcon={<UserGroupSolidIcon />}
        />
        <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveSolidIcon />} />
      </Menu>

      <SuggestedAccounts label="Suggested accounts" />

      {/* <SuggestedAccounts label="Following accounts" /> */}
    </aside>
  )
}
export default Sidebar
