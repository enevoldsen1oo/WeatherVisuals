const { invoke } = window.__TAURI__.tauri;


async function getPArray() {
  let particlesarray = await invoke("canvas_particles", {}); // Assign a value to particlesarray
  return particlesarray;
}

async function updateTemp() {
  try {
    const temperature = await invoke("get_tem_command", {});
    const weatherDetails = await invoke("get_details_command", {});

    document.getElementById('temperature_display').innerHTML = `Temperature: ${temperature}°C`;
    document.getElementById('details_display').innerHTML = `${weatherDetails}`;
  } catch (error) {
    document.getElementById('temperature_display').innerHTML = `Couldn't load`;
    console.error("Couldn't load temp", error);
  }
}

window.addEventListener('load', updateTemp);

export { getPArray };
