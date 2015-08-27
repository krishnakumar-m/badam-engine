BADAM gamebook interpreter / engine/ library 
Using javascript and JSON (for game data)


Version 1.4
* added NPCs and interaction using actions and objects

Version 1.2

* gameworld.js - all variables and game objects are now part of object gameworld
* Game will be loaded as jsons using gameworld function loadgame()
* Changed Folder Structure - game will be stored in data/<game>/ folder as individual jsons



Version 1.0

gameworld.js : contains all game element definitions - locations, events, objects, doors
badengine.js : core functions to manipulate game elements - open door, add event etc
commands.js : simple interpreter for in-game script, using core functions

implement.js : a sample implementation of web based gamebook
index.html : the UI, uses implement.js


TODO: NPC interaction through dialogs



