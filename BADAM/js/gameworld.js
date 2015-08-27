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
    init : function() {
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
    }


};




