/**
 * @file     main.cpp
 * @brief    Arquivo com as execuções de funções principais do sistema
 * @date     Data de Criação: 01/05/2019
 * @autor    Emanoel Gomes Santos 
 */

// Inclusões de bibliotecas importantes ao módulo

// Framework/sistema
#include <Arduino.h>
#include <WiFi.h>         // Importa a Biblioteca WiFi para ESP32
#include <PubSubClient.h> // Importa a Biblioteca PubSubClient

// Submodulos do sistema
#include "barragem_wifi.h"
#include "barragem_mqtt.h"
#include "barragem_sensores.h"

/**
 * @brief   Função que configura e de inicialização
 * @return void
 */
void setup() {
  int status = 0;
  Serial.begin(9600);
  // Define pino de saida para led indicador de envio ao broker
  pinMode(LED_INTERNO,OUTPUT);  
  // Define pino de entrada para dados coletados do sensor de umidade
  pinMode(PINO_SENSOR_UMIDADE_1,INPUT);  
    // Define pino de entrada para dados coletados do sensor de umidade
  pinMode(PINO_SENSOR_VIBRACAO_1,INPUT);

  // Verifica conexao com wifi 
  do{
    status = inicializaConexcaoComWiFi_executa();
    if(status == -1){
      // Após o sucesso da conexão mostrar detalhes
      Serial.println();
      Serial.print("Falha na conexao com wifi, em 02 segundos sera realizada uma nova tentativa de conexao.\n");
      delay(2000); 
    }
  }while(status == -1);


  do{
    // Garante funcionamento das conexões WiFi e ao broker MQTT
    status = inicializaBrokerMQTT_executa();
    if(status == -1){
      printf("Ha algum problema com o broker MQTT");
      // TODO verifica se deverá enviar status para broker afim de avisar aos administradores
      delay(3000);
    } 
  }while(status == -1);     
    
}
/**
 * @brief Função principal que executa o loop infinito
 * @return void 
*/
void loop() {
  int status = 0;
  delay(3000);
  digitalWrite(LED_INTERNO,HIGH);
  delay(150);
  digitalWrite(LED_INTERNO,LOW);
    
  // Verifica conexao com wifi 
  do{
    status = verificaConexoesWIFI_executa();
    if(status == -1){
      Serial.println("Falha na conexao com WIFI!!!");
      // TODO verifica se deverá enviar status para broker afim de avisar aos administradores
      delay(3000);
    }
  }while(status == -1); 


  do{
    // Garante funcionamento das conexões WiFi e ao broker MQTT
    status = verificaConexoesMQTT_executa();
    if(status == -1){
      Serial.print("Falha na conexao com o broker MQTT");
      // TODO verifica se deverá enviar status para broker afim de avisar aos administradores
      delay(3000);
    } 
  }while(status == -1); 

  // Capta as informações dos sensores e envia-os ao broker MQTT
  recuperaEnviaInfoSensoresAoBroker_executa();

  // Keep-alive da comunicação com broker MQTT
  mqtt_executa();
}
