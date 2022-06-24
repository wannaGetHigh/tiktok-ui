import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import Button from '~/components/Button'
import styles from './InputField.module.scss'
import { registerWithEmailAndPassword, logInWithEmailAndPassword } from '~/firebase'

const cx = classNames.bind(styles)

function InputField({ isLogin }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  let dispatch

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      dispatch = logInWithEmailAndPassword(email, password)
      dispatch(setErr)
    } else {
      dispatch = registerWithEmailAndPassword(name, email, password)
      dispatch(setErr)
    }
  }

  useEffect(() => {
    if (!isLogin) {
      setEmail('')
      setName('')
      setPassword('')
      setErr('')
    } else {
      setEmail('')
      setPassword('')
    }
  }, [isLogin])

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

      {err && <div className={cx('error-filed')}>{err.message}</div>}

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
