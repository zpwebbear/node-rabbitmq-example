# RabbitMQ presentation examples

## Установка RabbitMQ локально при помощи docker

1. Запускаем Rabbit 
    1. Через Docker 
        1.  ```docker run -d --rm --name some-rabbit -p 5671:5671 -p 5672:5672 -p 15672:15672 rabbitmq```
        2.  ```docker exec some-rabbit rabbitmq-plugins enable rabbitmq_management```
    2. Через docker-compose
        ```docker-compose up -d``` 

2. Если всё прошло гладко, то WEB-UI будет доступен по адресу http://localhost:15672. Login - guest, password - guest