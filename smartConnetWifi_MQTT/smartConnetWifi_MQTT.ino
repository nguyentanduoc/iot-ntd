#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <Ticker.h>
#include <time.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <DHT_U.h>
#include <PubSubClient.h>

#define PIN_LED 16
#define PIN_BUTTON 0

#define LED_ON() digitalWrite(PIN_LED, HIGH)
#define LED_OFF() digitalWrite(PIN_LED, LOW)
#define LED_TOGGLE() digitalWrite(PIN_LED, digitalRead(PIN_LED) ^ 0x01)

#define DHTPIN 14 // define input dht11
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
//-------------------
//define id sensor
//-------------------
String dth11TempId = "5bc2c845d8718b64e02d7729";

const char* mqtt_server = "m10.cloudmqtt.com";
const char* client_username = "zddelmko";
const char* client_password = "NQ-HVjwgF3v1";
const int port = 18332;
const int time_repeat = 10000; //time repeat sent data to server
String result = "";
long lastMsg = 0;
char msg[50];
int value = 0;
WiFiClient espClient;
PubSubClient client(espClient);
Ticker ticker;

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str(), client_username, client_password)) {
      Serial.println("connected");
      //      client.publish("esp8266/temandhum", "hello app");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

bool longPress()
{
  static int lastPress = 0;
  if (millis() - lastPress > 3000 && digitalRead(PIN_BUTTON) == 0) {
    return true;
  } else if (digitalRead(PIN_BUTTON) == 1) {
    lastPress = millis();
  }
  return false;
}

void tick()
{
  //toggle state
  int state = digitalRead(PIN_LED);  // get the current state of GPIO1 pin
  digitalWrite(PIN_LED, !state);     // set pin to the opposite state
}

bool in_smartconfig = false;
void enter_smartconfig()
{
  if (in_smartconfig == false) {
    in_smartconfig = true;
    ticker.attach(0.1, tick);
    WiFi.beginSmartConfig();
  }
}

void exit_smart()
{
  ticker.detach();
  LED_ON();
  in_smartconfig = false;
}

void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(true);

  pinMode(PIN_LED, OUTPUT);
  pinMode(PIN_BUTTON, INPUT);
  ticker.attach(1, tick);
  Serial.println("Setup done");
}
void callback(char* topic, byte* payload, unsigned int length) {
}
void loop() {
  if (longPress()) {
    enter_smartconfig();
    Serial.println("Enter smartconfig");
  }
  if (WiFi.status() == WL_CONNECTED && in_smartconfig && WiFi.smartConfigDone()) {
    exit_smart();
    Serial.println("Connected, Exit smartconfig");

  }

  if (WiFi.status() == WL_CONNECTED) {
    float temp;
    float hum;
    client.setServer(mqtt_server, port);
    client.setCallback(callback);
    if (isnan(dht.readTemperature()) == false) {
      temp = dht.readTemperature();
      hum = dht.readHumidity();
    }
    if (!client.connected()) {
      reconnect();
    }
    client.loop();
    long now = millis();
    if (now - lastMsg > time_repeat) {
      publishDataTemp(dth11TempId, temp); //sent data temp
      lastMsg = millis();
    }
  }
}
// function for send data temp
void publishDataTemp(String _idSensor, float value) {
  result = String("{ \"sensor\": {\"_id\" : \""+_idSensor+"\" }, \"value\":" + String(value) + " }");
  char char_result[200];
  result.toCharArray(char_result, 200);
  client.publish("ESP8266/SENDDATA", char_result);
  Serial.println(String("send data " + result));
}
