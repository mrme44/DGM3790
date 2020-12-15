import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import externalLinkIcon from '../assets/images/externalLink.webp';
import useColorScheme from '../hooks/useColorScheme';

const LinkOld = (props) => {
  const styles = useStyles();
  const inDarkMode = useColorScheme() === 'dark';
  // style={pressed => {return {
  //     backgroundColor: (pressed ? (inDarkMode ? '#6116f2' : '#ca7712') : (inDarkMode ? '#f116f2' : '#fa7712')),
  //     flex: 1,
  //     flexWrap: 'wrap'
  // }}}
  return props.children &&
    <div
            style={{flex: 1,flexWrap: 'wrap', padding: 6}}
            onclick={() => {window.location.href = props.href}}
          >
          <div style={styles.textViewPadding}>
              <p style={{
                  ...styles.text,
                  ...props.style,
                  color: inDarkMode ? '#6116f2' : '#ca7712',
                }}>
                {props.children}
                <img src={externalLinkIcon} />
              </p>
          </div>
    </div>
};

const useStyles = makeStyles((theme) => ({
    textViewPadding: {
        paddingHorizontal: 4,
        top: 3,
        flex: 1,
        flexWrap: 'wrap'
    },
    text: {
        flex: 1,
        flexDirection:'row',
        flexWrap: 'wrap',
        lineHeight: 13
    }
}) )

export default LinkOld
