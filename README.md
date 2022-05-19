# Socialify

Socialify è il progetto pratico per il corso di Reti di Calcolatori ideato e sviluppato da:

- Michael Mancini, 1884654
- Lorenzo Gizzi, 1907374
- Simone Mariano

Effettuando l'accesso con il proprio account Google, la Web Application offre un servizio di Social Network, dove ogni utente può pubblicare post testuali e con immagini allegate. Inoltre, sono rese disponibili delle API documentate [qui]().

# Prerequisiti

- [docker](https://www.docker.com/)
- [node.js](https://nodejs.org)
- [npm](https://www.npmjs.com/)

# Installazione

- Clonare la repository tramite il comando:

```
git clone https://github.com/mancini-michael/Socialify.git
```

- Spostarsi nella directory server ed installare i moduli di node :

```
cd Socialify/server
npm install
```

- Eseguire il build delle immagini e avviare il compose:

```
docker compose build
docker compose up
```

- Da Web Browser visitare http://localhost:8080/ oppure https://localhost:443/

# Test

- Eseguire i test digitando:

```
npm test
```
