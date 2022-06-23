import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'

import { HomeIcon, UserGroupIcon, LiveIcon, HomeIconSolid, UserGroupIconSolid, LiveIconSolid } from '~/components/Icons'
import SuggestedAccount from '../../components/SuggestedAccount/SuggestedAccount'
import Discover from './Discover'
import Footer from './Footer'
import config from '~/config'
import Menu, { MenuItem } from './Menu'
import FollowingAccount from './FollowingAccount'

const cx = classNames.bind(styles)

const Sidebar = ({ options }) => {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title="For You" Icon={HomeIcon} to={config.routes.home} ActiveIcon={HomeIconSolid} />
        <MenuItem title="Following" Icon={UserGroupIcon} to={config.routes.following} ActiveIcon={UserGroupIconSolid} />
        <MenuItem title="LIVE" Icon={LiveIcon} to={config.routes.live} ActiveIcon={LiveIconSolid} />
      </Menu>
      <div className={cx('separate-line')}></div>

      <SuggestedAccount options={options} />
      <div className={cx('separate-line')}></div>

      <FollowingAccount options={options} />
      <div className={cx('separate-line')}></div>

      <Discover />
      <div className={cx('separate-line')}></div>

      <Footer />
    </aside>
  )
}
export default Sidebar
