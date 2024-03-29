#include <Wire.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>

#include "credentials.h"

#include <BH1750.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#define I2C_SDA 21
#define I2C_SCL 22
#define SEALEVELPRESSURE_HPA (1013.25)
#define WATER_SENSOR 4
#define WATER_SENSOR_PWR 2

WiFiMulti WiFiMulti;
Adafruit_BME280 bme;
BH1750 lightMeter(0x23);

void setup() {
  Serial.begin(115200);
  pinMode(2, OUTPUT);
  pinMode(WATER_SENSOR, INPUT);
  
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

  //init WiFi
  WiFiMulti.addAP(SSID.c_str(), password.c_str());
  Serial.print("Attempting to connect to ");
  Serial.println(SSID);
  
  while (WiFiMulti.run() != WL_CONNECTED){
    Serial.print(".");
    digitalWrite(2, HIGH);
    delay(100);
    digitalWrite(2, LOW);
    delay(300);
  }
  Serial.println("\nConnected");
  
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

  Serial.println("Sending new values...");
  sendValues(lux, temp, humidity, pressure, water);
  Serial.println("---------------------------------");
  delay(3000);
}

char sendValues(float light, float temp, float humidity, float pressure, float waterLevel){
  HTTPClient http;
  int httpCode;
  String lightStr = String(light), tempStr = String(temp), humidityStr = String(humidity), waterStr = String(waterLevel), pressureStr = String(pressure);
  String requestData = "temperature=" + tempStr + "&humidity=" + humidityStr + "&light=" + lightStr + "&waterLevel=" + waterStr + "&pressure=" + pressureStr;
  
  http.begin(url + "values/");
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
  float waterLevel = 0.0;
  
  digitalWrite(WATER_SENSOR_PWR, HIGH);
  waterLevel = analogRead(WATER_SENSOR);
  digitalWrite(WATER_SENSOR_PWR, LOW);

  return waterLevel;
}

void blinkLed(){
 while(1){
      digitalWrite(2, HIGH);
      delay(800);
      digitalWrite(2, LOW);
      delay(800);
  }
}
