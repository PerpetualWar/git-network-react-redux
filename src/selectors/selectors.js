export const getUserReposByUsername = (state, username) => {
  return Object.keys(state.repos).filter(repoId => state.repos[repoId].owner.login === username);
};

export const getRepoById = (state, repoId) => {
  return state.repos[repoId];
};

export const getCurrentRepoId = (state, repoName) => Object.keys(state.repos).filter(repoId => state.repos[repoId].name === repoName)

export const getSortedCommits = (state, repoId) => Object.keys(state.commits[repoId] || [])
.map(sha => state.commits[repoId][sha])
.sort((a, b) => {
  const date1 = a.commit.author.date;
  const date2 = b.commit.author.date;
  return new Date(date1).getTime() - new Date(date2).getTime()
})
.reverse()
.slice(0, 10)