import styles from './SignupAgreement.module.scss'

function SignupAgreement() {
  return (
    <div className={styles['signup-agreement']}>
      By continuing, you agree to TikTok’s{' '}
      <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/legal/terms-of-use?lang=en">
        Terms of Service
      </a>{' '}
      and confirm that you have read TikTok’s{' '}
      <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/legal/privacy-policy?lang=en">
        Privacy Policy
      </a>
      .
    </div>
  )
}
export default SignupAgreement
