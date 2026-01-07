#include <WiFi.h>
#include <HTTPClient.h>
#include <WebServer.h>
#include "DHT.h"

// ---------- Wi-Fi ----------
const char* ssid = "DON";
const char* password = "harshit2315";

// ---------- Flask server ----------
const char* serverHost = "192.168.0.108";
const int serverPort = 5000;

// ---------- DHT Sensor ----------
#define DHTPIN 4              // ✅ DATA connected to GPIO 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// ---------- Soil Moisture ----------
const int soilAnalogPin = 34;

// ---------- Web server ----------
WebServer server(80);

// ---------- Sensor values ----------
float temperature = 0.0;
float humidity = 0.0;
int soilMoisture = 0;
int nitrogen = 0;
int phosphorus = 0;
int potassium = 0;

// ---------- Wi-Fi ----------
void connectToWiFi() {
  Serial.println("Initializing Wi-Fi...");
  WiFi.disconnect(true);
  delay(1000);
  WiFi.mode(WIFI_STA);

  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(ssid, password);

  int retries = 50;
  while (WiFi.status() != WL_CONNECTED && retries-- > 0) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConnected! IP: " + WiFi.localIP().toString());
  } else {
    Serial.println("\nWi-Fi connection failed!");
  }
}

void setup() {
  Serial.begin(115200);

  // ---------- DHT ----------
  dht.begin();
  delay(2000);                 // ✅ REQUIRED warm-up for DHT11

  pinMode(soilAnalogPin, INPUT);

  connectToWiFi();

  // ---------- Optional ESP32 local endpoint ----------
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
  // ---------- Read DHT ----------
  float tempRead = dht.readTemperature();
  float humRead  = dht.readHumidity();

  Serial.print("DHT Temp: ");
  Serial.print(tempRead);
  Serial.print(" °C | Hum: ");
  Serial.println(humRead);

  if (!isnan(tempRead)) temperature = tempRead;
  if (!isnan(humRead))  humidity = humRead;

  // ---------- Read Soil Moisture ----------
  int rawMoisture = analogRead(soilAnalogPin);
  Serial.print("Raw moisture value: ");
  Serial.println(rawMoisture);

  // ✅ Simple mapping (works for your case)
  soilMoisture = map(rawMoisture, 4095, 0, 0, 100);
  soilMoisture = constrain(soilMoisture, 0, 100);

  if (soilMoisture < 5) soilMoisture = 0;

  // ---------- Simulated NPK ----------
  if (soilMoisture == 0) {
    nitrogen = 0;
    phosphorus = 0;
    potassium = 0;
  } else {
    nitrogen = random(30, 60);
    phosphorus = random(15, 40);
    potassium = random(10, 35);
  }

  // ---------- JSON ----------
  String jsonData = "{";
  jsonData += "\"Temperature\":" + String(temperature) + ",";
  jsonData += "\"Humidity\":" + String(humidity) + ",";
  jsonData += "\"Moisture\":" + String(soilMoisture) + ",";
  jsonData += "\"Nitrogen\":" + String(nitrogen) + ",";
  jsonData += "\"Phosphorus\":" + String(phosphorus) + ",";
  jsonData += "\"Potassium\":" + String(potassium);
  jsonData += "}";

  Serial.println("Sending POST: " + jsonData);

  // ---------- POST to Flask ----------
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String serverURL = String("http://") + serverHost + ":" + serverPort + "/sensor_data";
    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");

    int code = http.POST(jsonData);
    if (code > 0) {
      Serial.println("Response: " + http.getString());
    } else {
      Serial.println("POST Error: " + String(code));
    }
    http.end();
  } else {
    Serial.println("Wi-Fi disconnected! Reconnecting...");
    connectToWiFi();
  }

  server.handleClient();
  delay(5000);   
}
