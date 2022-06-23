import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { auth } from '~/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import images from '~/assets/images'
import styles from './Login.module.scss'
import config from '~/config'
import SignupAgreement from './SignupAgreement'
import SignInAction from './SignInAction'
import InputField from './InputField'

const cx = classNames.bind(styles)

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [inputField, setInputField] = useState(false)

  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }

    if (user) navigate(config.routes.home)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading])

  return (
    <div className={cx('wrapper')} style={{ backgroundImage: `url(${images.wallpaper})` }}>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <h2>{isLogin ? 'Log in to Tiktok' : 'Sign up for TikTok'}</h2>
          {inputField ? <InputField isLogin={isLogin} /> : <SignInAction setInputField={setInputField} />}

          {!isLogin && <SignupAgreement className={cx('signup-agreement')} />}
        </div>

        {isLogin ? (
          <div className={cx('more-action')}>
            Don't have an account?
            <span className={cx('more-action__desc')} onClick={() => setIsLogin(false)}>
              Sign up
            </span>
          </div>
        ) : (
          <div className={cx('more-action')}>
            Already have an account
            <span className={cx('more-action__desc')} onClick={() => setIsLogin(true)}>
              Log in
            </span>
          </div>
        )}

        <Link to={config.routes.home}>
          <button className={cx('close-btn')}>
            <FontAwesomeIcon size="2x" icon={faClose} />
          </button>
        </Link>

        {inputField && (
          <button className={cx('back-btn')} onClick={() => setInputField(false)}>
            <FontAwesomeIcon size="2x" icon={faChevronLeft} />
          </button>
        )}
      </div>
    </div>
  )
}
export default Login
