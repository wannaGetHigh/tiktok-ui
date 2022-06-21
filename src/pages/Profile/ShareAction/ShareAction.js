import classNames from 'classnames/bind'
import styles from './ShareAction.module.scss'

import Menu from '~/components/Post/Menu'
import ReactIcon from '~/components/ReactIcon'
import { ShareIcon } from '~/components/Icons'

const cx = classNames.bind(styles)

const ShareAction = () => {
  return (
    <div className={cx('share-action')}>
      <Menu>
        <ReactIcon Icon={ShareIcon} wrap={false} />
      </Menu>
    </div>
  )
}
export default ShareAction
