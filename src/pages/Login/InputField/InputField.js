import classNames from 'classnames/bind'
import { useState } from 'react'
import Button from '~/components/Button'
import styles from './InputField.module.scss'
import { registerWithEmailAndPassword, logInWithEmailAndPassword } from '~/firebase'

const cx = classNames.bind(styles)

function InputField({ isLogin }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (isLogin) {
      logInWithEmailAndPassword(email, password)
    } else {
      registerWithEmailAndPassword(name, email, password)
    }
  }

  return (
    <div className={cx('input-container')}>
      <div className={cx('input-title')}>Email</div>
      {!isLogin && (
        <div className={cx('input-field')}>
          <input type="name" placeholder="Your usename" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      )}
      <div className={cx('input-field')}>
        <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className={cx('input-field')}>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <Button
        onClick={handleSubmit}
        outline
        primary={!!email && !!password}
        disabled={!email || !password}
        className={cx('input-btn')}
      >
        {isLogin ? 'Login' : 'Next'}
      </Button>
    </div>
  )
}
export default InputField
