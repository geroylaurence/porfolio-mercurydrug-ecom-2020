const path = '/uploader';

// root processor
function uploaderLoader(endPoint, file) {
  return new Promise((resolve, reject) => {
    fetch(`${path}/${endPoint}`, {
      method: 'POST',
      body: file,
    })
    .then(response => {
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
    })
    .catch(err => {
      reject(err)
    });
  });
}

// functions processor
function prescriptionForCheckout(file) {
  // return new Promise((resolve, reject) => {
  //   fetch(`${path}/prescription-for-checkout`, {
  //     method: 'POST',
  //     body: file,
  //   })
  //   .then(result => {
  //     console.log(result);
  //     resolve({ data: null });
  //   })
  //   .catch(err => {
  //     reject(err);
  //   });
  // });
  return uploaderLoader(`prescription-for-checkout`, file);
}

export {
  prescriptionForCheckout,
};