import { extname, basename } from 'path';
import * as fs from 'fs';

let uploadedFilePath: string;
export const editFileName = (req, logo_file, callback) => {
  // Customize the filename as per your requirement
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");
  const orgname = basename(
    logo_file.originalname,
    extname(logo_file.originalname),
  );
  var extension = extname(logo_file.originalname);
  // uploadedFilePath = `${orgname}_${randomName}${extension}`;
    extension = ".jpg";
  callback(null, `${randomName}${extension}`);
};
export const editFileNameEmployee = (req, file, callback) => {
  // console.log(req.body);
  var extension = extname(file.originalname);
  
  // console.log(extension);
  extension = ".jpg";
  const organization_id = req.query.orgId;
  // console.log("organization_id==", organization_id)
  callback(null, `${organization_id}${extension}`);
};
export const editFileNameUser = (req, file, callback) => {
  console.log(file);
  var extension = extname(file.originalname);
  console.log(extension);
  extension = ".jpg";
  // uploadedFilePath = `${orgname}_${randomName}${extension}`;
  callback(null, `${req.user.id}${extension}`);
  // callback(null, `${req.user.users?.[0].id}${extension}`); image name of user id
};
export const getUploadedFilePath = () => uploadedFilePath;
export const PaginationQuery = (field): any => {
  var filters = {};
  field.map((i) => {
    if (i.value != null && i.value != undefined) {
      switch (i.operator) {
        case 'IN':
          const lvalue = i.value.split(' ');

          filters[i.key] = lvalue;
          break;
        case 'LIKE':
          i.value = i.value != null ? `%${i.value}%` : '';
          filters[i.key] = i.value;
          break;
        default:
          filters[i.key] = i.value;
          break;
      }
    }
  });
  return filters;
};
export const checkFileSize = (size: number) => {
  return size > 5000000;
};
export function validateImageFile(file: Express.Multer.File): boolean {
  if (!file) {
    return false; // No file provided
  }
  const allowedExtensions = [
    'jpg',
    'jpeg',
    'png',
    'bmp',
    'tif',
    'tiff',
    'svg',
    'swf',
    'gif',
    'eps',
    'PSD',
    'RAW',
    'HEIF',
    'AVIF',

  ];
  const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    return false; // Invalid file extension
  }
  return true;
}
export const deletefile = (path) => {
  let filepath = './upload/' + `${path}`;
  fs.unlink(filepath, (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log('image deleted successfully');
  });
};
