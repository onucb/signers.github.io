const pass = JSON.parse(localStorage.getItem('pass'))
if (pass != window.hash.acthash) {
  window.location.href = '/password';
}
