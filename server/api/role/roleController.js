import Role from './roleModel';

export const getAll = async () => {
  const roles = await Role.fetchAll();
  return roles.toJSON();
};

export const getOne = async id => {
  const role = await Role.where({
    id: id
  }).fetch();

  if (!role) {
    throw new Error('No role with given id');
  }

  return role.toJSON();
};
