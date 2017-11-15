import { fetchUser, fetchRepos, fetchCommits } from '../../data/fetchedData';

export const addUser = ({ data, status }) => {
  return {
    type: 'ADD_USER',
    data,
    status
  }
};

export const addRepos = ({ data, status }) => {
  return {
    type: 'ADD_REPOS',
    data,
    status
  }
};

export const addCommits = ({ data, status }, repoid) => {
  return {
    type: 'ADD_COMMITS',
    data,
    status,
    repoid
  }
};

export const addUserAsync = user => async dispatch => {
  const userObj = await fetchUser(user);
  dispatch(addUser(userObj));
};

export const addReposAsync = user => async dispatch => {
  const repoObj = await fetchRepos(user);
  dispatch(addRepos(repoObj));
};

export const addCommitsAsync = (username, reponame) => async dispatch => {
  try {
    const repoObj = await fetchRepos(username);
    const commitsObj = await fetchCommits(username, reponame);
    const [repo] = repoObj.data.filter(repo => repo.name === reponame); //pull out needed repo from array of repos
    const repoid = repo.id; //pull repoid from repo itself
    dispatch(addCommits(commitsObj, repoid));
  } catch (e) {
    throw new Error(e);
  }
};