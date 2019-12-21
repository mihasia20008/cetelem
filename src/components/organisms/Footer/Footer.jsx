import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Container from '../../base/Container';
import LocationSelector from '../LocationSelector';

import FooterButton from './blocks/FooterButton';

import MailIcon from './icons/MainIcon';
// import FacebookIcon from './icons/FacebookIcon';
// import VkIcon from './icons/VkIcon';
// import OkIcon from './icons/OkIcon';

import styles from './Footer.module.scss';

class Footer extends PureComponent {
  render() {
    return (
      <div className={styles.Footer}>
        <Container>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.main}>
                <div>
                  <Link to="/" className={styles.logo}>
                    <img src="/images/footerLogo.svg" alt="Сетелем" />
                  </Link>
                  <div className={styles.location}>
                    Выберите город:
                    <LocationSelector primaryLink />
                  </div>
                </div>
              </div>
              <div className={styles.phone}>
                <div>
                  <a className={styles.phoneLink} href="tel: 88005005502">
                    8 (800) 500-55-02
                  </a>
                  <div className={styles.phoneText}>Для звонков по России</div>
                </div>
              </div>
              <div className={styles.contactUs}>
                <FooterButton to="mailto:driveclick@cetelem.ru" className={styles.mailTo}>
                  <MailIcon className={styles.mailToIcon} />
                  Напишите нам
                </FooterButton>
              </div>
              <div className={styles.download}>
                <a
                  className={styles.downloadLink}
                  href="https://apps.apple.com/RU/app/id492224193"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={styles.downloadLogo}
                    src="/images/app-store.svg"
                    alt="AppStore logo"
                  />
                </a>
                <a
                  className={styles.downloadLink}
                  href="https://play.google.com/store/apps/details?id=ru.sberbankmobile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={styles.downloadLogo}
                    src="/images/google-play.svg"
                    alt="GooglePlay logo"
                  />
                </a>
              </div>
              {/* <div className={styles.social}> */}
              {/*  <FooterButton */}
              {/*    to="https://facebook.com" */}
              {/*    className={cls(styles.socialItem, styles.facebookIcon)} */}
              {/*    target="_blank" */}
              {/*  > */}
              {/*    <FacebookIcon /> */}
              {/*  </FooterButton> */}
              {/*  <FooterButton */}
              {/*    to="https://vk.com" */}
              {/*    className={cls(styles.socialItem, styles.vkIcon)} */}
              {/*    target="_blank" */}
              {/*  > */}
              {/*    <VkIcon /> */}
              {/*  </FooterButton> */}
              {/*  <FooterButton */}
              {/*    to="https://ok.ru" */}
              {/*    className={cls(styles.socialItem, styles.okIcon)} */}
              {/*    target="_blank" */}
              {/*  > */}
              {/*    <OkIcon /> */}
              {/*  </FooterButton> */}
              {/* </div> */}
            </div>
            <div className={styles.bottom}>
              <div className={styles.copyright}>
                <p className={styles.copyrightText}>
                  Список и схема взаимосвязей лиц, под контролем либо под значительным влиянием
                  которых находится Банк
                  <br />
                  Информация по процентным ставкам по договорам банковского вклада с физическими
                  лицами
                </p>
                <p className={styles.copyrightText}>
                  «Сетелем Банк» ООО, ОГРН 1027739664260, лицензии Банка России на осуществление
                  банковских операций № 2168 от 27 июня 2013 г.(бессрочные). Местонахождение:
                  Российская Федерация, 125124, г. Москва, ул. Правды, дом 26.
                  <br />
                  Информационный центр: 8 800 500 5503. Надзорный орган: Департамент надзора за
                  системно значимыми кредитными организациями Банка России.107016, г. Москва, ул.
                  Неглинная, 12, тел.: 8 (495) 771-91-00, www.cbr.ru
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Footer;
