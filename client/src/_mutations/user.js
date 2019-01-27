const userMutations = {
  logout: (_, args, { cache, getCacheKey }, info) => {
    cache.writeData({ data: { isAuthenticated: false, isAuthenticating: false } });
    return null;
  }
};

export default userMutations;
