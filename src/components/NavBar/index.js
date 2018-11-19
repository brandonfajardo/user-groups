import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import styles from './index.css';

class NavBar extends Component {
  render() {
    return (
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            <Link className={styles.logo} to="/groups">
              Facebooks
            </Link>
          </Typography>
          <Link className={styles.links} to="/groups">
            <Button variant="contained" color="primary">
              Groups
            </Button>
          </Link>
          <Link className={styles.links} to="/users">
            <Button variant="contained" color="primary">
              Users
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
