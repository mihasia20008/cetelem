import React from 'react';

import Container from '../../../base/Container';

import styles from './WrongUserPage.module.scss';

function WrongUserPage() {
  return (
    <div className={styles.WrongUserPage}>
      <Container>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Получите автокредит
            <br />
            на лучших условиях
          </h2>
          <a className={styles.button} href="https://google.com">
            Начать оформление
          </a>
        </div>
      </Container>
      <div className={styles.imageWrap}>
        <img className={styles.image} src="/images/some-auto.png" alt="some auto" />
      </div>
    </div>
  );
}

export default WrongUserPage;
