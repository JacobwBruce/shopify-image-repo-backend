import axios from 'axios';

const INTERVAL_MINUTES = 20;

export default function keepAlive() {
    console.log('\n');
    setInterval(async function () {
        let date_ob = new Date();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        console.log(`TIMESTAMP ->\t ${hours}:${minutes}`);
        try {
            const { data } = await axios.get('https://shopify-image-repo.herokuapp.com');
            console.log(`${data}`);
        } catch (error) {
            console.log(`ERROR: ${error.message}`);
        }
    }, INTERVAL_MINUTES * 60 * 1000);
}
