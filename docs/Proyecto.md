# Proyecto Clue: Secret Santa

## Idea

En documento DOCUMENTO DE DISEÑO TÉCNICO.md

## Desarrollo

El juego lo vamos a desarrollar, serán 2 partes esenciales en la misma pagina

### Tablero

Tablero estilo drag and drop, habra una seccion donde estaran las fichas de cada jugador y una seccion donde hay un dado, la idea será que el movimiento se hace manual agarrando las fichas con el mouse y mvoiendolas en el tablero, asi se hace menos complejo, la imagen del tablero ya tiene el sector de las fichas y el sector del dato, habra que superponerlas encima, para esto haremos una pagina de setup donde se cargara todo pero con el mismo drag and drop se moveran los elementos donde deberian estar al iniciar el juego y se exportara un documento de vectores para luego programar el juego y que los elementos (dados y fichas) aparezcan correctamente

## Interacciones

Los jugadores entraran al juego con un codigo que sale en el modo tablero, elejiran que jugador son de una lista tipo dropdown (Mamá, Papá, Fay, Fio, Tato, Raffa) cuando elijan quien es saldra un form para armar el sobre de su amigo secreto, elegiran quien es su amigo secreto (nombre que saldra en el sobre), cual es el envoltorio de su regalo y cual es la cinta de su regalo, todas estas elecciones se hacen con imagenes de las cartas digitales, cuando haya rmado su sobre manda una confirmación, cuando todos hayan confirmado se reparten los sobres (NUNCA SE REPARTIRA EL MISMO SOBRE A LA PERSONA DEL SOBRE, ES DECIR, SOBRE TATO NO SE LE DARÁ A TATO), luego empieza el juego, la unica interaccion que deben hacer desde ahi los jugadores es activar modo sospecha donde deberan elegir 2 opciones primero 1. armar sospecha o 2. ocultar verdad, armar sospecha es para armar la mano que le mostraran a la persona que esta asiendo la sospecha y no es la persona de su sobre, entonces deberan elegir que cartas mostraran que calza con sus sospecha, se confirma y aparecen en pantalla las cartas que calzan con sus sospecha (la sospecha se hace a voz presencialmente), en el modod ocultar la verdad es que la persona que sospecha es la misma persona de su sobre, en ese caso se debe mostrar como que no calza ninguna carta (mismo caso que puede pasar en el modo 1 asi que tiene que ser exactamente igual para no revelar nada) asi se sigue el juego hasta siempre

## Extra creacion de cartas

podriamos crear una seccion para que las personas suban fotos de los elementos que iran en las cartas digitales y ponerle un titulo a la misma carta, asi podemos agilizar la creacion de las cartas digitales, luego las importare a este proyecto, mientras no hayan imagenes usemos un placeholder

## tecnologias

Usaremos netlify, render y mongodb si es necesario
