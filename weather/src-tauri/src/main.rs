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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_tem_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}