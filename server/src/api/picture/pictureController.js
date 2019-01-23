import Picture from './pictureModel';

export const getOne = async id => {
  const picture = await Picture.where({
    id
  }).fetch();

  if (!picture) {
    throw new Error('No picture with the given id');
  }

  return picture.toJSON();
};
