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
    <main style={styles.container}>
      <h2><p style={styles.title}>Resources</p></h2>

      <div style={styles.separator} />
      <p style={styles.resourceText}>Quickly look up terms found in the WordPress admin area:</p>
      <div style={{...styles.btnWrapper, ...{display:'flex',alignItems:'center'}}}><Button href="https://www.wpglossary.net/">WP Glossary</Button></div>

      <div style={styles.separator} />
      <p style={styles.resourceText}>Helpful articles about managing WordPress:</p>
      <div style={{...styles.btnWrapper, ...{display:'flex',alignItems:'center'}}}><Button href="https://wp-power.org/">WP Power</Button></div>

      <div style={styles.separator} />
      <p style={styles.resourceText}>WordPress.org's Doc Site:</p>
      <div style={{...styles.btnWrapper, ...{display:'flex',alignItems:'center'}}}><Button href="https://wordpress.org/support/">Official Documentation</Button></div>

      <div style={styles.separator} />
      <p style={styles.resourceText}>Getting stuck? We've put together a directory of agencies/developers who deal with WordPress:</p>
      <div style={{...styles.btnWrapper, ...{display:'flex',alignItems:'center'}}}><Button href="https://tickets.wp-overwatch.com/#marketplace">Get Help</Button></div>

      <div style={styles.separator} />
      <p style={styles.resourceText}>Want us to manage your website for you? We provide WordPress hosting:</p>
      <div style={{...styles.btnWrapper, ...{display:'flex',alignItems:'center'}}}><Button href="https://wp-power.org/">WordPress Hosting</Button></div>

      <p style={styles.resourceText}>{/* This is just to add some whitespace at the bottom */}</p>

    </main>
  );
}

const useStyles = makeStyles((theme) => ({
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

  resourceText: {
    fontSize: 18,
    marginBottom: 20,
    left: '5%',
    paddingRight: '10%',
    textAlign: 'center',
  },
  separator: {
    marginTop: 30,
    marginBottom: 30,
    height: 1,
    width: '80%',
  },
}));
