import moment from 'moment';

// FUNCTIONS
function trimPathsFromURL(url, numOfPaths = 1) {
  // Trims number of path components specified as well as any parameters.
  const pathRegex = RegExp(`(/?[a-zA-Z0-9_\\-\\.~]+){${numOfPaths}}(\\?\\S+)?$`);
  const newURL = url.replace(pathRegex, '');
  return newURL;
}

function nameToAsc(a, b) {
  let nameA = a.name.toUpperCase();
  let nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}

function mathDecimal(num = 0.00) {
  try {
    return +(Math.round(num + "e+2")  + "e-2");
  } catch (err) {
    console.log(err);
    return 0.00
  }
}

function nodeDate(input) {
  try {
    return new Date(input);
  } catch(error) {
    return ``;
  }
}

function dateMoment(date, formatted) {
  return moment(date).format(formatted); 
}

function othersMarker() {
  let pattern = RegExp('others@*', 'i');
  return pattern;
}

function decimalPresentable(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function objectGetField(obj={}, propertyName='') {
  if (obj.hasOwnProperty(propertyName)) {
    return obj[propertyName];
  }
  return '';
}

function findFromArray(list=[], subject) {
  const [[key, value]] = Object.entries(subject);
  return list.find(item => item[key] === value);
}

function populateCookies() {
  // const cookieValues = document.cookie.split(';');
  // const cookieValues = `name=oeschger; favorite_food=tripe; test1=Hello; test2=World`.split(';');

  if (typeof document !== undefined) {
    const cookieValues = document.cookie.split(';');
    let inJSON = cookieValues.reduce((obj, item) => {
      let data = item.split('=');
      
      return {
        ...obj,
        [data[0]]: data[1]
      };
    }, {})

    return inJSON;
  }

  return ({});
}

// DATA SETS
const dateFormat = {
  default: 'YYYY-MM-DD HH:mm:ss.SSS',
  friendly: 'MMM DD, YYYY hh:mm A',
  orientdb: 'YYYY-MM-DD HH:mm:ss',
  simple: 'MM/DD/YYYY h:mm:ss A',
  bday:  'MMM DD, YYYY',
  MDY: 'MM/DD/YYYY',
  YMD: 'YYYY-MM-DD',
  year: 'YYYY',
};

export {
  dateFormat,
  dateMoment,
  decimalPresentable,
  findFromArray,
  mathDecimal,
  nameToAsc,
  nodeDate,
  othersMarker,
  objectGetField,
  populateCookies,
  trimPathsFromURL,
};