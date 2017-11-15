import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import UserInfo from './UserInfo';
import { connect } from 'react-redux';
import { addUserAsync, addReposAsync, addCommitsAsync } from '../store/actions/actions';
import {
  getUserReposByUsername,
  getRepoById,
  getCurrentRepoId,
  getSortedCommits
} from '../selectors/selectors';

class UserRepoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.match.params.username,
      repo: this.props.match.params.repo,
      loading: false
    };
  }
  componentDidMount() {
    this.getUser(this.state.username);
    this.getRepos(this.state.username);
    this.getCommits(this.state.username, this.state.repo);

    console.log(this.props.userCurrentRepo);
  }
  async getUser(username) {
    await this.props.addUserAsync(username);
  }
  async getRepos(username) {
    this.setState({ loading: true });
    await this.props.addReposAsync(username);
    this.setState({ loading: false });
  }
  async getCommits(username, reponame) {
    this.setState({ loading: true });
    await this.props.addCommitsAsync(username, reponame);
    this.setState({ loading: false });
  }
  listCommits() {
    const sortedCommits = this.props.userCommitsByRepo;
    return sortedCommits.map(commit => (
      <div key={commit.sha}>
        {commit.commit.message}<br />
        {commit.commit.author.name} commited {this.convertDate(commit.commit.author.date)} <br /><br />
      </div>
    ));
  }
  convertDate(date) {
    return moment(date).locale('en').format('Do MMMM YYYY HH:mm:ss');
  }
  render() {
    return (
      <div className="container">
        <div>
          {
            !_.isEmpty(this.props.users[this.state.username]) &&
            <UserInfo
              user={this.props.users[this.state.username]}
              location={this.props.location} />
          }
        </div>
        <div className="clearfix">
          <div className="pull-left">
            <h2>Commits:</h2>
          </div>
          <div className="pull-right">
            <Link to={"/" + this.state.username} className="btn btn-default">Back</Link>
            <Link to="/" className="btn btn-default">Back to Users</Link>
          </div>
        </div>
        {
          this.state.loading ?
            <div className="text-center">
              <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              <span className="sr-only">Loading...</span>
            </div> :
            <div className="panel">
              {!_.isEmpty(this.props.commits[this.props.repoId]) && this.listCommits()}
            </div>
        }
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  const [repoId] = getCurrentRepoId(state, props.match.params.repo);
  const userCurrentRepo = getRepoById(state, repoId);
  const userCommitsByRepo = getSortedCommits(state, repoId);
  return {
    users: state.users,
    repos: state.repos,
    commits: state.commits,
    repoId,
    userCurrentRepo,
    userCommitsByRepo
  }
};
export default connect(
  mapStateToProps,
  { addUserAsync, addReposAsync, addCommitsAsync }
)(UserRepoPage);