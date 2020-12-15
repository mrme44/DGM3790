import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import SignupForm from './signupForm';
import LoginForm from './loginForm';
import './AuthForm.css';

function AuthForm(props) {
    const direction = useTheme().direction;
    const [tabIndex, setTabIndex] = React.useState(0);

    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={tabIndex}
            onChange={(ev, i) => setTabIndex(i)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="sign up or login"
          >
            <Tab label="Sign Up" id='full-width-tab-0' aria-controls='full-width-tabpanel-0' />
            <Tab label="Login" id='full-width-tab-1' aria-controls='full-width-tabpanel-1' />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tabIndex}
          onChangeIndex={i => setTabIndex(i)}
        >
          <TabPanel value={tabIndex} index={0} dir={direction}>
            <SignupForm />
          </TabPanel>
          <TabPanel value={tabIndex} index={1} dir={direction}>
              <LoginForm />
          </TabPanel>
        </SwipeableViews>
      </div>
    );
}

function TabPanel(props) {
    const { children, value, index, dir } = props;

  return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        dir={dir}
      >
          { value === index && (
            <Box p={1}>{children}</Box>
          )}
      </div>
  );
}

export default AuthForm;
