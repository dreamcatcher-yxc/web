import React from 'react';
import { Link } from 'umi';
import styles from './index.css';


export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            Getting Started1
          </a>
          <ul>
            <li>
              <Link to="/users/1">/users/1</Link>
            </li>
            <li>
              <Link to="/users/detail">/users/detail</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
