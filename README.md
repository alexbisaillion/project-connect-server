# ProjectConnect - Fall 2020 Honours Project - API Server
---

### Background

* ProjectConnect is a web-based project recommender system that serves as a space for people to network with and recruit people to work on various side projects. It allows individuals who have an interest in developing a side project, but need more expertise in other technologies or application domains, to find people with those skills that could be recruited to contribute to the side project.
* This repository contains the RESTful API used by the platform. It interfaces the underlying Mongo database that contains all data used by the system, including user and project data.
* This project was developed as my computer science honours project under the supervision of Dr. Dave McKenney at Carleton University.
* The client side code can be found [here](https://github.com/alexbisaillion/project-connect-client).

### Install/Launch

* To launch the server, first install all dependencies by running `npm install` in the root directory.
* The TypeScript source files must then be compiled to JavaScript by running `npm run build`.
* Ensure that the following environment variables have been set:
  * `SECRET`: the secret used for sessions
  * `MONGO_USER`: the username of a user with access to the Mongo atlas project
  * `MONGO_PASSWORD`: the password of the given user
  * `MONGO_DB`: the name of the database to use
  * `SECURE_COOKIE`: true if cookies should be stored securely, false otherwise
* The server can then be started by running `npm start`.
* Alternatively, for development purposes, the server can be started by running `npm run dev-start`. This will launch nodemon, which will restart the server whenever file changes are saved.
  * If using nodemon, the environment variables described above can be set by providing a `nodemon.json` file with the following structure:
    ```
    {
      "env": {
          "SECRET": "some secret",
          "MONGO_USER": "some username",
          "MONGO_PASSWORD": "some password",
          "MONGO_DB": "some db",
          "SECURE_COOKIE": false
      }
    }
    ```
