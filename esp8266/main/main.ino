#include <Arduino.h>
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include "credentials.h"
#include "pins.h"

#include <BH1750.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_PCD8544.h>

#define I2C_SDA D2
#define I2C_SCL D1
#define SEALEVELPRESSURE_HPA (1013.25)
#define WATER_SENSOR A0
#define WATER_SENSOR_PWR S2

int RST = 16;
int CE = 14;
int DC= 12;
int DIN = 13;
int CLK = 15;

Adafruit_PCD8544 display = Adafruit_PCD8544(CLK, DIN, DC, CE, RST);

Adafruit_BME280 bme;
BH1750 lightMeter(0x23);
WiFiClient client;

void setup() {
  Serial.begin(115200);
  pinMode(2, OUTPUT);
  pinMode(WATER_SENSOR, INPUT);
  
  display.begin();
  display.setContrast(50);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(BLACK);
  display.setCursor(0,0);
  display.print("Connecting to WiFi " + String(SSID));
  display.display();

  //init i2c
  Wire.begin(I2C_SDA, I2C_SCL);
  
  //init BH1750
  if (lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) {
    Serial.println(F("BH1750 Advanced begin"));
  }
  else {
    Serial.println(F("Error initialising BH1750"));
    blinkLed();
  }
  
  //init bme280
  if (!bme.begin(0x76)) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    blinkLed();
  }

  WiFi.begin(SSID, password);
  Serial.print("Attempting to connect to ");
  Serial.println(SSID);
  
  while(WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  display.clearDisplay();
  display.setCursor(0,0);
  display.print("Connected to \n" + SSID);
  display.display();
  delay(1000);
  Serial.print("\nConnected! IP Address (AP): ");
  Serial.println(WiFi.localIP());
}

void loop() {
  float lux = lightMeter.readLightLevel();
  float temp = bme.readTemperature();
  float pressure = bme.readPressure() / 100.0F;
  float altitude = bme.readAltitude(SEALEVELPRESSURE_HPA);
  float humidity = bme.readHumidity();
  float water = readWaterLevel();
  
  Serial.print("Light: ");
  Serial.println(lux);

  Serial.print("Temperature: ");
  Serial.print(temp);
  Serial.println("*C");

  Serial.print("Altitude: ");
  Serial.print(altitude);
  Serial.println("m");

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println("%");

  Serial.print("Pressure: ");
  Serial.print(pressure);
  Serial.println("hpa");

  Serial.print("Water: ");
  Serial.println(water);

  weatherDisplay(lux, temp, pressure, altitude, humidity, water);

  Serial.println("Sending new values...");
  sendValues(lux, temp, humidity, pressure, water);
  Serial.println("---------------------------------");
  delay(5000);
}

void sendValues(float light, float temp, float humidity, float pressure, float waterLevel){
  HTTPClient http;
  int httpCode;
  String
    lightStr = String(light), 
    tempStr = String(temp), 
    humidityStr = String(humidity), 
    waterStr = String(waterLevel), 
    pressureStr = String(pressure);

  String requestData = 
    "temperature=" + tempStr + 
    "&humidity=" + humidityStr + 
    "&light=" + lightStr + 
    "&waterLevel=" + waterStr + 
    "&pressure=" + pressureStr +
    "&apiKey=" + apiKey;
  
  http.begin(client, url + "/values");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  httpCode = http.POST(requestData);

  if(httpCode > 0) {
    Serial.printf("[HTTP] POST... code: %d\n", httpCode);
    if(httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      Serial.println(payload);
    }
  } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();
}

float readWaterLevel(){
  float analogVal = 0.0;
  analogVal = analogRead(WATER_SENSOR);

  return constrain(map(analogVal, 100, 560, 0, 41), 0, 999);;
}

void blinkLed(){
 while(1){
      digitalWrite(2, HIGH);
      delay(800);
      digitalWrite(2, LOW);
      delay(800);
  }
}

void weatherDisplay(float lux, float temp, float pressure, float altitude, float humidity, float water){
  display.setTextSize(1);
  display.setTextColor(BLACK);
  display.setCursor(0,0);
  display.clearDisplay();

  display.println("LIGHT: " + String(lux));
  display.println("TEMP: " + String(temp));
  display.println("ATM: " + String(pressure));
  display.println("ALT: " + String(altitude));
  display.println("HUM: " + String(humidity));
  display.println("WATER: " + String(water));

  display.display();
}
