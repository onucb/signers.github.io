var links = document.getElementsByTagName('a');
for (var i = 0, _i = links.length; i < _i; i++) {
    if (links[i].innerHTML == 'download') {
        links[i].innerHTML = 'upload';
        break;
    }
}
