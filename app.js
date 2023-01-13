const { Webhook } = require('discord-webhook-node');
const rp = require('request-promise');
require('dotenv').config()

const hook = new Webhook(`${process.env.WEBHOOK}`);
const IMAGE_URL = 'https://tun-chemnitz.de/media/images/IMG_20220827_135030.max-640x480.jpg';

hook.setUsername('ChChHook');
hook.setAvatar(IMAGE_URL);

let currentStatus = false;

function currentStatusRead(currentStatus) {
    if (currentStatus === false) {
        return 'geschlossen';
    } else {
        return 'offen';
    }
}

const options = {
    url: 'https://chch.it/chch.json',
};

setInterval(function() {
    rp(options)
        .then((body) => {
            const json = JSON.parse(body);
            if (currentStatus !== json.state.open) {
                currentStatus = json.state.open;
                hook.send(`ChCh ist jetzt ${currentStatusRead(currentStatus)}`);
                console.log(json.state.open);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}, 60 * 1000);
