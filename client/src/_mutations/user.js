const userMutations = {
  logout: (_, args, { cache, getCacheKey }, info) => {
    cache.writeData({ data: { isAuthenticated: false } });
    return null;
  }
};

export default userMutations;
