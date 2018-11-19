import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import styles from './index.css';

class UserList extends Component {
  deleteUser = id => {
    this.props.deleteUser(id);
  };
  render() {
    const { users, deleteUser } = this.props;
    return (
      <Grid container>
        {users.map((user, i) => (
          <Grid key={`${user}-${i}`} xs={12} sm={6} md={4} item>
            <Card className={styles.card} key={`${user}--${i}`}>
              <div
                className={styles.outerContainer}
                style={{ marginBottom: user.groups.length ? '20px' : '0px' }}
              >
                <div className={styles.innerContainer}>
                  <div className={styles.photo} />
                  <p className={styles.usersName}>
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <DeleteOutlinedIcon
                  onClick={() => deleteUser(user.id, user.groups)}
                  className={styles.icon}
                />
              </div>

              {user.groups.map((group, i) => {
                return (
                  <Chip
                    key={`${group.groupName}--${i}`}
                    color="secondary"
                    className={styles.chip}
                    label={group.groupName}
                  />
                );
              })}
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default UserList;
