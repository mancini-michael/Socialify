# Socialify

![alt text](https://github.com/mancini-michael/Socialify/blob/ddedef92bf784f7214bdb600bb6238f60be0eafd/diagrammaprogettoreti.png)

Socialify è il progetto pratico per il corso di Reti di Calcolatori ideato e sviluppato da:

- Michael Mancini, 1884654
- Lorenzo Gizzi, 1907374
- Simone Mariano, 1883519

Effettuando l'accesso con il proprio account Google, la Web Application offre un servizio di Social Network, dove ogni utente può pubblicare post testuali e con immagini allegate. Inoltre, sono rese disponibili delle API documentate [qui]().

# Prerequisiti

- [docker](https://www.docker.com/)
- [node.js](https://nodejs.org)
- [npm](https://www.npmjs.com/)

# Requisiti progetto

- Fornisce delle API documentate per interagire con i post degli utenti, in particolare è possibile creare un nuovo post, ottenere tutti i post e cancellarli e di uno specifico utente è possibile cancellare, aggiornare o ottenere un nuovo post
- Si interfaccia con due servizi REST esterni che sono Google Calendar per salvare come evento la pubblicazione di un post e Google Drive per salvare il contenuto di quest'ultimo
- E' possibile effettuare l'accesso utilizzando il servizio OAuth offerto da Google
- L'applicazione fa uso di Docker per la containerizzazione delle varie parti della Web App e Docker Compose per orchestrarle.
- E' presente una procedura di CI/CD attraverso Github Actions

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
