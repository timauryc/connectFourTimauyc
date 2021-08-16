# Carlos Timaury's connect four

A connect four game developed with NodeJS + Express + Socket.io

The game can be accessed on

- Player 1: https://whispering-scrubland-21986.herokuapp.com/games/1/
- Player 2: https://whispering-scrubland-21986.herokuapp.com/games/2/


### Topics:
- [Dependencies and Tools](#Dependencies-and-Tools)
- [Run locally](#run-locally)
- [Notes](#notes)

## Dependencies and Tools
- ##### Node.js
    - It's a JavaScript runtime built on Chrome's V8 JavaScript engine.
    - Download it here: https://nodejs.org/en/
    - Installed version: v14.x.0 (or higher)
    - Documentation: https://nodejs.org/dist/latest-v14.x/docs/api/

- ##### npm
    - It's a package manager for Node.js.
    - Installed together with Node.js
    - Installed version: 7.11.x (or higher)

- ##### Express Framework
    - Express is a minimal and flexible Node.js web application framework. 
    - It provides a robust set of features for web and mobile applications.
    - Install it with npm: [sudo] npm install express  
    - Installed version 4.17.1 (or higher)

- ##### socket.io
    - Socket.IO enables real-time, bidirectional and event-based communication.
    - It works on every platform, browser or device, focusing equally on reliability and speed.
    - Install it with npm: [sudo] npm install socket.io
    - Installed version 4.1.3 (or higher)


## Run locally

First, install the project packages

```bash
npm install
```

Then, execute the command to start the server

```bash
npm start
```

Finally, access `http://localhost:{PORT}/games/{Player}`. The default port is 3000 and player can be 1 or 2.


## Notes

This project was made using NodeJS + Express Framework + Socket.io. Since socket.io seemed the best communication protocol for the realtime game experience desired between the players. The project structure follows a common pattern that allows the express framework to serve the */public* directory files for the frontend. For the backend, a *Game class* was created to handle all the game logic.

The selected cloud provider platform was *heroku*

