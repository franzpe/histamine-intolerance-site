import Picture from './pictureModel';

export const getOne = async id => {
  const picture = await Picture.where({
    id
  }).fetch();

  return picture && picture.toJSON();
};
