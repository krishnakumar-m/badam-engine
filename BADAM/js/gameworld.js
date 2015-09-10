

var gameworld = {


    scenes :[],

    doors : [],

    objects : [],

    events : [],

    chars : [],

    locat : "",

    evnt : [],

    health : {},

    inventory : [],

    scene :{},

    gameid : "sn34k",

    turns : 0,

    loadGame :function() {

	this.doors = readGameFile(this.gameid, "doors.json");

	this.scenes = readGameFile(this.gameid, "scenes.json");

	this.objects = readGameFile(this.gameid, "objects.json");

	this.events = readGameFile(this.gameid, "events.json");

	this.chars = readGameFile(this.gameid, "chars.json");

	var gameConfig = readGameFile(this.gameid, "gameinit.json");
	this.locat = gameConfig.location;
	this.evnt = gameConfig.events;
	this.health = gameConfig.health;
	this.inventory = gameConfig.inventory;
    },
    sceneInit : function() {
	this.scene = getObjById(this.scenes, this.locat);
    },
    incTurns : function() {
	this.turns++;
    },
    getHealthLabel : function() {
	var health = this.health;

        if (typeof(health.label) == "undefined")
        {
	    return "";
        }

        var unitHlth = health.max / health.label.length;

        var indx = Math.ceil(health.current / unitHlth);

        return health.label[indx - 1];
    },

    openDoor:   function (doorName) {

	var door = getObjById(this.doors, doorName),
	    connectsSize = door.connects.length;

	for (i = 0;i < connectsSize;i++)
	{
	    var scene = getObjById(this.scenes, door.connects[i]);

	    var doorIndx = scene.exits.indexOf(doorName);

	    scene.exits.splice(doorIndx, 1);

	    for (j = 0;j < connectsSize;j++)
	    {
		scene.exits.splice(doorIndx, 0, door.connects[j]);
	    }

	    scene.exits.splice(scene.exits.indexOf(scene.id), 1);

	}

	door.status = 0;
	return true;

    },

    getKeys:function (door) {
	var doorObj = getObjById(this.doors, door);
	if (doorObj != null)
	{
	    return doorObj.key;
	}
	return null;
    },

    unlock:function (door, key) {

	var doorObj = getObjById(this.doors, door);
	if (typeof(doorObj.key) == "undefined")
	{
	    return false;
	}
	if (doorObj.key.indexOf(key) != -1)
	{
	    doorObj.status = 1;
	    return true;
	}
	return false;

    },

    getAvailKeys: function (door) {
	var keys = this.getKeys(door),
	    listSize = this.inventory.length;

	var availKeys = [];
	for (var i=0;i < listSize;i++)
	{
	    if (keys.indexOf(this.inventory[i]) > -1)
	    {
		availKeys.push(this.inventory[i]);
	    }
	}
	return availKeys;
    },

    useKey: function (door, key) {
	if (this.unlock(door, key))
	{
	    this.inventory.splice(this.inventory.indexOf(key), 1);
	    return true;
	}
	return false;
    },

    getSceneObjs:function (scene) {
	if (typeof(scene.objects) != "undefined")
	{
	    return scene.objects;
	}
	return null;
    },


    refreshEvents: function() {
	var count = 0, objObj ={};
	while (count < this.evnt.length)
	{
	    objObj = getObjById(this.scene.events, this.evnt[count]);

	    if (objObj != null && typeof(objObj.code) != "undefined")
	    {
		runScript(objObj.code);
	    }
	    count++;
	}
    }

    


};




