function getWeather() {

    const city = document.getElementById("city").value;

    console.log("City:", city);

    fetch("weather.json")
        .then(res => res.json())
        .then(data => {

            let w = data.find(
                x => x.city.toLowerCase() === city.toLowerCase()
            );

            if (w) {

                document.getElementById("result").innerHTML =
                    `${w.city}<br>
                     ${w.temperature}<br>
                     ${w.condition}`;

            } else {

                document.getElementById("result").innerHTML =
                    "City Not Found";

            }

        });
}