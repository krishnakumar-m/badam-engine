

function selectObjLink(objName) {
    var behavr =selectObject(objName);
    if (behavr.status)
    {
	scener();
    }
}


function selectKeyLink(door, key) {
    if (useKey(door, key))
    {
	scener();
    }
}


function addPara(type, obId, content, destination) {
    if (document.getElementById(type + "_" + obId))
    {
	document.getElementById(type + "_" + obId).innerHTML = content;
    }
    else
    {
	document.getElementById(destination).innerHTML += "<p id=\"" + type + "_" + obId + "\">" + content + "</p>";
    }
}

function dispActions(char) {
    var actionSelect = "<select onchange=\"applyActionOnChar('" + char + "',this.value);\">";
    actionSelect +=   "<option value=''>(select)</option>",
	charObj = getObjById(gameworld.chars, char);

    if (charObj !== null && typeof(charObj) != "undefined")
    {

	for(var act in charObj.actions) {

	    actionSelect +=   "<option value='" + charObj.actions[act].id + "'>" + charObj.actions[act].id + "</option>";

	}
    }
    return actionSelect + "</select>";

}

function dispActionsForObj(obj) {
    var actionSelect = "<select onchange=\"doActionOnObj('" + obj + "',this.value);\">";
    actionSelect +=   "<option value=''>(select)</option>";
    var objObj = getObjById(gameworld.objects, obj);



    if (objObj !== null && typeof(objObj) != "undefined")
    {
	if (typeof(objObj.type) != "undefined" && objObj.type.indexOf(ObjType.CANNOT_CARRY) == -1)
	{
	    actionSelect  += "<option value='take'>Take</option>";

	}

	for(var act in objObj.actions) {
	    if (objObj.actions[act].id != "take")
	    {

		actionSelect +=   "<option value='" + objObj.actions[act].id + "'>" + objObj.actions[act].id + "</option>";
	    }
	}
    }
    return actionSelect + "</select>";

}


function dispInventory() {
    var inventoryList = "",
	listSize=gameworld.inventory.length;
    for (var i=0;i < listSize;i++)
    {
	inventoryList += "<li>" + getObjTitle(gameworld.inventory[i]) + "</li>";
    }
    document.getElementById("items").innerHTML = "<ul>" + inventoryList + "</ul>";

    dispTurns();
}

function applyActionOnChar(char, act) {
    if (act != "")
    {
	gameworld.incTurns();
	dispTurns();
	var behavr = useActionOnChar(char, act);
	if (behavr != null)
	{

	    alert(behavr.msg);
	    if (typeof(behavr.code) != "undefined")
	    {
		runScript(behavr.code);

		scener();
	    }

	} 
    }
}


function doActionOnObj(obj, act) {

    if (act != "")
    {
	gameworld.incTurns();
	dispTurns();

	var behavr = doActionOnObject(obj, act);

	if (behavr != null)
	{
            if (act == "take")
	    {
		gameworld.inventory.push(obj);
	        remObjFromScene(obj);
	    }

	    alert(behavr.msg);
	    if (typeof(behavr.code) != "undefined")
	    {
		runScript(behavr.code);

		scener();
	    }

	}
	else
	{
	    if (act == "take")
	    {
		selectObjLink(obj);
	    }
	}
    }
}


function getItemsAsOptions() {
    var i, listSize = gameworld.inventory.length,
	inventoryList = "<option value=''>(select)</option>";
    for (i = 0;i < listSize;i++)
    {
	inventoryList += "<option value='" + gameworld.inventory[i] + "'>" + getObjTitle(gameworld.inventory[i]) + "</option>";
    }
    return inventoryList;
}

function dispInventoryAsSelect(objName) {
    var inventoryList = "<select onchange=\"workOutCombination('" + objName + "',this.value);\">";
    inventoryList +=   getItemsAsOptions();
    return inventoryList + "</select>";
}

function dispInvOptionsForChar(charName) {
    var inventoryList = "<select onchange=\"applyItemOnChar(this.value,'" + charName + "');\">";
    inventoryList += getItemsAsOptions();
    return inventoryList + "</select>";
}

function workOutCombination(obj1, obj2) {
    if (obj2 != "")
    {
	gameworld.incTurns();
	dispTurns();
	var behavr = combineObjects(obj1, obj2);
	if (behavr != null)
	{

	    alert(behavr.msg);
	    if (typeof(behavr.code) != "undefined")
	    {
		runScript(behavr.code);

		scener();
	    }

	}
    }
}

function applyItemOnChar(obj, char) {
    if (obj != "")
    {
	gameworld.incTurns();
	dispTurns();

	var behavr = useObjectOnChar(obj, char);
	if (behavr != null)
	{

	    alert(behavr.msg);
	    if (typeof(behavr.code) != "undefined")
	    {
		runScript(behavr.code);

		scener();
	    }

	}

    }
}
function dispTurns() {
    document.getElementById("turns").innerHTML = "<b>Turns : " + gameworld.turns + "</b>";
}


