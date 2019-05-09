/**
 * @file     barragem_mqtt.h
 * @brief    Arquivo com o prototipo das funções relativos ao broker mqtt
 * @date     Data de Criação: 01/05/2019
 * @autor    Emanoel Gomes Santos 
 */
#ifndef BARRAGEM_MQTT_H_INCLUDED
#define BARRAGEM_MQTT_H_INCLUDED

// Defição dos IDs do mqtt e tópicos para publicação no broker
#define MQTT_TOPICO_PUBLISH_UMIDADE_1   "barragem/umidade"    // Tópico do sensor de úmidade
#define MQTT_TOPICO_PUBLISH_VIBRACAO_1  "barragem/vibracao"    // Tópico do sensor de vibração

//id mqtt (para identificação de sessão)
#define MQTT_ID  "pish_barragens_ESP32"    

int inicializaBrokerMQTT_executa(void);
void reconnectaBrokerMQTT_executa(void);
void enviaInformacaoBrokerMQTT(const char *TOPICO, char * informacao);
int verificaConexoesMQTT_executa(void);
void mqtt_executa(void);

#endif // BARRAGEM_MQTT_H_INCLUDED