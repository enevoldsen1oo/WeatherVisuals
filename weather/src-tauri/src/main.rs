use reqwest::blocking::get;
use scraper::{Html, Selector};

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn get_temperature() -> Result<String, Box<dyn std::error::Error>> {
    let res = get("https://weather.com/en-GB/weather/today/l/3fd4510cdbe3d4da253ec11de971ac7a70c48de14de932ee4f65608f7943656c")?;

    // Parse the HTML response
    let html = Html::parse_document(&res.text()?);

    // Use a CSS selector to find the temperature element
    let temp_selector = Selector::parse(".CurrentConditions--primary--2DOqs>span").unwrap();
    let temp_element = html.select(&temp_selector).next().unwrap();

    let temp = temp_element.text().collect::<Vec<_>>()[0].to_string();

    Ok(temp)
}

#[tauri::command]
fn get_tem_command() -> String {
    get_temperature().unwrap()
}


fn get_details() -> Result<String, Box<dyn std::error::Error>> {
    let res = get("https://weather.com/en-GB/weather/today/l/3fd4510cdbe3d4da253ec11de971ac7a70c48de14de932ee4f65608f7943656c")?;

    // Parse the HTML response
    let html = Html::parse_document(&res.text()?);

    // Use a CSS selector to find the temperature element
    let det_selector = Selector::parse(".CurrentConditions--phraseValue--mZC_p").unwrap();
    let det_element = html.select(&det_selector).next().unwrap();

    let det = det_element.text().collect::<Vec<_>>()[0].to_string();
    

    Ok(det)
}

#[tauri::command]
fn get_details_command() -> String {
    get_details().unwrap()
}


#[tauri::command]
fn canvas_particles() -> Vec<bool> {
    // Particles in vector by index is [Sun, clouds, rain, grass]
    let details = get_details_command();
    
    let mut vec: Vec<bool> = Vec::new();
    
    match details.as_str() {
        "Sunny" => {vec.push(true); vec.push(false); vec.push(false); vec.push(true)},
        "Clear" => {vec.push(true); vec.push(false); vec.push(false); vec.push(true)},
        "Rain" => {vec.push(false); vec.push(true); vec.push(true); vec.push(true)},
        "Wind" => {vec.push(false); vec.push(true); vec.push(false); vec.push(true)},
        "Cloudy" => {vec.push(false); vec.push(true); vec.push(false); vec.push(true)},
        _ => {vec.push(true); vec.push(false); vec.push(false); vec.push(true)},
    };

    vec
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_tem_command, get_details_command, canvas_particles])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}