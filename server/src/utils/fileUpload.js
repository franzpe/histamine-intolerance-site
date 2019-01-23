import shortid from 'shortid';
import fs from 'fs';

const storeFS = ({ stream, filename, folderPath }) => {
  const id = shortid.generate();
  const path = `${folderPath}/${id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  );
};

export const processFileUpload = async (file, folderPath) => {
  const { filename, mimetype, createReadStream } = await file;
  const stream = createReadStream();
  const { id, path } = await storeFS({ stream, filename, folderPath });
  return { id, filename, mimetype, path };
};
