/**
 * @file     barragem_wifi.cpp
 * @brief    Arquivo com as funções relativas ao wifi
 * @date     Data de Criação: 01/05/2019
 * @autor    Emanoel Gomes Santos 
 */
#include <WiFi.h>

// WIFI
const char* SSID = "Emanoel net";     // SSID / nome da rede WI-FI que deseja se conectar
const char* PASSWORD = "147852369"; // Senha da rede WI-FI que deseja se conectar


/**
 * @brief  Função que reconecta o wifi caso perca a conecção
 * @return void
*/
void reconectaWiFi_executa(void){

  //--------------------------------------------------------//
  // Caso contrário, são efetuadas tentativas de conexão    //
  //--------------------------------------------------------//
  // Conecta na rede WI-FI
  WiFi.begin(SSID, PASSWORD); 

}

/**
 * @brief   verifica o estado das conexões WiFI e ao broker MQTT.
 *          Em caso de desconexão (qualquer uma das duas), a conexão
 *          é refeita.
 * @return void
 */
int verificaConexoesWIFI_executa(void){
  int tentativas = 0;

  if((WiFi.status() == WL_CONNECTED)){
    return 0;
  }
  
  reconectaWiFi_executa();
  // Aguarda conexão com wifi
  while (WiFi.status() != WL_CONNECTED){
      delay(30);
      Serial.print(".");
      if(tentativas > 100){
        return -1;
      }
      tentativas ++;
  }  
  return 0; // SUCESSO 
  
}

/**
 * @brief   Função que inicializa a conexão com a rede wifi determinada
 * @return  void
 */
int inicializaConexcaoComWiFi_executa(void){
    int status = 0;
    Serial.println();
    Serial.println("------Conexao WI-FI------");
    Serial.print("Conectando-se na rede: ");
    Serial.println(SSID);
    Serial.println("Aguarde");

    delay(1000);
    WiFi.begin(SSID, PASSWORD);

    status = verificaConexoesWIFI_executa();
    if(status == -1){
      return status;     
    }   

    // Após o sucesso da conexão mostrar detalhes
    Serial.println();
    Serial.print("Conectado com sucesso na rede WIFI!");
    Serial.print(SSID);
    Serial.println("\nIP obtido: ");
    Serial.println(WiFi.localIP());

    Serial.println("Aguarde...");
    delay(3000); 
 
    return status;
}

