const { invoke } = window.__TAURI__.tauri;


async function updateTemp(){
  try{

    const temperature = await invoke("get_tem_command", {});

    document.getElementById('temperature_display').innerHTML = `Temperature: ${temperature}°C`;
  } catch (error){
    document.getElementById('temperature_display').innerHTML = `Couldn't load`;
    console.error("Couldn't load temp", error);
  };
}

window.addEventListener('load', updateTemp);

