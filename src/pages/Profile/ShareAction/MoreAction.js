import classNames from 'classnames/bind'
import styles from './ShareAction.module.scss'
import TippyHeadless from '@tippyjs/react/headless'
import { BlockIcon, DotsIcon, FlagIcon, MessageIcon } from '~/components/Icons'
import { Wrapper } from '~/components/Popper'
import ReactIcon from '~/components/ReactIcon'

const cx = classNames.bind(styles)

const MoreAction = () => {
  const options = (
    <Wrapper>
      <div className={cx('action-container')}>
        <div className={cx('action-item')}>
          <MessageIcon width="16" height="16" />
          <p className={cx('action-desc')}>Send message</p>
        </div>
      </div>

      <div className={cx('action-container')}>
        <div className={cx('action-item')}>
          <FlagIcon width="16" height="16" />
          <p className={cx('action-desc')}>Report</p>
        </div>
      </div>

      <div className={cx('action-container')}>
        <div className={cx('action-item', 'no-border')}>
          <BlockIcon />
          <p className={cx('action-desc')}>Block</p>
        </div>
      </div>
    </Wrapper>
  )

  return (
    <div className={cx('more-action')}>
      <TippyHeadless placement="top-end" trigger="mouseenter click" offset={[16, 0]} interactive render={() => options}>
        <ReactIcon Icon={DotsIcon} wrap={false} />
      </TippyHeadless>
    </div>
  )
}
export default MoreAction
