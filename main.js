

function dateBuilder(d) {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

    const DATE_FORMAT_OPTIONS = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZoneName: "short",
    }
    return d.toLocaleDateString("en-US", DATE_FORMAT_OPTIONS)
    // return `${day}, ${date} ${month} ${year}`
}

document.getElementById("city_name").addEventListener('focusout', () => {
    var api_key = "29346203d0e46ae9bb0bea11b0ab1a27";
    var base_url = "http://api.openweathermap.org/data/2.5/weather?";
    const city_name = document.getElementById("city_name");
    if (city_name.value == '') {
        return;
    }
    const d = new Date();

    // debugger;
    var complete_url = base_url + "appid=" + api_key + "&q=" + city_name.value + "&units=metric";
    //alert(complete_url);
    fetch(complete_url).then(response => response.json()).then(json => {
        //alert(json.cod);
        // alert(json.weather[0].main);
        if (json.cod == '404') {

            alert("City not found");
        }
        console.log(json);
        document.querySelector(".city").innerHTML = json.name;
        document.querySelector(".date").innerHTML = dateBuilder(d);
        document.querySelector(".temp").innerHTML = json.main.temp;
        document.querySelector(".hi-low").innerHTML = json.main.temp_min + "°c" + "/" + json.main.temp_max + "°c";
        document.querySelector(".weather").innerHTML = json.weather[0].main;
        //alert(json.name+json.main[0].main.timezone);
    });

});



