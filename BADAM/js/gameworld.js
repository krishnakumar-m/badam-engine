var ObjType = {
	"KEY":"key",
	"PROP":"prop",
	"WEAPON":"weapon",
	"FLAG":"flag",
	"CONTAINER":"container",
	"CANNOT_CARRY":"cannot_carry",
	"LOCK":"lock"
};

var gameworld = {


   scenes :[],


    doors : [],


    objects : [],

    events : [],

    chars : [],



// game initial config

    locat : "",

    evnt : [],

    health : {},

    inventory : [],
    scene :{},
    loadGame :function() {
        
	this.doors = readGameFile(this.gameid, "doors.json");
	this.scenes = readGameFile(this.gameid, "scenes.json");
	this.objects = readGameFile(this.gameid, "objects.json");
	this.events = readGameFile(this.gameid, "events.json");
        
	var gameConfig = readGameFile(this.gameid, "gameinit.json");
	this.locat = gameConfig.location;
	this.evnt = gameConfig.events;
	this.health = gameConfig.health;
	this.inventory = gameConfig.inventory;
    },
    init : function() {
	this.scene = getObjById(this.scenes, this.locat);
    },
    gameid : "sn34k"


};




