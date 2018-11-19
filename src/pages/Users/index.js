import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import UserList from './UserList';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import styles from './index.css';

class Users extends Component {
  render() {
    const { users, deleteUser, groups } = this.props;
    const userList = Object.keys(users).map(i => users[i]);
    console.log('Users render()', userList);

    const userArr = userList.map(user => {
      return {
        ...user,
        groups: user.groups.map(group => {
          return groups[group];
        })
      };
    });
    return (
      <div>
        <Link className={styles.link} to="/users/new">
          <Button
            className={styles.createButton}
            variant="contained"
            color="default"
          >
            Create a new user
          </Button>
        </Link>
        <UserList users={userArr} deleteUser={deleteUser} />
      </div>
    );
  }
}

const mapState = ({ userGroup: { users, groups } }) => ({
  users,
  groups
});

const mapDispatch = {
  getUsers: actions.getUsers,
  deleteUser: actions.deleteUser
};

export default connect(
  mapState,
  mapDispatch
)(Users);
