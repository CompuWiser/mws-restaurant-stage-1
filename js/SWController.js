(function SWController() {
    "use strict";

    if (!navigator.serviceWorker) return;

    window.addEventListener("load", function () {
        navigator.serviceWorker.register("./sw.js")
            .then(function (reg) {
                console.log("SW registration succeeded!");
                return reg;
            }).catch(function (error) {
                console.log("SW Registration failed, Error:" + error);
            });
    });

})();