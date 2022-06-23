import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { UserIcon } from '~/components/Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signInWithGoogle } from '~/firebase'
import classNames from 'classnames/bind'
import styles from './SignInAction.module.scss'

const cx = classNames.bind(styles)

function SignInAction({ setInputField }) {
  return (
    <div className={cx('action-list')}>
      <div className={cx('action-item')} onClick={() => setInputField(true)}>
        <div className={cx('action-desc')}>
          <UserIcon width="22" height="22" />
        </div>

        <p className={cx('action-text')}>Use email</p>
      </div>

      <div className={cx('action-item')} onClick={signInWithGoogle}>
        <div className={cx('action-desc')}>
          <FontAwesomeIcon icon={faGoogle} />
        </div>
        <p className={cx('action-text')}>Continue with Google</p>
      </div>
    </div>
  )
}
export default SignInAction