function dispChars() {
    var chars = gameworld.scene.chars, 
        i, j, events=gameworld.evnt,
	text ="",thisEvent;

    if (typeof(chars) == "undefined")
    {
	return;
    }


    for (i = 0;i < chars.length;i++)
    {
	text = "";
	var charObj = getObjById(gameworld.chars, chars[i]);
	text += charObj.defaultMsg;
	if (charObj != null && typeof(charObj.events) != "undefined")
	{
	    for (j = 0;j < events.length;j++)
	    {

		thisEvent = getObjById(charObj.events, events[j]);
		if (thisEvent != null)
		{
		    text += "<p>" + thisEvent.msg + "</p>";
		}

	    }
	}

	text += " " + dispInvOptionsForChar(chars[i]) + " " + dispActions(chars[i]) + "<br/>";

	addPara("char", chars[i], text, "event");

    }




}

function printObjects() {

    var objs = getSceneObjs(gameworld.scene);
    var thisObjMsg = " ",thisObj= {};

    for (var i=0;i < objs.length;i++)
    {  
	thisObj = getObjById(gameworld.objects, objs[i]);
	thisObjMsg = getObjMsg(objs[i]);

	thisObjMsg += " " + dispActionsForObj(objs[i]) ;

	thisObjMsg += " " + dispInventoryAsSelect(objs[i]);
        addPara("object", objs[i], thisObjMsg, "event");

    }


}





function printKeys(door) {

    var keys = getAvailKeys(door);

    var keyStr = "  ";
    for (var i=0;i < keys.length;i++)
    {
	keyStr += "Use (<a class=\"key\" href=\"javascript:selectKeyLink('" + door + "','" + keys[i] + "');\">" + getObjTitle(keys[i]) + "</a>)  ";
    }
    return keyStr; 
}

function refreshExits() {

    var scene = getObjById(gameworld.scenes, gameworld.locat);
    var exits = scene.exits;

    var linkText ="";

    for (j = 0;j < exits.length;j++)

    {
	var doorObj = getObjById(gameworld.doors, exits[j]);

	if (doorObj != null)
	{

	    if (doorObj.status != 0)
	    {
		linkText += "<li>" + doorObj.title ;
		if (doorObj.status == 1)
		{
		    linkText += " (Closed) <a href=\"javascript:gameworld.openDoor('" + exits[j] + "');refreshExits();gameworld.incTurns();dispTurns();\">" + "Open" + "</a>";
		}
		else if (doorObj.status == 2)
		{
		    linkText += " (Locked) " + printKeys(doorObj.id);
		}
		linkText += "</li>";
	    }

	}
	else
	{
	    var anotherRoom = getObjById(gameworld.scenes, exits[j]);

	    if (typeof(anotherRoom) != "undefined")
	    {

		anotherRoomTxt = anotherRoom.title;
		linkText += "<li><a href=\"javascript:gameworld.locat='" + exits[j] + "';gameworld.incTurns();scener();\">" + anotherRoomTxt + "</a></li>";
	    }
	}
    }
    document.getElementById("exits").innerHTML = "<ul>" + linkText + "</ul>";
}

function currEvntMsg(evnt) {
    var currEv = getObjById(gameworld.scene.events, evnt);


    if (currEv != null)
    {
	return currEv.msg ;
    }
    else
    {
	currEv = getObjById(gameworld.events, evnt);
	if (currEv != null)
	{
	    return currEv.defaultMsg ;
	}
    }
    return "";
}



function displayEvents() {
    var evntMsg = "", pnode = null,tnode= null;
    for (var i=0;i < gameworld.evnt.length;i++)
    {
	addPara("event", gameworld.evnt[i], currEvntMsg(gameworld.evnt[i]), "event");

    }
    printObjects();

}


function refreshEvents() {
    var count = 0, objObj ={};
    while (count < gameworld.evnt.length)
    {
	objObj = getObjById(gameworld.scene.events, gameworld.evnt[count]);

	if (objObj != null && typeof(objObj.code) != "undefined")
	{
	    runScript(objObj.code);
	}
	count++;
    }
}

function dispHealth() {
    var healthText = gameworld.getHealthLabel();

    if (healthText == "")
    {
	healthText = "Health : " + gameworld.health.current + "/" + gameworld.health.max;
    }

    document.getElementById("health").innerHTML = healthText;

}

function scener() {

    /* try
     {*/
    gameworld.sceneInit();
    
    document.getElementById("event").innerHTML = "";

    document.getElementById("title").innerHTML = gameworld.scene.title;  
    document.getElementById("description").innerHTML = gameworld.scene.description;  

    refreshExits();
    dispInventory();
    gameworld.refreshEvents();
    displayEvents();
    
    dispChars();

    dispHealth();
    deleteEvents() ;

    /* } catch(e) {
     alert("Scener exception:" + e.toString());
     }*/

}





