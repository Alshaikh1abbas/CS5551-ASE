//Be sure the page is loaded before setting event handlers
$(function(){
    $("#searchBtn").click(createWeatherDisplay);
});

function createWeatherDisplay() {
    let location = $("#city").val() + ", " + $("#country").val();
    let canvas = document.getElementById("weatherCanvas");

    //Resize canvas
    let canvasWidth = 800;
    let canvasHeight = 525;
    canvas.setAttribute("width", canvasWidth.toString());
    canvas.setAttribute("height", canvasHeight.toString());

    //Load and draw current weather info
    $.get("http://api.openweathermap.org/data/2.5/weather?q=" + location +
        "&units=imperial&APPID=fc52e8acb25601f279518cf1b7df54fc",
        function( data ) {
            drawCurrentWeather(canvas, data);
        }, "json" )
        .fail(errorAlert)
        .done(function(){
            //Load and draw next 24 hour forecast
            $.get("http://api.openweathermap.org/data/2.5/forecast?q=" + location +
                "&units=imperial&APPID=fc52e8acb25601f279518cf1b7df54fc",
                function( data ) {
                    drawForecast(canvas, data.list);
                }, "json" )
                //Error check in the event the connection is lost between
                // making the second api call or another unexpected error
                .fail(errorAlert);
        });
}

function errorAlert(xhr) {
    alert(xhr.readyState == 4 ? "Unable to find entered city" : "Unable to connect");
}

function drawCurrentWeather(canvas, curWeather) {
    let curFontSize = 35;
    let rightColX = 500;
    let secondRowY = 75;
    let thirdRowY = secondRowY + 60;

    let context = canvas.getContext("2d");

    context.font = curFontSize +"px Arial";
    context.fillText(curWeather.name + ", " + curWeather.sys.country, 0, curFontSize);

    let curWeatherImg = new Image();
    curWeatherImg.src = "https://openweathermap.org/img/wn/" + curWeather.weather[0].icon + "@2x.png";
    curWeatherImg.onload = function() {
        // Tweaked image position for it to look centered
        context.drawImage(curWeatherImg, -15, secondRowY - 20);

        curFontSize = 50;
        context.font = curFontSize + "px Arial";
        context.fillText(parseFloat(curWeather.main.temp).toFixed(0) + "°F",
            curWeatherImg.width, curFontSize + secondRowY);
    }

    curFontSize = 25;
    context.font = curFontSize + "px Arial";
    context.fillText(curWeather.weather[0].main, 5, thirdRowY + curFontSize);

    let spaceSize = 5;
    context.fillText("Feels like " + parseFloat(curWeather.main.feels_like).toFixed(0)
        + "°F", rightColX, secondRowY + curFontSize);

    context.fillText("Humidity " + curWeather.main.humidity + "%", rightColX,
        secondRowY + curFontSize * 2 + spaceSize);

    context.fillText("Wind " + parseFloat(curWeather.wind.speed).toFixed(0) +
        " mph", rightColX, secondRowY + curFontSize * 3 + spaceSize * 2);
};

function drawForecast(canvas, hourly) {
    let context = canvas.getContext("2d");
    let graphHeight = 150;
    let hourlyWidthSpace = 100;

    //Create temperature array to calculate positions of bar graph
    let tempArray = [];
    for (let i = 0; i < 8; ++i)
        tempArray.push(parseFloat(hourly[i].main.temp).toFixed(0));
    let lowestTemp = Math.min(...tempArray);
    let tempMulti = graphHeight / (Math.max(...tempArray) - lowestTemp);

    for (let i = 0; i < 8; ++i) {
        let hourTemp = tempArray[i];
        let hourTempTop = (canvas.height - 125) - ((hourTemp - lowestTemp) * tempMulti);
        context.beginPath();
        context.moveTo(i * hourlyWidthSpace + 13, canvas.height - 100);
        context.lineTo(i * hourlyWidthSpace + 13, hourTempTop);
        context.lineTo((i * hourlyWidthSpace) + 38, hourTempTop);
        context.lineTo((i * hourlyWidthSpace) + 38, canvas.height - 100);
        context.closePath();
        context.stroke();
        //Using 45 as a midpoint for temperature where less than 45 degrees is cold/blue
        //and above is warm/orange
        context.fillStyle = hourTemp > 45 ? "rgb(255, 150, 0)" : "rgb(0, 150, 255)";
        context.fill();
        
        //Return text to default black color
        context.fillStyle = "black";

        let hourTime = new Date(parseInt(hourly[i].dt) * 1000);
        context.font = "25px Arial";
        context.fillText(hourTime.toLocaleString("en-US",
            {hour:'numeric', hour12:true}), i * 100, canvas.height - 75);

        let hourWeatherImg = new Image();
        hourWeatherImg.src = "https://openweathermap.org/img/wn/" + hourly[i].weather[0].icon + ".png";
        hourWeatherImg.onload = function() { context.drawImage(hourWeatherImg,
            i * 100, canvas.height - 75); };

        //Temperature text display
        context.fillText(hourTemp + "°F", i * 100, canvas.height);
    }
};