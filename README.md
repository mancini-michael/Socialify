# Socialify

#Requisiti Progetto
Socialify è una Web App ideata da Michael Mancini, Lorenzo Gizzi e Simone Mariano che permette di pubblicare post come in un Social Network
- L'applicativo offre API di terze parti documentate per interagire con i post pubblicati dai vari utenti, in particolare è possibile creare un nuovo post, ottenere tutti quelli presenti, ottenere quelli di uno specifico utente, aggiornare un post, cancellare tutti i post oppure uno specifico di un dato utente.
- Si interfaccia con due servizi di terze parti, entrambi di Google che sono google drive per salvare i post e google calendar per pianificarli
- L'accesso al servizio viene effettuato tramite il servizio OAuth offerto da Google

#Installazione ed Esecuzione
E' necessario avere installato Nodejs e Npm
- Clonare la repository tramite il comando git clone
- All'interno della cartella server eseguire il comando npm install 
- Eseguire il comando docker-compose up per avviare la Web App
- Da browser visitare localhost
- L'utente può registrarsi o loggarsi sia tramite email che tramite Google
- Una volta loggato l'utente può pubblicare un post tramite la compilazione di campi presenti nella homepage
- Premuto sul bottone pubblica, il post viene aggiunto come evento sul google calendar e sul google drive

#Test
Per poter testare la Web App è necessario eseguire il comando
npm install mocha chai && npm install
e poi il comando
npm test
per eseguirli
