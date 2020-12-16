# ProjectConnect - Fall 2020 Honours Project - API Server
---

### Background

* ProjectConnect is a web-based project recommender system that serves as a space for people to network with and recruit people to work on various side projects. It allows individuals who have an interest in developing a side project, but need more expertise in other technologies or application domains, to find people with those skills that could be recruited to contribute to the side project.
* This repository contains the RESTful API used by the platform. It interfaces the underlying Mongo database that contains all data used by the system, including user and project data.
* This project was developed as my computer science honours project under the supervision of Dr. Dave McKenney at Carleton University.
* The client side code can be found [here](https://github.com/alexbisaillion/project-connect-client).

### Install/Launch

* To launch the server, first install all dependencies by running `npm install` in the root directory.
* The server can then be started by running `npm start`.
* Alternatively, for development purposes, the server can be started by running `npm run dev-start`. This will launch nodemon, which will restart the server whenever file changes are saved.
