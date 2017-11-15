import axios from 'axios';

export const fetchUser = async username => {
  try {
    const { data, status } = await axios.get('https://api.github.com/users/' + username);
    return { data , status } || {};
  } catch (e) {
    throw new Error(e);
  }
}
export const fetchRepos = async username => {
  try {
    const { data, status } = await axios.get('https://api.github.com/users/' + username + '/repos');
    return { data, status } || {};
  } catch (e) {
    throw new Error(e);
  }
}
export const fetchCommits = async (username, reponame) => {
  try {
    const { data, status } = await axios.get('https://api.github.com/repos/' + username + '/' + reponame + '/commits');
    return { data, status } || {};
  } catch (e) {
    throw new Error(e);
  }
}