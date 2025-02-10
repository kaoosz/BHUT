# PortData
## ⚙️ Clonar o Repositório

```
git clone https://github.com/kaoosz/BHUT.git
```
🔧 Configuração do Ambiente

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
```

MONGODB="mongodb://localhost:27017"
WEBHOOK_URL="http://api:3001/api/webhook"
RABBIT_URL="amqp://admin:admin@rabbitmq:5672"
EXTERNAL_API_URL="http://api-test.bhut.com.br:3000/api"
PORT=3001
QUEUE=Consumer

```
📦 Instalar Dependências
```
npm install
```
🚀 Rodar a Aplicação
Via Docker Compose
```
docker-compose up -d --build
```
 
caso queira ver os logs depois de qualquer ação na API.

mostra os logs do consumer  
```
docker-compose logs consumer
```

mostra os logs da api  
```
docker-compose logs api  
```

📄 Endpoints  
Carro Endpoints  
(POST) Criar Carro

Rota: /api/car
http://localhost:3001/api/car
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
Descrição: Necessario fornecer Bearer Token.

Exemplo de Request:
```
{
    "nome": "Etios 2",
    "marca": "Toyota 2",
    "preco": 500,
    "anoFabricacao": 2000
}
```

(GET) Car  

Rota: /api/car    
http://localhost:3001/api/car?ativo=true&pagina=1&tamanhoPagina=10  
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.

Descrição: Usa ativo,pagina,tamanhoPagina como query params.   
Necessario fornecer Bearer Token

Exemplo de URL Completa:
```
http://localhost:3001/api/car?ativo=true&pagina=1&tamanhoPagina=10
```

(GET) Logs

Rota: /api/logs      
http://localhost:3001/api/logs   
Descrição: Retorna os logs cadastrados no banco de dados.  

Exemplo de URL Completa:
```
http://localhost:3001/api/logs
```

