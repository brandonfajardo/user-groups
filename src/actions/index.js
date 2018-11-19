import {
  CREATE_USER_SUCCESS,
  DELETE_USER,
  CREATE_GROUP_SUCCESS,
  DELETE_USER_FROM_GROUP,
  ADD_SELECTED_USERS
} from './types';
import history from '../history';

export const deleteUser = (id, userGroups) => ({
  type: DELETE_USER,
  payload: { id, userGroups }
});

export const createUser = ({ firstName, lastName, id, groups }) => dispatch => {
  dispatch({
    type: CREATE_USER_SUCCESS,
    payload: { firstName, lastName, id, groups }
  });
  history.push('/users');
};

export const createGroup = ({ users, groupName, id }) => dispatch => {
  dispatch({ type: CREATE_GROUP_SUCCESS, payload: { users, groupName, id } });
  history.push('/groups');
};

export const deleteUserFromGroup = (userId, groupId) => ({
  type: DELETE_USER_FROM_GROUP,
  payload: { userId, groupId }
});

export const addSelectedUsers = ({ groupId, users }) => ({
  type: ADD_SELECTED_USERS,
  payload: {
    groupId,
    users
  }
});
