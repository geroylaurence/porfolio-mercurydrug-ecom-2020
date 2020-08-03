// object key "error" type string
function alertError(err) {
  if (err.error && typeof err.error === 'string') {
    alert(err.error);
  } else {
    alert('Failed to process, Please try again.');
  }
}

export {
  alertError,
};