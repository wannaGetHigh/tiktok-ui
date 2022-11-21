import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import Menu, { MenuItem } from './Menu'
import config from '~/config'
import styles from './Sidebar.module.scss'
import SuggestedAccounts from '~/components/SuggestedAccounts'
import { getSuggestedAccount } from '~/services/userService'
import { HomeIcon, UserGroupIcon, LiveIcon, UserGroupSolidIcon, HomeSolidIcon, LiveSolidIcon } from '~/components/Icons'

const cx = classNames.bind(styles)

const Sidebar = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([])

  useEffect(() => {
    getSuggestedAccount({ page: 1, perPage: 5 })
      .then((data) => {
        if (data && Array.isArray(data)) setSuggestedUsers((prev) => [...prev, ...data])
      })
      .catch((e) => console.log(e))
  }, [])

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

      <SuggestedAccounts label="Suggested accounts" data={suggestedUsers} />

      {/* <SuggestedAccounts label="Following accounts" /> */}
    </aside>
  )
}
export default Sidebar
