import classNames from 'classnames/bind'
import Button from '~/components/Button'
import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

const MenuItem = ({ data }) => {
  return (
    <Button leftIcon={data.icon} to={data.to} className={cx('menu-items')}>
      {data.title}
    </Button>
  )
}
export default MenuItem
