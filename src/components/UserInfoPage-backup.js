import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import users from '../data/data';
import UserInfo from './UserInfo';

export default class UserInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      allIds: [],
      username: this.props.match.params.username,
      repos: {}
    };
    this.fetchUser = this.fetchUser.bind(this);
    this.fetchRepos = this.fetchRepos.bind(this);
  }
  componentDidMount() {
    this.fetchUser(this.state.username);
    this.fetchRepos(this.state.username);
  }
  fetchUser(username) {
    return axios
      .get('https://api.github.com/users/' + username)
      .then(res => {
        const usersObj = res.data;
        this.setState(prevState => ({
          // users: Object.assign(prevState.users, {[usersObj.login]:usersObj}),
          // allIds: prevState.allIds.concat(usersObj.login)
          users: { ...prevState.users, [usersObj.login]: usersObj },
          allIds: [...prevState.allIds, usersObj.login]
        }));
        console.log(this.state.users);
      })
      .catch(error => {
        console.log(error);
      });
  }
  fetchRepos(username) {
    return axios
      .get('https://api.github.com/users/' + username + '/repos')
      .then(res => {
        const reposObj = res.data;
        this.setState(prevState => ({
          repos: { ...prevState.repos, [username]: reposObj }
        }));
        console.log(this.state.repos[this.state.username][0]);
      })
      .catch(error => {
        console.log(error);
      });
  }
  listRepos() {
    return this.state.repos[this.state.username].map(repo => (
      <div>
        <li key={repo.id}>{repo.id}</li>
      </div>
    ))
  }
  render() {
    return (
      <div>
        {!_.isEmpty(this.state.users[this.state.username]) ? <UserInfo user={this.state.users[this.state.username]} /> : null}
        {!_.isEmpty(this.state.repos[this.state.username]) ? this.listRepos() : null}
      </div>
    );
  }
}