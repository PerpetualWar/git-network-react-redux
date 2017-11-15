import _ from 'lodash';

export const users = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        [action.data.login]: action.data
      };
    default:
      return state;
  }
};

export const repos = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_REPOS':
      const newState = { ...state };
      action.data.forEach(repo => {
        newState[repo.id] = repo;
      });
      return newState;
    default:
      return state;
  }
};

export const commits = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_COMMITS':
      const newState = { ...state };
      if (!newState[action.repoid]) {
        newState[action.repoid] = {};
      }
      action.data.forEach((commit) => {
        newState[action.repoid][commit.sha] = commit;
      });
      return newState;
    default:
      return state;
  }
};