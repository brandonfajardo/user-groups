import {
  CREATE_USER_SUCCESS,
  DELETE_USER,
  CREATE_GROUP_SUCCESS,
  DELETE_USER_FROM_GROUP,
  ADD_SELECTED_USERS
} from '../actions/types';
import { omit } from 'lodash';

const initialState = {
  users: {},
  groups: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_USER_SUCCESS:
      if (payload.groups.length === 0) {
        return {
          ...state,
          loading: false,
          users: {
            [payload.id]: {
              id: payload.id,
              firstName: payload.firstName,
              lastName: payload.lastName,
              groups: payload.groups
            },
            ...state.users
          }
        };
      } else {
        const getGroups = () => {
          const groups = payload.groups.map(group => {
            return {
              ...state.groups[group],
              users: [...state.groups[group].users, payload.id]
            };
          });

          const updatedGroups = {};

          groups.forEach(user => {
            updatedGroups[user.id] = {
              ...user
            };
          });

          return { ...state.groups, ...updatedGroups };
        };
        return {
          ...state,
          loading: false,
          users: {
            [payload.id]: {
              id: payload.id,
              firstName: payload.firstName,
              lastName: payload.lastName,
              groups: payload.groups
            },
            ...state.users
          },
          groups: getGroups()
        };
      }
    case CREATE_GROUP_SUCCESS:
      const getUsers = () => {
        const users = payload.users.map(user => {
          return {
            ...state.users[user],
            groups: [...state.users[user].groups, payload.id]
          };
        });

        const updatedUsers = {};

        users.forEach(user => {
          updatedUsers[user.id] = {
            ...user
          };
        });

        return { ...state.users, ...updatedUsers };
      };

      return {
        ...state,
        groups: {
          [payload.id]: {
            id: payload.id,
            groupName: payload.groupName,
            users: payload.users
          },
          ...state.groups
        },
        users: getUsers()
      };
    case DELETE_USER:
      if (payload.userGroups.length === 0) {
        return {
          ...state,
          users: omit(state.users, payload.id)
        };
      } else {
        const getUpdatedGroups = () => {
          const groups = payload.userGroups.map(group => {
            const users = group.users.filter(user => {
              return user !== payload.id;
            });
            return {
              ...group,
              users
            };
          });

          const updatedGroups = {};

          groups.forEach(group => {
            if (group.users.length === 0) {
              state.groups = omit(state.groups, group.id);
            } else {
              updatedGroups[group.id] = {
                ...group
              };
            }
          });

          return { ...state.groups, ...updatedGroups };
        };

        return {
          ...state,
          users: omit(state.users, payload.id),
          groups: getUpdatedGroups()
        };
      }
    case DELETE_USER_FROM_GROUP:
      const getGroups = () => {
        const group = {
          [payload.groupId]: {
            ...state.groups[payload.groupId],
            users: state.groups[payload.groupId].users.filter(user => {
              return user !== payload.userId;
            })
          }
        };

        const hasNoUsers = group[payload.groupId].users.length === 0;

        if (hasNoUsers) {
          return { ...omit(state.groups, payload.groupId) };
        }

        return { ...state.groups, ...x };
      };

      return {
        ...state,
        groups: getGroups(),
        users: {
          ...state.users,
          [payload.userId]: {
            ...state.users[payload.userId],
            groups: state.users[payload.userId].groups.filter(group => {
              return group !== payload.groupId;
            })
          }
        }
      };
    case ADD_SELECTED_USERS:
      const getUpdatedUsers = () => {
        const users = payload.users.map(user => {
          return {
            ...state.users[user],
            groups: [...state.users[user].groups, payload.groupId]
          };
        });

        const updatedUsers = {};

        users.forEach(user => {
          updatedUsers[user.id] = {
            ...user
          };
        });

        return { ...state.users, ...updatedUsers };
      };

      return {
        ...state,
        groups: {
          ...state.groups,
          [payload.groupId]: {
            ...state.groups[payload.groupId],
            users: [...state.groups[payload.groupId].users, ...payload.users]
          }
        },
        users: getUpdatedUsers()
      };
    default:
      return state;
  }
};
