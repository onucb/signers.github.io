/* return input field to variable text */
var text = document.getElementById("inputText1");

/* return button to variable btn */
var btn = document.getElementById("copyText1");

/* call function on button click */
btn.onclick = function() {
  text.select();    
  document.execCommand("copy");
  alert('✅ номер карты скопирован в буфер обмена: \n\n 4274320069762147 ');
}
