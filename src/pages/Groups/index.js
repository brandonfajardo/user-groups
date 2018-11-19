import React, { Component } from 'react';
import GroupList from './GroupList';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import styles from './index.css';

class Groups extends Component {
  render() {
    const { groups, users, deleteUserFromGroup, addSelectedUsers } = this.props;
    const userArr = Object.keys(users).map(i => users[i]);
    const groupList = Object.keys(groups).map(i => groups[i]);

    console.log('Groups render()', groupList);

    const groupArr = groupList.map(group => {
      return {
        ...group,
        users: group.users.map(user => {
          return users[user];
        })
      };
    });
    return (
      <div>
        <Link className={styles.link} to="/groups/new">
          <Button
            className={styles.createButton}
            variant="contained"
            color="default"
          >
            Create a group
          </Button>
        </Link>
        <GroupList
          groups={groupArr}
          users={userArr}
          addSelectedUsers={addSelectedUsers}
          deleteUserFromGroup={deleteUserFromGroup}
        />
      </div>
    );
  }
}

const mapState = ({ userGroup: { groups, users } }) => ({
  groups,
  users
});

const mapDispatch = {
  deleteUserFromGroup: actions.deleteUserFromGroup,
  addSelectedUsers: actions.addSelectedUsers
};

export default connect(
  mapState,
  mapDispatch
)(Groups);
