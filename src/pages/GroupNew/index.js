import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './index.css';
import * as actions from '../../actions';

class GroupNew extends Component {
  state = {
    groupName: '',
    users: []
  };

  handleSubmit = () => {
    const { users, groupName } = this.state;
    const { createGroup, groups } = this.props;
    const groupList = Object.keys(groups).map(i => groups[i]);

    if (users.length && groupName) {
      createGroup({
        id: groupList.length,
        users,
        groupName
      });
    }
  };

  render() {
    const { userArr } = this.props;
    const { users, groupName } = this.state;
    const userList = Object.keys(userArr).map(i => userArr[i]);
    return (
      <div>
        <Link to="/groups" className={styles.backButton}>
          Back to groups
        </Link>
        <div>
          <p className={styles.title}>Create a group</p>
          <TextField
            value={groupName}
            onChange={e => this.setState({ groupName: e.target.value })}
            className={styles.field}
            placeholder="Group name..."
          />
          <br />
          <br />
          <FormControl>
            <InputLabel htmlFor="select-multiple">Users</InputLabel>
            <Select
              multiple
              value={users}
              className={styles.field}
              input={<Input id="select-multiple" />}
              onChange={e => this.setState({ users: e.target.value })}
            >
              {userList.map((user, i) => {
                return (
                  <MenuItem key={`${user.id}--${i}`} value={user.id}>
                    {`${user.firstName} ${user.lastName}`}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <Button
            onClick={this.handleSubmit}
            className={styles.field}
            variant="contained"
            color="default"
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = ({ userGroup: { users, groups } }) => ({
  userArr: users,
  groups
});

const mapDispatch = {
  createGroup: actions.createGroup
};

export default connect(
  mapState,
  mapDispatch
)(GroupNew);
