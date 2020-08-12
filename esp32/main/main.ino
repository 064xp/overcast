#include <Wire.h>
#include <BH1750.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#define I2C_SDA 21
#define I2C_SCL 22
#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME280 bme;
BH1750 lightMeter(0x23);

void setup() {
  Serial.begin(115200);
  pinMode(2, OUTPUT);
  //pinMode(I2C_SDA, INPUT_PULLUP);
  //pinMode(I2C_SCL, INPUT_PULLUP);

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
  
}

void loop() {
  float lux = lightMeter.readLightLevel();
  float temp = bme.readTemperature();
  float pressure = bme.readPressure() / 100.0F;
  float altitude = bme.readAltitude(SEALEVELPRESSURE_HPA);
  float humidity = bme.readHumidity();
  
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
  Serial.println("---------------------------------");
  delay(1500);
}

void blinkLed(){
 while(1){
      digitalWrite(2, HIGH);
      delay(800);
      digitalWrite(2, LOW);
      delay(800);
  }
}
