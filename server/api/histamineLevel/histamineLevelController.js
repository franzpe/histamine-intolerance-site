import HistamineLevel from './histamineLevelModel';

export const getOne = async value => {
  const histamineLevel = await HistamineLevel.where({
    value
  }).fetch();

  if (!histamineLevel) {
    throw new Error('No histamine level with the given value');
  }

  return histamineLevel.toJSON();
};

export const getAll = async () => {
  const histamineLevels = await HistamineLevel.fetchAll();
  return histamineLevels.toJSON();
};
