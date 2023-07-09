(function () {
    var hours = document.querySelector(".hour");
    var min = document.querySelector(".minute");
    var sec = document.querySelector(".second");

    var btn_stop = document.querySelector(".stop");
    var btn_reset = document.querySelector(".reset");
    var btn_start = document.querySelector(".start");

    var countdownTimer = null;

    btn_start.addEventListener("click", function () {
        if (hours.value == 0 && min.value == 0 && sec.value == 0) return;

        function startIntervals() {
            btn_start.style.display = "none";
            btn_stop.style.display = "initial";

            countdownTimer = setInterval(function () {
                timer();
            }, 1000);
        }
        startIntervals();
    });
    function stopIntervals(state) {
        btn_start.innerText = state == "pause" ? "continue" : "start";

        btn_start.style.display = "initial";
        btn_stop.style.display = "none";

        clearInterval(countdownTimer);
    }

    function timer() {
        if (sec.value > 60) {
            min.value++;
            sec.value = parseInt(sec.value) - 59;
        } else if (min.value > 60) {
            hours.value++;
            min.value = parseInt(min.value) - 60;
        }

        if (hours.value == 0 && min.value == 0 && sec.value == 0) {
            hours.value = "";
            min.value = "";
            sec.value = "";
            stopIntervals();
        } else if (sec.value != 0) {
            sec.value = `${sec.value <= 10 ? "0" : ""}${sec.value - 1}`;
        } else if (min.value != 0 && sec.value == 0) {
            sec.value = 59;
            min.value = `${min.value <= 10 ? "0" : ""}${min.value - 1}`;
        } else if (hours.value != 0 && min.value == 0) {
            min.value = 60;
            hours.value = `${hours.value <= 10 ? "0" : ""}${hours.value - 1}`;
        }
    }

    btn_stop.addEventListener("click", function () {
        stopIntervals("pause");
    });

    btn_reset.addEventListener("click", function () {
        hours.value = "";
        min.value = "";
        sec.value = "";

        stopIntervals("stop");
    });
})();
