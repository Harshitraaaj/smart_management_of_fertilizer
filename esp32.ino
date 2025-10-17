#include <WiFi.h>
#include <HTTPClient.h>
#include <AsyncTCP.h>
//#include <ESPAsyncWebServer.h>
#include <WebServer.h>
#include "DHT.h"

// ---------- Wi-Fi ----------
const char* ssid = "Redmi Note 10 Lite";   // your hotspot SSID
const char* password = "volcano354578";    // your hotspot password

// ---------- Flask server ----------
const char* serverHost = "10.116.113.148";
const int serverPort = 5000;

// ---------- DHT Sensor ----------
#define DHTPIN 5
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// ---------- Soil Moisture ----------
const int soilAnalogPin = 34;

// ---------- Web server ----------
//AsyncWebServer server(80);

WebServer server(80);

// ---------- Sensor values ----------
float temperature = 0;
float humidity = 0;
int soilMoisture = 0;
int nitrogen = 0;
int phosphorus = 0;
int potassium = 0;

void connectToWiFi() {
  Serial.println("Initializing Wi-Fi...");
  WiFi.disconnect(true);
  delay(1000);
  WiFi.mode(WIFI_STA);
  delay(2000);

  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(ssid, password);

  int maxRetries = 50;
  while (WiFi.status() != WL_CONNECTED && maxRetries-- > 0) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConnected! IP: " + WiFi.localIP().toString());
  } else {
    Serial.println("\nFailed to connect to Wi-Fi. Restarting...");
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(soilAnalogPin, INPUT);

  connectToWiFi();

  // Serve /live_data endpoint
 server.on("/live_data", []() {
  String json = "{";
  json += "\"Temperature\":" + String(temperature) + ",";
  json += "\"Humidity\":" + String(humidity) + ",";
  json += "\"Moisture\":" + String(soilMoisture) + ",";
  json += "\"Nitrogen\":" + String(nitrogen) + ",";
  json += "\"Phosphorus\":" + String(phosphorus) + ",";
  json += "\"Potassium\":" + String(potassium);
  json += "}";
  server.send(200, "application/json", json);
});
server.begin();
}

void loop() {
  // ---------- Read sensors ----------
  float tempRead = dht.readTemperature();
  float humRead = dht.readHumidity();

  if (!isnan(tempRead)) temperature = tempRead;
  if (!isnan(humRead)) humidity = humRead;

  int rawMoisture = analogRead(soilAnalogPin);
  Serial.print("Raw moisture value: ");
  Serial.println(rawMoisture);

  soilMoisture = map(rawMoisture, 4095, 0, 0, 100);
  // ---------- Simulate NPK readings ----------
  // If soilMoisture < 10, assume NPK sensor is disconnected → show 0
  if (soilMoisture < 10) {
    nitrogen = 0;
    phosphorus = 0;
    potassium = 0;
  } else {
    nitrogen = random(30, 60);
    phosphorus = random(15, 40);
    potassium = random(10, 35);
  }

  // ---------- Prepare JSON ----------
  String jsonData = "{";
  jsonData += "\"Temperature\":" + String(temperature) + ",";
  jsonData += "\"Humidity\":" + String(humidity) + ",";
  jsonData += "\"Moisture\":" + String(soilMoisture) + ",";
  jsonData += "\"Nitrogen\":" + String(nitrogen) + ",";
  jsonData += "\"Phosphorus\":" + String(phosphorus) + ",";
  jsonData += "\"Potassium\":" + String(potassium);
  jsonData += "}";

  Serial.println("Sending POST: " + jsonData);

  // ---------- Send POST to Flask ----------
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String serverURL = String("http://") + serverHost + ":" + String(serverPort) + "/predict";
    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(jsonData);
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Response: " + response);
    } else {
      Serial.println("POST Error: " + String(httpResponseCode));
    }
    http.end();
  } else {
    Serial.println("Wi-Fi disconnected! Reconnecting...");
    connectToWiFi();
  }
  
    // ---------- Handle incoming web requests ----------
  server.handleClient();
  delay(5000); // repeat every 5 seconds
}
