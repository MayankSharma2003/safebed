#include <WiFi.h>
#include <PubSubClient.h>

// ================= WIFI CONFIG =================
const char* WIFI_SSID = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// ================= MQTT CONFIG =================
const char* MQTT_BROKER = "broker.hivemq.com";
const uint16_t MQTT_PORT = 1883;

// ================= DEVICE CONFIG =================
String DEVICE_ID;
// const char* MQTT_TOPIC = "mats/status";
const char* MQTT_TOPIC = "safebed/mayanksharma2003/mats/status";

// ================= GPIO =================
const int INPUT_PIN = 4;
int lastState = HIGH;

// ================= CLIENTS =================
WiFiClient espClient;
PubSubClient mqttClient(espClient);

bool connectToWiFi();
bool connectToMQTT();
void publishState(int state);

void setup() {
  Serial.begin(115200);
  delay(1000);

  DEVICE_ID = "esp32-" + String((uint32_t)ESP.getEfuseMac(), HEX);

  Serial.println("[BOOT] Device ID: " + DEVICE_ID);

  pinMode(INPUT_PIN, INPUT_PULLUP);

  connectToWiFi();

  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);

  connectToMQTT();
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[WARN] WiFi lost. Reconnecting...");
    connectToWiFi();
  }

  if (!mqttClient.connected()) {
    Serial.println("[WARN] MQTT disconnected. Reconnecting...");
    connectToMQTT();
  }

  mqttClient.loop();

  int currentState = digitalRead(INPUT_PIN);

  if (currentState != lastState) {
    publishState(currentState);
    lastState = currentState;
  }

  delay(100); 
}

bool connectToWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("[INFO] Connecting WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n[INFO] WiFi connected");
  Serial.println(WiFi.localIP());

  return true;
}

bool connectToMQTT() {
  Serial.println("[INFO] Connecting to MQTT...");

  while (!mqttClient.connected()) {
    if (mqttClient.connect(DEVICE_ID.c_str())) {
      Serial.println("[INFO] MQTT connected");
      return true;
    } else {
      Serial.print("[ERROR] MQTT failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" retrying in 5 sec");

      delay(5000);
    }
  }

  return false;
}

void publishState(int state) {
  String status = (state == LOW) ? "LOW" : "HIGH";

  String payload = "{";
  payload += "\"id\":\"" + DEVICE_ID + "\",";
  payload += "\"status\":\"" + status + "\"";
  payload += "}";

  Serial.println("[MQTT] Publishing: " + payload);

  mqttClient.publish(MQTT_TOPIC, payload.c_str());
}