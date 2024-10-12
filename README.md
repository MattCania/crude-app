pag dmoto bnasa d q na tuturo pano mareestablish database hehe

- go to mysql.js file sa backend>models>mysql.js
- delete the dotenv config import (importante lng to para sa alwaysdata database q na plano q idrop para d nyo maspam ng random shit)

- change the following strip of code:
const pool = mysql.createPool({
	host: localhost,
	user: root,
	password: '',
	database: databasename (based sa input id give the columns and their corresponding datatype
})
- remove closepool function // line 90
- proceed to backend directory, delete the .env file
- proceed to server.js, delete all code from shutdown // line 25 beyond

to start the web, create a split terminal, then
terminal 1: Backend Server
-cd backend
-npm start

terminal 2:  Frontend Server
-cd frontend
-npm run dev

chat nyoko kung may errors or sm shit
gus2 q na mamatay
