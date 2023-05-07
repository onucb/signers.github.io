const input = document.getElementById('txt');
window.hash = {
                  acthash: "59881a09c55eeab0d18c42ff6f803ce4"
                };
function search69() {
                var text = document.getElementById('txt').value;
                     if (MD5(input.value)==hash.acthash) { 
                       localStorage.removeItem('pass');
                       localStorage.setItem('pass', JSON.stringify(hash.acthash));
                       location.href='/tgbot/';
                     } else {
                       alert('📵 НЕправильный Пароль‼️ \n Пароль ДОЛЖЕН быть БЕЗ пробела В начале и конце‼️');
                       localStorage.removeItem('pass');
                       localStorage.setItem('pass', JSON.stringify("Kynu nognucky uJlu noLLIeJl Haxyū")); 
                     }
              };
              $(document).ready(function() {
                $("#txt").keypress(function(e) {
                  if (e.keyCode == 13) {
                    //нажата клавиша enter - здесь ваш код
                    search69();
                  }
                });
              });
