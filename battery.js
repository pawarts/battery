let output_level = document.getElementById("output_level");
let output_charge = document.getElementById("output_charge");
let output_time = document.getElementById("output_time");

let battery_status = document.getElementById("battery_status");

navigator.getBattery()
    .then((battery) => {

        let battery_level_text = `${battery.level * 100}%`;
        let output_time_text = '';

        output_charge.innerText = `${!battery.charging ? 'Розрядка' : 'Заряджання'}`;

        output_time.innerText = output_time_text;

        battery_status.style.height = `${100 - (battery.level * 100)}%`;

        if(!battery.charging){
            output_time_text =`${battery.dischargingTime / 60 }` + "хв";

            if(battery.dischargingTime.length < 3){
                output_time_text.slice(0, 3)
            } else {
                output_time_text.slice(0, 2)
            }

            output_time.innerText = output_time_text

            battery.addEventListener("dischargingtimechange", () => {
                output_time.innerText = output_time_text
            });


        } else {

            output_time_text =`${battery.chargingTime / 60 }`;

            if(battery.chargingTime.length < 3){
                output_time_text.slice(0, 3)
            } else {
                output_time_text.slice(0, 2)
            }

            output_time.innerText = output_time_text

            battery.addEventListener("chargingtimechange", () => {
                output_time.innerText = output_time_text;
            });

        }

        output_level.innerText = battery_level_text.slice(0, 2) + '%';

        battery.addEventListener("chargingchange", () => {
            output_charge.innerText = `${!battery.charging ? 'Розрядка' : 'Заряджання'}`;
        });

        battery.addEventListener("levelchange", () =>{
            output_level.innerText = battery_level_text.slice(0, 2) + '%';

            battery_status.style.height = `${100 - (battery.level * 100)}%`;

            if(battery.level === 0.1){
                Notification.requestPermission().then(notification => {
                    if(notification === "granted"){
                        new Notification("Battery manager", {
                            body: "Увага залишилось менше 10% зарядки. Приєднайте пристрій до живлення.",
                        });
                    }
                })
            }
        });


    })