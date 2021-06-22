const wsUri = "wss://echo.websocket.org/";

const output = document.getElementById("output");
const btnOpen = document.querySelector('.j-btn-open');
const btnSend = document.querySelector('.j-btn-send');
const inputMsg = document.querySelector('.inputMsg');
const geo = document.querySelector('.geo');
let websocket;

function writeToScreen(message,type='user') {
  if(type == 'user'){
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.className = 'my messege';
    pre.innerHTML = message;
    output.appendChild(pre);
  }else if(type='server'){
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.className = 'server messege';
    pre.innerHTML = message;
    output.appendChild(pre);
  }

}

btnOpen.addEventListener('click', () => {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    writeToScreen("CONNECTED","server");
  };
  websocket.onclose = function(evt) {
    writeToScreen("DISCONNECTED","server");
  };
  websocket.onmessage = function(evt) {
    writeToScreen(
      'Сообщение сервера: ' + evt.data+'',"server"
    );
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      'ERROR:' + evt.data,"server"
    );
  };
});


btnSend.addEventListener('click', () => {
  let message = inputMsg.value;
  writeToScreen("Сообщение отправителя: " + message);
  websocket.send(message);
});


  function geoFindMe() {

    const status = output;
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      writeToScreen("Сообщение отправителя: Запрос Гео-локация");
      websocket.send(`<a target="_blank" href="https://www.openstreetmap.org/#map=11/${latitude}/${longitude}">Посмотреть гео-локацию</a>`);

    }
  
    function error() {

    }
  
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }


  
  }
  geo.addEventListener('click', () => {
    geoFindMe();
  });
