# Socialify

![alt text](https://github.com/mancini-michael/Socialify/blob/ddedef92bf784f7214bdb600bb6238f60be0eafd/diagrammaprogettoreti.png)

Socialify è il progetto pratico per il corso di Reti di Calcolatori ideato e sviluppato da:

- Michael Mancini, 1884654
- Lorenzo Gizzi, 1907374
- Simone Mariano, 1883519

Effettuando l'accesso con il proprio account Google, la Web Application offre un servizio di Social Network, dove ogni utente può pubblicare post testuali e con immagini allegate. Inoltre, sono rese disponibili delle API documentate [qui](https://github.com/mancini-michael/Socialify/blob/900b719765c57be6460d346d0f6ad8ab13e7399d/server/public/docs/index.html).

# Prerequisiti

- [docker](https://www.docker.com/)
- [node.js](https://nodejs.org)
- [npm](https://www.npmjs.com/)

# Configurazione 

E' necessario accedere al [Google Cloud Console](https://console.cloud.google.com/apis/) e nella sezione credenziali bisogna creare delle nuove credenziali per l'Oauth con Google cliccando su "ID client OAuth". Scegliere come tipo di applicazione "Applicazione Web" e aggiungere come redirect URI "http://localhost:8080/oauth/google/callback". Una volta create le credenziali è necessario aggiungere nella cartella config un file .env con i seguenti campi:

```
CLIENT_ID= Il tuo client ID creato in precedenza
CLIENT_SECRET= Il tuo client secret creato in precedenza
REDIRECT_URI= http://localhost:8080/oauth/google/callback

EMAIL_USER= L'indirizzo email (gmail) con il quale si vogliono inviare le mail di conferma di registrazione 
EMAIL_SECRET= La password della mail sopra scritta

SECRET= secret_token

MONGO_URI= mongodb://mongo:27017/
PORT= 3000

QUEUE= queue
```


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

- Da Web Browser visitare http://localhost:8080/ oppure https://localhost:443/;

# Test

- Eseguire i test nella cartella "server" digitando:

```
npm test
```
