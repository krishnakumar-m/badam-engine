


function dispInventory() {
    var inventoryList = "";
    for (var i=0;i < gameworld.inventory.length;i++)
    {
	inventoryList += "<li>" + getObjTitle(gameworld.inventory[i]) + "</li>";
    }
    document.getElementById("items").innerHTML = "<ul>" + inventoryList + "</ul>";

    dispTurns();
}

function dispInventoryAsSelect(objName) {
    var inventoryList = "<select onchange=\"workOutCombination('" + objName + "',this.value);\">";

    inventoryList += "<option value=''>(select)</option>";

    for (var i=0;i < gameworld.inventory.length;i++)
    {
	inventoryList += "<option value='" + gameworld.inventory[i] + "'>" + getObjTitle(gameworld.inventory[i]) + "</option>";
    }
    return inventoryList + "</select>";
}

function dispInvOptionsForChar(objName) {
    var inventoryList = "<select onchange=\"applyItemOnChar(this.value,'" + objName + "');\">";

    inventoryList += "<option value=''>(select)</option>";

    for (var i=0;i < gameworld.inventory.length;i++)
    {
	inventoryList += "<option value='" + gameworld.inventory[i] + "'>" + getObjTitle(gameworld.inventory[i]) + "</option>";
    }
    return inventoryList + "</select>";
}

function workOutCombination(obj1, obj2) {
    if (obj2 != "")
    {
	gameworld.incTurns();
	var behavr = combineObjects(obj1, obj2);
	if (behavr != null)
	{
	    document.getElementById("event").innerHTML += behavr.msg;
	    if (typeof(behavr.code) != "undefined")
	    {
		runScript(behavr.code);
	    }
	    refreshExits();
	    dispTurns();
	}
    }
}

function applyItemOnChar(obj, char) {
    if (obj != "")
    {
	gameworld.incTurns();

	var behavr = useObjectOnChar(obj, char);
	if (behavr != null)
	{
	    document.getElementById("event").innerHTML += behavr.msg;
	    if (typeof(behavr.code) != "undefined")
	    {
		runScript(behavr.code);
	    }
	    refreshExits();
	    dispTurns();
	}
    }

}

function dispTurns() {
    document.getElementById("turns").innerHTML = "<b>Turns : " + gameworld.turns + "</b>";
}

function dispChars() {
    var chars = gameworld.scene.chars, i, j, events=gameworld.evnt,text ="",thisEvent;
    if (typeof(chars) == "undefined")
    {
	return;
    }


    for (i = 0;i < chars.length;i++)
    {
	var charObj = getObjById(gameworld.chars, chars[i]);
	text += charObj.defaultMsg;
	for (j = 0;j < events.length;j++)
	{

	    thisEvent = getObjById(charObj, events[j]);
	    if (thisEvent != null)
	    {
		text += "<p>" + thisEvent.msg + "</p>";
	    }

	}

	text += " " + dispInvOptionsForChar(chars[i]) + "<br/>";

    }

    document.getElementById("event").innerHTML += text;


}

function printObjects() {

    var objs = getSceneObjs(gameworld.scene);
    var objectList = " ";

    for (var i=0;i < objs.length;i++)
    {  
	var thisObj = getObjById(gameworld.objects, objs[i]);
	var thisObjMsg = "<p>" + getObjMsg(objs[i]);

	if (typeof(thisObj.type) != "undefined" && thisObj.type.indexOf(ObjType.CANNOT_CARRY) == -1)
	{
	    thisObjMsg += " <a href=\"javascript:if(selectObject('" + objs[i] + "')){refreshEvents();dispInventory();gameworld.incTurns();dispTurns();}\">" + "Take" + "</a>";
	}

	thisObjMsg += " " + dispInventoryAsSelect(objs[i]);

	thisObjMsg += "</p>";

	objectList += thisObjMsg;
    }

    return " " + objectList + " ";
}


function printKeys(door) {

    var keys = getAvailKeys(door);

    var keyStr = "  ";
    for (var i=0;i < keys.length;i++)
    {
	keyStr += "Use (<a class=\"key\" href=\"javascript:if(useKey('" + door + "','" + keys[i] + "')){refreshExits();dispInventory();gameworld.incTurns();dispTurns();}\">" + getObjTitle(keys[i]) + "</a>)  ";
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
		    linkText += " (Closed) <a href=\"javascript:openDoor('" + exits[j] + "');refreshExits();gameworld.incTurns();dispTurns();\">" + "Open" + "</a>";
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
    var evntMsg = "";
    if (currEv != null)
    {
	evntMsg = "<p>" + currEv.msg + "</p>";
    }
    else
    {
	currEv = getObjById(gameworld.events, evnt);
	if (currEv != null)
	{
	    evntMsg = "<p>" + currEv.defaultMsg + "</p>";
	}
    }
    return evntMsg;
}

function refreshEvents() {
    var evntMsg = "";
    for (var i=0;i < gameworld.evnt.length;i++)
    {
	evntMsg += currEvntMsg(gameworld.evnt[i]);
	var objObj = getObjById(gameworld.scene.events, gameworld.evnt[i]);

	if (objObj != null && typeof(objObj.code) != "undefined")
	{
	    runScript(objObj.code);
	}

    }
    document.getElementById("event").innerHTML = evntMsg + printObjects();

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

    try
    {
	gameworld.init();
	//gameworld.scene = getObjById(gameworld.scenes, gameworld.locat);

	document.getElementById("title").innerHTML = gameworld.scene.title;  
	document.getElementById("description").innerHTML = gameworld.scene.description;  

	refreshExits();
	dispInventory();
	refreshEvents();
	dispChars();
	dispHealth();

    } catch(e) {
	alert("Scener exception:" + e.toString());
    }

}

