const ruuvi = require('node-ruuvitag');
const fetch = require('node-fetch');

ruuvi.on('found', (tag) => {
  console.log(`Found RuuviTag with id: ${tag.id}`);

  tag.on('updated', (data) => {
    console.log(`${tag.id}: ${JSON.stringify(data)}`);

    //const body = { message: `temperature: ${data.temperature}` };
    const body = { x: data.accelerationX, y: data.accelerationY, z: data.accelerationZ };

    fetch('http://95.216.143.30:9000/api/acceleration', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
  });
});
