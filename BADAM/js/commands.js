var delEvList = [];


function execCommand(line) {

    var arr = line.split(" ");

    switch (arr[0])
    {
	case "ADD_OBJ":
	    for (var i=1;i < arr.length;i++)
	    {
		addObjToScene(arr[i]);
	    }
	    break;
	case "REMOVE_OBJ":
	    for (var i=1;i < arr.length;i++)
	    {
		remObjFromScene(arr[i]);
	    }
	    break;
	case "START_EVENT":
	    for (var i=1;i < arr.length;i++)
	    {
		addEvent(arr[i]);

		//update all chars and current scene about this event
		updateScene(arr[i]);
		updateAllChars(arr[i]);
	    }
	    break;
	case "STOP_EVENT": 
	    for (var i=1;i < arr.length;i++)
	    {
		delEvList.push(arr[i]);
	    }
	    break;
	case "ADD_EXIT":
	    if (arr.length > 2)
	    {
		unlock(arr[1], arr[2]);
	    }
	    addExit(arr[1]);
	    break;
	case "ADD_CHAR":
	    for (var i=1;i < arr.length;i++)
	    {
		addCharToScene(arr[i]);
		updateChar(arr[i]); // update the new character about current events
	    }
	    break;
	case "REMOVE_CHAR": 
	    for (var i=1;i < arr.length;i++)
	    {
		remCharFromScene(arr[i]);
	    }
	    break;
	default: 
    }
}
function runScript(instns) {
    for (var i=0;i < instns.length;i++)
    {
	execCommand(instns[i]);
    }
}

function updateChar(charName) {
    var events = gameworld.evnt,i, 
	charObj = getObjById(gameworld.chars, charName),
	eveObj = {};
	

    if (typeof(charObj.events) != "undefined")
    {
        
	for (i = 0;i < events.length;i++)
	{
	    eveObj = getObjById(charObj.events, events[i]);

	    if (eveObj != null && typeof(eveObj.code) != "undefined")
	    {
		runScript(eveObj.code);
	    }
	}
    }
    

}

function updateAllChars(eventId) {
    var chars = gameworld.scene.chars,
        i, 
	charObj = {},
	eveObj = {};
	
    if (typeof(chars) == "undefined")
    {
	return;
    }



    for (i = 0;i < chars.length;i++)
    {
	charObj = getObjById(gameworld.chars, chars[i]);

	if (charObj != null && typeof(charObj.events) != "undefined")
	{
	    eveObj = getObjById(charObj.events, eventId);


	    if (eveObj != null && typeof(eveObj.code) != "undefined")
	    {
		runScript(eveObj.code);
	    }
	}
    }
    

}

function updateScene(event) {
    var behavior ={};


    if (typeof(gameworld.scene.events) != "undefined")
    {
	behavior = getObjById(gameworld.scene.events, event);

	if (behavior != null && typeof(behavior.code) != "undefined")
	{
	    runScript(behavior.code);
	}
    }

}


function deleteEvents() {
    if (delEvList == null)
    {
	return;
    }

    for (var i=0;i < delEvList.length;i++)
    {
	removeEvent(delEvList[i]);
    }
    delEvList = [];
}


