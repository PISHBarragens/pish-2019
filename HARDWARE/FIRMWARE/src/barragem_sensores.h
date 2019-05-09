/**
 * @file     barragem_sensores.h
 * @brief    Arquivo com o prototipo das funções relativos ao wifi
 * @date     Data de Criação: 01/05/2019
 * @autor    Emanoel Gomes Santos 
 */
#ifndef BARRAGEM_SENSORES_H_INCLUDED
#define BARRAGEM_SENSORES_H_INCLUDED

#define LED_INTERNO         2
#define PINO_SENSOR_UMIDADE_1 33
#define PINO_SENSOR_VIBRACAO_1 26

typedef enum ESensores{
  eUmidade_1,
  eVibracao_1,  
}Tsensores;

void recuperaEnviaInfoSensoresAoBroker_executa(void);

#endif // BARRAGEM_SENSORES_H_INCLUDED
