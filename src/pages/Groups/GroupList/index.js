import React, { Component } from 'react';
import GroupItem from './GroupItem';

class GroupList extends Component {
  render() {
    return this.props.groups.map((group, i) => {
      return <GroupItem {...this.props} group={group} />;
    });
  }
}

export default GroupList;
