import Tippy from '@tippyjs/react/headless'
import styles from './Menu.module.scss'
import classNames from 'classnames/bind'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import MenuItem from './MenuItem'

const cx = classNames.bind(styles)

const index = ({ children, items = [] }) => {
  console.log(items)
  const renderItems = items.map((item, index) => <MenuItem key={index} data={item} />)

  return (
    <Tippy
      interactive
      delay={[0, 700]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
          <PopperWrapper>{renderItems}</PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  )
}
export default index
