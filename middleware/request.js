export default (path, data = {}) => {
  return new Promise((resolve, reject) => {
    fetch(`/${path}`, {
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', },
      method: 'POST'
    })
    .then((response) => {
      if (response.status === 401) {
        window.location = '/';
      }

      if (response.ok) {
        return response.json()
        .then((data) => {
          return resolve(data);
        }).catch((err) => {
          return resolve({});
        });
      } else {
        return response.json()
        .then(ref => {
          return reject(ref);
        }).catch(err => {
          return resolve({});
        });
      }

      // return response.text().then((text = 'Unknown error.') => {
      //   return reject(new Error(text));
      // });
    })
    .catch(err => {
      reject(err)
    });
  });
};