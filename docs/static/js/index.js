document.querySelectorAll('.container-events > .event').forEach(function(elem) {
  elem.addEventListener('click', function() {
    document.querySelector('.modal').style.display = 'flex';
    document.querySelector('.modal > img').src = elem.dataset.purl;
  });
});

document.querySelector('.modal').addEventListener('click', function() {
  document.querySelector('.modal').style.display = 'none';
});
