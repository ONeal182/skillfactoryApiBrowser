const arrow = document.querySelector('.arrow');
const getUser = document.querySelector('.getUser');
const textDev = document.querySelector('.text');
let latitude;
let longitude;
let timeZone;
let dateTimeTxt;
arrow.addEventListener('click', () => {
    let svg = document.querySelector('.arrow .bi-arrow-down-left-circle');
    if (svg) {
        arrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768l4.096-4.096z"/>
  </svg>`;
    } else {
        arrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-5.904-2.854a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768l4.096-4.097z"/>
      </svg>`;

    }

});

const error = () => {
    textDev.textContent = `Информация о местоположении недоступна Ширина экрана ${window.screen.width} Высота экрана ${window.screen.height}`;
}

const success = async (position) => {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    await fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
        .then((response) => {
            const result = response.json();
            return result;
        }).then((data) => {

            timeZone = data.timezone;
            dateTimeTxt = data.date_time_txt;

        })

    textDev.innerHTML = `Ширина экрана ${window.screen.width} Высота экрана ${window.screen.height} Координаты ${latitude} ${longitude} ${timeZone} ${dateTimeTxt}`;
}



const getUserInfo = () => {

    getUser.addEventListener('click', () => {
        if (!navigator.geolocation) {
            textDev.textContent = 'Geolocation не поддерживается вашим браузером';
        } else {
            textDev.textContent = 'Определение местоположения…';
            navigator.geolocation.getCurrentPosition(success, error);


        }


    })


}
getUserInfo();

