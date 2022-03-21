const ruuvi = require('node-ruuvitag');
const fetch = require('node-fetch');
const backend_url = "https://koodi101backend.herokuapp.com";

ruuvi.on('found', (tag) => {
  console.log(`Found RuuviTag with id: ${tag.id}`);

  tag.on('updated', (data) => {
    console.log(`${tag.id}: ${JSON.stringify(data)}`);

    //const body = { message: `temperature: ${data.temperature}` };
    const acceleration = { x: data.accelerationX, y: data.accelerationY, z: data.accelerationZ};
    const temperature = {temp: data.temperature};

    fetch(`${backend_url}/api/acceleration`, {
      method: 'post',
      body: JSON.stringify(acceleration),
      headers: { 'Content-Type': 'application/json' },
    });
    fetch(`${backend_url}/api/temperature`, {
      method: 'post',
      body: JSON.stringify(temperature),
      headers: { 'Content-Type': 'application/json' },
    });
  });
});