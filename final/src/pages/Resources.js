import React from 'react';
import { Card, Button } from '@material-ui/core';
import useColorScheme from '../hooks/useColorScheme';
import { makeStyles } from '@material-ui/core/styles';

export default function Resources() {
    const lightColor = "#eee"
    const darkColor = "rgba(255,255,255,0.1)"
    let bckgrdColor = useColorScheme() === 'dark' ? darkColor : lightColor
    const styles = useStyles();


  return (
    <main className={styles.container}>
      <h2><p className={styles.title}>Resources</p></h2>

      <div className={styles.separator} />
      <p className={styles.resourceText}>Quickly look up terms found in the WordPress admin area:</p>
      <div className={{...styles.btnWrapper, ...{backgroundColor:bckgrdColor}}}><Button variant="outlined" color="secondary" href="https://www.wpglossary.net/">WP Glossary</Button></div>

      <div className={styles.separator} />
      <p className={styles.resourceText}>Helpful articles about managing WordPress:</p>
      <div className={{...styles.btnWrapper, ...{background:bckgrdColor}}}><Button variant="outlined" color="secondary" href="https://wp-power.org/">WP Power</Button></div>

      <div className={styles.separator} />
      <p className={styles.resourceText}>WordPress.org's Doc Site:</p>
      <div className={{...styles.btnWrapper, ...{background:bckgrdColor}}}><Button variant="outlined" color="secondary" href="https://wordpress.org/support/">Official Documentation</Button></div>

      <div className={styles.separator} />
      <p className={styles.resourceText}>Getting stuck? We've put together a directory of agencies/developers who deal with WordPress:</p>
      <div className={{...styles.btnWrapper, ...{background:bckgrdColor}}}><Button variant="outlined" color="secondary" href="https://tickets.wp-overwatch.com/#marketplace">Get Help</Button></div>

      <div className={styles.separator} />
      <p className={styles.resourceText}>Want us to manage your website for you? We provide WordPress hosting:</p>
      <div className={{...styles.btnWrapper, ...{background:bckgrdColor}}}><Button variant="outlined" color="secondary" href="https://wp-power.org/">WordPress Hosting</Button></div>

      <p className={styles.resourceText}>{/* This is just to add some whitespace at the bottom */}</p>

    </main>
  );
}

const useStyles = makeStyles({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    top: 30,
  },
  btnWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      display:'flex',
      background: 'blue',
  },
  resourceText: {
    fontSize: 18,
    marginBottom: 20,
    left: '5%',
    textAlign: 'center',
  },
  separator: {
    marginTop: 30,
    marginBottom: 30,
    height: 1,
    width: '80%',
  },
});
