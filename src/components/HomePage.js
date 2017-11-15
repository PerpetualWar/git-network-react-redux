import React from 'react';
import users from '../data/data';
import UserInfo from './UserInfo';
import { connect } from 'react-redux';
import { addUserAsync } from '../store/actions/actions';

export class HomePage extends React.Component {

  componentDidMount() {
    users.forEach(obj => {
      this.props.addUserAsync(obj.username);
    })
  }
  listUsers() {
    const { users } = this.props;
    const { location } = this.props;
    const usersKeys = Object.keys(users);
    return usersKeys.map(username => <UserInfo key={users[username].id} user={users[username]} location={location} />)
  }
  render() {
    return (
      <div className="container">
        {this.listUsers()}
      </div>
    );
  }
}
const mapStateToProps = state => ({ users: state.users });
export default connect(mapStateToProps, { addUserAsync })(HomePage);