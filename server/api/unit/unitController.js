import Unit from './unitModel';

export const getOne = async id => {
  const unit = await Unit.where({
    id
  }).fetch();

  if (!unit) {
    throw new Error('No unit with the given id');
  }

  return unit.toJSON();
};

export const getAll = async () => {
  const units = await Unit.fetchAll();
  return units.toJSON();
};
