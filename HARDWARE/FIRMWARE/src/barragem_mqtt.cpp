/**
 * @file     barragem_mqtt.cpp
 * @brief    Arquivo com as funções relativas ao broker mqtt
 * @date     Data de Criação: 01/05/2019
 * @autor    Emanoel Gomes Santos 
 */

#include <WiFi.h>         // Importa a Biblioteca WiFi para ESP32
#include <PubSubClient.h> // Importa a Biblioteca PubSubClient
#include "barragem_mqtt.h"
#include "barragem_wifi.h"

// Variaveis globais necessárias
// MQTT (informacao: https://api.cloudmqtt.com/console/82605976/details)
const char* BROKER_MQTT = "m16.cloudmqtt.com";   //URL do broker MQTT que se deseja utilizar
int BROKER_PORT = 11838; // Porta do Broker MQTT
const char *mqtt_user = "srtwrzni";
const char *mqtt_pass = "yrKsU5rSgsVm";

//Variáveis e objetos globais
WiFiClient espClient; // Cria o objeto espClient
PubSubClient MQTT(espClient); // Instancia o Cliente MQTT passando o objeto espClient


/**
 * @brief   Função que reconecta-se ao broker MQTT (caso ainda não esteja conectado ou em caso de a conexão cair)
 *          em caso de sucesso na conexão ou reconexão, o subscribe dos tópicos é refeito.
 * @return  void
 */
void reconnectaBrokerMQTT_executa(void){  
  // caso houve conexão então informa sucesso
  MQTT.connect(MQTT_ID, mqtt_user, mqtt_pass);
}


/**
 * @brief   inicializa parâmetros de conexão MQTT (endereço do broker, porta e seta função de callback)
 * @return void
 */
int inicializaBrokerMQTT_executa(void){
  int status = 0;

  Serial.println();
  Serial.println("------Conexao Broker MQTT------");
  Serial.print("Broker MQTT: ");
  Serial.println(BROKER_MQTT);
  
  // Informa qual broker e porta deve ser conectado
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);  
  delay(2000);

  status = verificaConexoesMQTT_executa();
  if (status == -1){
    // Após o sucesso da conexão mostrar detalhes
    Serial.println();
    Serial.print("Falha na conexao com broker mqtt, em 02 segundos sera realizada uma nova tentativa de conexao.\n");
    delay(2000); 
    return status;        
  }


  // Após o sucesso da conexão mostrar detalhes
  Serial.println("\nConectado com sucesso ao broker MQTT! Aguarde...");
  delay(3000); 
  return 0;
          
}

void enviaInformacaoBrokerMQTT(const char *TOPICO, char * informacao){
    MQTT.publish(TOPICO, informacao);
}

/**
 * @brief   verifica o estado das conexões WiFI e ao broker MQTT.
 *          Em caso de desconexão (qualquer uma das duas), a conexão
 *          é refeita.
 * @return void
 */
int verificaConexoesMQTT_executa(void){
  int tentativas = 0;

  if(MQTT.connected()){
    return 0;
  }

  reconnectaBrokerMQTT_executa();

  // Aguarda conexão com wifi
  while (!MQTT.connected()){
      delay(30);
      Serial.print(".");

      if(tentativas > 100){
        return -1;
      }

      tentativas ++;
  }  

  return 0; // SUCESSO   
  
}

void mqtt_executa(void){
    MQTT.loop();
}