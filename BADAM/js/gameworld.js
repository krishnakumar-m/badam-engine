


var scenes = [

	{

		"id": "l_museum_front",

		"title": "Museum Entrance",

		"description": "The entrance to the museum which houses the rarest of antiques you can find in the country. ",

		"events": [
			{   "id":"steal_dagger",
				"msg":"Get inside and steal the dagger."
			},
			{   "id":"stolen_dagger",
				"msg":"Great! You have stolen the dagger.",
				"code":["STOP_EVENT stolen_dagger"]
			}
		],


		"exits": ["l_museum_back_alley"],

		"objects": ["bulb","wire","mus_lock"]

	},

	{

		"id": "l_museum_lobby",

		"title": "Museum Lobby",

		"description": "The narrow lobby has a reception desk on one end and a staircase right next to it which leads to the first floor.",
		"events": [
			{"id":"steal_dagger",
				"msg":""
			},
			{
				"id":"burglar_alarm",
				"msg":"The burglar alarm goes off. Act fast or the museum security and the cops will get to you!!!",
				"code": [
							"START_EVENT alarm_on",
							"STOP_EVENT burglar_alarm"
				        ]
			}
		],

		"exits": ["l_museum_stairs","d_museum_front_door"],

		"objects": []

	},

	{

		"id": "l_museum_stairs",

		"title": "Stairs to the First Floor",

		"description": "The steps are covered in a plush rug of elaborate designs. The hand rails are made of polished wood. A chandelier hangs right above the staircase.",

		"events": [
			{"id":"steal_dagger",
				"msg":""
			}
		],

		"exits": ["l_museum_fflr_landing","l_museum_lobby"],

		"objects": []

	},

	{

		"id": "l_museum_fflr_landing",

		"title": "First floor landing",

		"description": "The landing has wooden flooring. It is dimly lit, thanks to the spotlights over a few display cases.",

		"events": [
			{"id":"steal_dagger",
				"msg":"There is an open display case in the middle of the room. There is an old dagger made of crystal resting in red velvet inside the display case."
			},
			{"id":"stolen_dagger",
				"msg":"One display case in the middle of the room is empty."
			},
			{
				"id":"burglar_alarm",
				"msg":"A deafening alarm sound as you set foot on the floor. This place will be full of guards in no time!!!",
				"code": [
							"START_EVENT alarm_on",
							"STOP_EVENT burglar_alarm"
				        ]
			}
		],

		"exits": ["l_museum_stairs","d_museum_fflr_wndw"],

		"objects": ["mus_dagger"]

	},

	{

		"id": "l_museum_back_alley",

		"title": "Alley behind the Museum",

		"description": "Behind the musuem there is a high compound wall with barbwire on top. The narrow space between the building and the wall are allocated as staff parking lots. There is a small balcony in this side of the building with a window which should open to its first floor.",

		"events": [
			{"id":"steal_dagger",
				"msg":"You need to find out a way to reach the first floor where the dagger is."
			}
		],

		"exits": ["l_museum_front","d_museum_frmgnd_toldge"],

		"objects": []

	},

	{

		"id": "l_museum_bk_fflrldge",

		"title": "Balcony, Back window, First floor",

		"description": "",

		"events": [],

		"exits": ["d_museum_frmgnd_toldge","d_museum_fflr_wndw"],

		"objects": []

	}

];





var doors = [

	{
		"id":"d_museum_front_door",
		"connects":["l_museum_front","l_museum_lobby"],
		"status":2,
		"title":"Museum front door.",
		"key":["lockpick"]

	},
	{
		"id":"d_museum_frmgnd_toldge",
		"connects":["l_museum_back_alley","l_museum_bk_fflrldge"],
		"status":2,
		"key":["grappler"],
		"title" : "The back alley and the ledge are at reachable distance if you have the right tool."
	},
	{
		"id":"d_museum_fflr_wndw",
		"connects":["l_museum_bk_fflrldge","l_museum_fflr_landing"],
		"status":2,
		"title":"The grilled window is having toughglass panes.",
		"key":["cutter"]
	}
];


var objects = [
	{
		"id":"mus_dagger",
		"type":[ObjType.FLAG,ObjType.WEAPON],
		"title":"Crystal dagger",
		"msg":"Sharp and shiny dagger made of crystal. The handle is old. ",
		"code":[
			"START_EVENT stolen_dagger",
			"STOP_EVENT steal_dagger"
		]
	},
	{
		"id":"grappler",
		"type":[ObjType.KEY,ObjType.WEAPON],
		"title":"Grapple gun"
	},
	{
		"id":"cutter",
		"type":[ObjType.KEY],
		"title":"Glass and Wire Cutter"
	},
	{
		"id":"lockpick",
		"type":[ObjType.KEY],
		"title":"Lockpick"
	},
	{
		"id":"chandelier",
		"type":[ObjType.PROP,ObjType.CANNOT_CARRY],
		"title":"A chandelier"
	},
    {
		"id":"bulb",
		"type":[],
		"title":"A tiny bulb",
		"code":[
			"ADD_OBJ holder"
		]
	},
    { 
		"id":"holder",
		"type":[ObjType.CONTAINER,ObjType.CANNOT_CARRY],
		"title":"An empty bulb holder",
		"workswith":[
						{
							"id":"wire",
							"code": ["STOP_EVENT burglar_alarm"
									],
							"msg":"Sparks shoot from junction boxes as the wire shorts out the fuse. Lights go out for a few moments. But comes back on as generator kicks in. The security system does not run on backup."
						}
					]
    },
    { 
		"id":"wire",
		"type":[ObjType.FLAG],
		"title":"A small piece of steel wire",
		"msg":"A piece of steel wire is lying on the ground."
    },
    { 
		"id":"mus_lock",
		"type":[ObjType.LOCK,ObjType.CANNOT_CARRY],
		"msg":"A large lock is set into the museum door.",
		"workswith":[
						{
							"id":"lockpick",
							"code": [
									 "ADD_EXIT d_museum_front_door lockpick"
									],
							"msg":"You work on the lock. Some clicks are heard and then there is a big click. VOILA! Door opens"
						}
					]
    }


];

var events = [
	{
		"id":"steal_dagger",
		"defaultMsg":"Get the dagger and get out of here!"
	},
	{
		"id":"alarm_on",
		"defaultMsg":"AN ALARM IS RINGING!!!"
	}
];

var enemies = [
];



// game initial config

locat = "l_museum_front";

evnt = ["steal_dagger","burglar_alarm"];

health = {
	"current":100,
	
	"max":100, 
	
	"label":["DEAD","CRITICAL","WOUNDED","BRUISED","HEALTHY"]
};

inventory = ["grappler","cutter","lockpick"];
