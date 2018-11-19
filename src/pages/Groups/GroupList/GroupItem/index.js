import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import styles from './index.css';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

class GroupItem extends Component {
  state = {
    adding: false,
    users: []
  };

  addSelectedUsers = (groupId, users) => {
    const { addSelectedUsers } = this.props;

    if (this.state.users.length) {
      addSelectedUsers({
        groupId,
        users
      });
      this.setState({
        adding: false
      });
    }
  };

  render() {
    const { group, users, deleteUserFromGroup } = this.props;
    const { adding } = this.state;

    let userIds = [];
    group.users.forEach(user => {
      userIds.push(user.id);
    });

    const userArr = users.filter(user => {
      if (!userIds.includes(user.id)) {
        return user;
      }
    });

    return (
      <Card className={styles.card}>
        <div className={styles.outerContainer}>
          <div className={styles.photo} />
          <p className={styles.groupName}>{group.groupName}</p>
        </div>

        {group.users.map((user, i) => (
          <Chip
            key={`${user.firstName}--${i}`}
            onDelete={() => deleteUserFromGroup(user.id, group.id)}
            color="secondary"
            className={styles.chip}
            label={`${user.firstName} ${user.lastName}`}
          />
        ))}

        <Button
          style={{ display: 'block', marginTop: '15px' }}
          variant="outlined"
          color={adding ? 'secondary' : 'primary'}
          onClick={() => this.setState({ adding: !adding, users: [] })}
        >
          {adding ? 'Close' : 'Add Users'}
        </Button>

        {adding && (
          <Card className={styles.addContainer}>
            <FormControl style={{ display: 'flex' }}>
              <InputLabel htmlFor="select-multiple">Users</InputLabel>
              <Select
                multiple
                value={this.state.users}
                input={<Input id="select-multiple" />}
                onChange={e => this.setState({ users: e.target.value })}
              >
                {userArr.map((user, i) => {
                  return (
                    <MenuItem key={`${user.id}--${i}`} value={user.id}>
                      {`${user.firstName} ${user.lastName}`}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              style={{ marginTop: '15px' }}
              onClick={() => this.addSelectedUsers(group.id, this.state.users)}
              variant="contained"
              color="primary"
            >
              Add selected users
            </Button>
          </Card>
        )}
      </Card>
    );
  }
}

export default GroupItem;
