import request from '../middleware/request';

const endPoint = 'address';

function list() {
  return request(`${endPoint}/list`);
}

function createNew({
  contactName,
  contactNumber,
  secondaryContact,
  addressLine1,
  addressLine2,
  barangay,
  city,
  province,
  zipCode,
}) {
  return request(`${endPoint}/add`, {
    contactName,
    contactNumber,
    secondaryContact,
    addressLine1,
    addressLine2,
    barangay,
    city,
    province,
    zipCode,
  });
}

function validatorCreateNew({
  contactName,
  contactNumber,
  secondaryContact,
  addressLine1,
  addressLine2,
  barangay,
  city,
  province,
  zipCode,
}) {
  let propertyCheck = [];
  if (!contactName || contactName === `` || contactName === null || contactName === undefined) 
    propertyCheck = [...propertyCheck, {contactName: 1}];
  if (!contactNumber || contactNumber === `` || contactNumber === null || contactNumber === undefined || contactNumber.match(/^[(]{0,1}[0-9]{1,4}[)]{0,1}[-./0-9]*$/g) === null || contactNumber.length < 10) 
    propertyCheck = [...propertyCheck, {contactNumber: 1}];
  if (secondaryContact && (secondaryContact.match(/^[(]{0,1}[0-9]{1,4}[)]{0,1}[-./0-9]*$/g) === null || secondaryContact.length < 10)) 
    propertyCheck = [...propertyCheck, {secondaryContact: 1}];
  if (!addressLine1 || addressLine1 === `` || addressLine1 === null || addressLine1 === undefined) 
    propertyCheck = [...propertyCheck, {addressLine1: 1}];
  if (!barangay || barangay === `` || barangay === null || barangay === undefined)
    propertyCheck = [...propertyCheck, {barangay: 1}];
  if (!city || city === `` || city === null || city === undefined) 
    propertyCheck = [...propertyCheck, {city: 1}];
  if (!province || province === `` || province === null || province === undefined) 
    propertyCheck = [...propertyCheck, {province: 1}];
  if (!zipCode || zipCode === `` || zipCode === null || zipCode === undefined) 
    propertyCheck = [...propertyCheck, {zipCode: 1}];

  return propertyCheck; 
}

export {
  createNew,
  list,

  validatorCreateNew,
};