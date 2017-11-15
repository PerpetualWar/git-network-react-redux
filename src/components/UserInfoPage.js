import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import { connect } from 'react-redux';
import { addUserAsync, addReposAsync } from '../store/actions/actions';
import { getUserReposByUsername, getRepoById } from '../selectors/selectors';

class UserInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.match.params.username,
      loading: false
    };
  }
  componentDidMount() {
    this.getUser(this.state.username);
    this.getRepos(this.state.username);
  }
  async getUser(username) {
    await this.props.addUserAsync(username);
  }
  async getRepos(username) {
    this.setState({ loading: true });
    await this.props.addReposAsync(username);
    this.setState({ loading: false });
  }
  listRepos() {
    return this.props.userRepos.map(repo => (
      <div key={repo.id}>
        <div >
          <Link to={'/' + repo.full_name}>{repo.full_name}</Link>
          <br />
          {repo.description} <br /><br />
        </div>
      </div>
    ));
  }
  render() {
    return (
      <div className="container">
        <div>
          {!_.isEmpty(this.props.users[this.state.username]) &&
            <UserInfo
              user={this.props.users[this.state.username]}
              location={this.props.location} />
          }
        </div>
        <div className="clearfix">
          <div className="pull-left">
            <h2>Repositories:</h2>
          </div>
          <div className="pull-right">
            <Link to="/" className="btn btn-default">Back</Link>
          </div>
        </div>
        <div className="panel">
          {this.state.loading ?
            <div className="text-center">
              <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              <span className="sr-only">Loading...</span>
            </div> :
            <div>
              {!_.isEmpty(this.props.repos) && this.listRepos()}
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const userRepos = getUserReposByUsername(state, props.match.params.username).map(repoId => getRepoById(state, repoId));
  return {
    users: state.users,
    repos: state.repos,
    userRepos
  }
};
export default connect(
  mapStateToProps,
  { addUserAsync, addReposAsync }
)(UserInfoPage);