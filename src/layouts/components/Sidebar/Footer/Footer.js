import classNames from 'classnames/bind'
import styles from './Footer.module.scss'

const cx = classNames.bind(styles)

const Footer = () => {
  return (
    <footer>
      <div className={cx('link-container')}>
        <a className={cx('footer-link')} href="https://www.tiktok.com/about?lang=en" target="_blank" rel="noreferrer">
          About
        </a>
        <a className={cx('footer-link')} href="https://newsroom.tiktok.com/" target="_blank" rel="noreferrer">
          Newsroom
        </a>
        <a
          className={cx('footer-link')}
          href="https://www.tiktok.com/about/contact?lang=en"
          target="_blank"
          rel="noreferrer"
        >
          Contact
        </a>
        <a className={cx('footer-link')} href="https://careers.tiktok.com" target="_blank" rel="noreferrer">
          Careers
        </a>
        <a className={cx('footer-link')} href="https://www.bytedance.com/" target="_blank" rel="noreferrer">
          ByteDance
        </a>
      </div>
      <div className={cx('link-container')}>
        <a className={cx('footer-link')} href="https://www.tiktok.com/forgood" rel="noreferrer" target="_blank">
          TikTok for Good
        </a>
        <a
          className={cx('footer-link')}
          href="https://www.tiktok.com/business/?attr_medium=tt_official_site_guidance&amp;attr_source=tt_official_site&amp;refer=tiktok_web"
          rel="noreferrer"
          target="_blank"
        >
          Advertise
        </a>
        <a
          className={cx('footer-link')}
          href="https://developers.tiktok.com/?refer=tiktok_web"
          rel="noreferrer"
          target="_blank"
        >
          Developers
        </a>
        <a
          className={cx('footer-link')}
          href="https://www.tiktok.com/transparency?lang=en"
          rel="noreferrer"
          target="_blank"
        >
          Transparency
        </a>
        <a
          className={cx('footer-link')}
          href="https://www.tiktok.com/tiktok-rewards/en"
          rel="noreferrer"
          target="_blank"
        >
          TikTok Rewards
        </a>
      </div>
      <div className={cx('link-container')}>
        <a className={cx('footer-link')} href="https://support.tiktok.com/en" rel="noreferrer" target="_blank">
          Help
        </a>
        <a className={cx('footer-link')} href="https://www.tiktok.com/safety?lang=en" rel="noreferrer" target="_blank">
          Safety
        </a>
        <a
          className={cx('footer-link')}
          href="https://www.tiktok.com/legal/terms-of-service?lang=en"
          rel="noreferrer"
          target="_blank"
        >
          Terms
        </a>
        <a
          className={cx('footer-link')}
          href="https://www.tiktok.com/legal/privacy-policy-row?lang=en"
          rel="noreferrer"
          target="_blank"
        >
          Privacy
        </a>
        <a
          className={cx('footer-link')}
          href="https://www.tiktok.com/creators/creator-portal/en-us/"
          rel="noreferrer"
          target="_blank"
        >
          Creator Portal
        </a>
        <a
          className={cx('footer-link')}
          href="https://www.tiktok.com/community-guidelines?lang=en"
          rel="noreferrer"
          target="_blank"
        >
          Community Guidelines
        </a>
      </div>

      <span>&copy; 2022 TikTok</span>
    </footer>
  )
}
export default Footer
