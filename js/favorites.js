const izb = document.querySelector('#izb');
const text = document.location.href.slice(document.location.href.indexOf("id=")+3, document.location.href.indexOf("&title="));

if (itemsArray.includes(text)) {
  izb.innerText = "✖️ Удалить из избранного"
}

izb.addEventListener('click', () => {

        if (izb.innerText == '➕ Добавить в избранное?') {//Проверяем текст кнопки
          izb.innerText = '🟢 Добавлено в список избранное!';//Меняем текст на "Добавлено!"
          itemsArray.push(text);
          localStorage.setItem('items', JSON.stringify(itemsArray));
          setTimeout(() => { //Задержка, чтобы заменить текст кнопки на исходный
            izb.innerText = "✖️ Удалить из избранного?";
             }, 1500);
        } else {
            izb.innerText = '🔴 Удалено из списка избранное!';//Меняем текст на "Добавлено!"
            itemsArray.splice(itemsArray.indexOf(text),1);
            localStorage.setItem('items', JSON.stringify(itemsArray));
            setTimeout(() => { //Задержка, чтобы заменить текст кнопки на исходный
              izb.innerText = "➕ Добавить в избранное?";
               }, 1500);
          }
      });
