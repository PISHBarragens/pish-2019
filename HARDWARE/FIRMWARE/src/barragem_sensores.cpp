/**
 * @file     barragem_sensores.cpp
 * @brief    Arquivo com as funções relativas ao tratamento dos sensores
 * @date     Data de Criação: 01/05/2019
 * @autor    Emanoel Gomes Santos 
 */
// Inclusão de bibliotecas importantes ao módulo

// Framework/sitema
#include <Arduino.h> // Necessário para as funções de IO

// Submodulos
#include "barragem_sensores.h"
#include "barragem_mqtt.h"

/**
 * @brief Função recupera os dados do sensor de umidade
 * @param dados: dado recuperado do sensor
 * @return void 
*/
void getDadosSensorVibracao (int *dados){
    *dados = digitalRead(PINO_SENSOR_VIBRACAO_1);     
}

/**
 * @brief Função recupera os dados do sensor de umidade
 * @param dados: dado recuperado do sensor
 * @return void 
*/
void getDadosSensorUmidade (float *dados){
    int ValorADC;

    // 3,58V -> 0%    -> 4095
    // 1,25V -> 100%  -> 1400
    // ou seja
    // 0%   = 2696
    // 100% = 0
    ValorADC = analogRead(PINO_SENSOR_UMIDADE_1);   // 4095 -> 3,58V -> 0%

    // Valor encontrado nos testes
    ValorADC -= 1496;

    if(ValorADC < 0) ValorADC = 0;

    *dados = ( ((2600-(float)ValorADC) *100.0f) / 2600.0f);
}


/**
 * @brief Função cria o pacote de mensagem a ser enviado ao broker
 * @param dados: dado a ser enviado
 * @param mensagem: string com a mensagem a ser enviada
 * @return void 
*/
/*
void criaPacoteMensagemParaEnvio(float dados, char *mensagem){
    (void)sprintf(mensagem, (char *)"%0.2f", dados);
}
*/

/**
 * @brief Função que recupera as informações dos sensores e publica
 * @param sensor: sensor a ser realizado a recuperação da informação
 * @return void 
*/
void getInformacaoSensores(Tsensores sensor, char *info){
    float umidade = 0;
    int vibracao = 0;  

    switch (sensor){
        case eUmidade_1:{
            // Recupera os dados do sensor de umidade
            getDadosSensorUmidade(&umidade);
            (void)sprintf(info, (char *)"%0.2f", umidade);
            // TELA SERIAL
            Serial.println();
            Serial.printf("Umidade: %0.2f %%",umidade);
            Serial.println();      
            break;
        }
        case eVibracao_1:{
            // Recupera os dados do sensor de vibração
            getDadosSensorVibracao(&vibracao);
            if(vibracao == 1){    
                (void)sprintf(info, (char *)"Ativado");                          
            }else{
                (void)sprintf(info, (char *)"Desativado");                             
            }
            // TELA SERIAL  
            Serial.println();
            Serial.print(info);  
            Serial.println();  
           
            break;
        } 
        default: {
            (void)strcpy(info, (char *)"Sensor invalido!");
        }
    }

}

/**
 * @brief   Função que envia ao Broker o estado atual dos sensores
 * @return void
 */
void recuperaEnviaInfoSensoresAoBroker_executa(void){
    char informacao[500];

    // Recupera informações dos sensores e envia-os ao broker
    getInformacaoSensores(eUmidade_1, (char *)informacao);
    // Publica os dados no broker
    enviaInformacaoBrokerMQTT(MQTT_TOPICO_PUBLISH_UMIDADE_1,informacao);

    // Recupera informações dos sensores e envia-os ao broker
    getInformacaoSensores(eVibracao_1,informacao);
    // Publica os dados no broker

    enviaInformacaoBrokerMQTT(MQTT_TOPICO_PUBLISH_VIBRACAO_1,informacao);


}