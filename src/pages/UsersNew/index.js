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

class UsersNew extends Component {
  state = {
    firstName: '',
    lastName: '',
    groups: []
  };

  handleSubmit = () => {
    const { firstName, lastName, groups } = this.state;
    const { createUser, users } = this.props;
    const userList = Object.keys(users).map(i => users[i]);

    if (firstName && lastName) {
      createUser({
        id: userList.length,
        firstName,
        lastName,
        groups
      });
    }
  };

  render() {
    const { firstName, lastName, groups } = this.state;
    const { groupArr } = this.props;
    const groupList = Object.keys(groupArr).map(i => groupArr[i]);
    return (
      <div>
        <Link to="/users" className={styles.backButton}>
          Back to users
        </Link>
        <p className={styles.title}>Create a new user</p>
        <TextField
          value={firstName}
          onChange={e => this.setState({ firstName: e.target.value })}
          className={styles.field}
          placeholder="First name..."
        />
        <br />
        <br />
        <TextField
          value={lastName}
          onChange={e => this.setState({ lastName: e.target.value })}
          className={styles.field}
          placeholder="Last name..."
        />
        <br />
        <br />
        <FormControl>
          <InputLabel htmlFor="select-multiple">Groups</InputLabel>
          <Select
            multiple
            value={groups}
            className={styles.field}
            input={<Input id="select-multiple" />}
            onChange={e => this.setState({ groups: e.target.value })}
          >
            {groupList.map((group, i) => (
              <MenuItem key={`${group.groupName}--${i}`} value={group.id}>
                {group.groupName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <Button
          onClick={this.handleSubmit}
          className={styles.field}
          variant="contained"
          color="default"
          disabled={this.props.loading}
        >
          Submit
        </Button>
      </div>
    );
  }
}

const mapState = ({ userGroup: { loading, groups, users } }) => ({
  loading,
  groupArr: groups,
  users
});

const mapDispatch = {
  createUser: actions.createUser
};

export default connect(
  mapState,
  mapDispatch
)(UsersNew);
