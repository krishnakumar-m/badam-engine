


function dispInventory() {
	var inventoryList = "";
	for (var i=0;i < inventory.length;i++)
	{
		inventoryList += "<li>" + getObjTitle(inventory[i]) + "</li>";
	}
	document.getElementById("items").innerHTML = "<ul>" + inventoryList + "</ul>";

	dispTurns();
}

function dispInventoryAsSelect(objName) {
	var inventoryList = "<select onchange=\"workOutCombination('"+objName+"',this.value);\">";
	
	inventoryList += "<option>(select)</option>";
	
	for (var i=0;i < inventory.length;i++)
	{
		inventoryList += "<option value='"+inventory[i]+"'>" + getObjTitle(inventory[i]) + "</option>";
	}
	return inventoryList+"</select>";
}
 function workOutCombination(obj1,obj2) {
	 turns++;
	 var behavr = combineObjects(obj1,obj2);
	 if(behavr != null) {
		 document.getElementById("event").innerHTML+= behavr.msg;
		 if(typeof(behavr.code)!="undefined") {
			 runScript(behavr.code);
		 }
		 refreshExits();
		 dispTurns();
	 }
 }

function dispTurns() {
	document.getElementById("turns").innerHTML = "<b>Turns : " + turns + "</b>";
}

function printObjects() {

	//var objs = getEvntObjs(scene);
	var objs = getSceneObjs(scene);
	var objectList = " ";

	for (var i=0;i < objs.length;i++)
	{  
	    var thisObj = getObjById(objects,objs[i]);
		var thisObjMsg = "<p>"+getObjMsg(objs[i]);
	
		if(typeof(thisObj.type) !="undefined" && thisObj.type.indexOf(ObjType.CANNOT_CARRY) == -1) {
		 thisObjMsg += " <a href=\"javascript:if(selectObject('" + objs[i] + "')){refreshEvents();dispInventory();turns++;dispTurns();}\">" + "Take" + "</a>";
		}
		
		thisObjMsg += " "+ dispInventoryAsSelect(objs[i]);
		
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
		keyStr += "Use (<a class=\"key\" href=\"javascript:if(useKey('" + door + "','" + keys[i] + "')){refreshExits();dispInventory();turns++;dispTurns();}\">" + getObjTitle(keys[i]) + "</a>)  ";
	}
	return keyStr; 
}

function refreshExits() {

	var scene = getObjById(scenes, locat);
	var exits = scene.exits;

	var linkText ="";

	for (j = 0;j < exits.length;j++)

	{
		var doorObj = getObjById(doors, exits[j]);

        if (doorObj != null)
		{

			if (doorObj.status != 0)
			{
				linkText += "<li>" + doorObj.title ;
				if (doorObj.status == 1)
				{
					linkText += " (Closed) <a href=\"javascript:openDoor('" + exits[j] + "');refreshExits();turns++;dispTurns();\">" + "Open" + "</a>";
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
			var anotherRoom = getObjById(scenes, exits[j]);

			if (typeof(anotherRoom) != "undefined")
			{

				anotherRoomTxt = anotherRoom.title;
				linkText += "<li><a href=\"javascript:locat='" + exits[j] + "';turns++;scener();\">" + anotherRoomTxt + "</a></li>";
			}
		}
	}
	document.getElementById("exits").innerHTML = "<ul>" + linkText + "</ul>";
}

function currEvntMsg(evnt) {
	var currEv = getObjById(scene.events, evnt);
	var evntMsg = "";
	if (currEv != null)
	{
		evntMsg = "<p>"+currEv.msg+"</p>";
	} else {
		currEv = getObjById(events,evnt);
		if(currEv != null) {
			evntMsg = "<p>"+currEv.defaultMsg+"</p>";
		}
	}
	return evntMsg;
}

function refreshEvents() {
	var evntMsg = "";
	for (var i=0;i < evnt.length;i++)
	{
		evntMsg += currEvntMsg(evnt[i]);
		var objObj = getObjById(scene.events, evnt[i]);

		if (objObj != null && typeof(objObj.code) != "undefined")
		{
			runScript(objObj.code);
	    }

	}
	document.getElementById("event").innerHTML = evntMsg + printObjects();

}

function dispHealth() {
	var healthText = getHealthLabel();
	
	if (healthText=="")
	{
		healthText = "Health : " + health.current + "/" + health.max;
	}
	
	document.getElementById("health").innerHTML = healthText;

}

function scener() {

	try
	{

		scene = getObjById(scenes, locat);

		document.getElementById("title").innerHTML = scene.title;  
		document.getElementById("description").innerHTML = scene.description;  

		refreshExits();
		dispInventory();
		refreshEvents();
		dispHealth();

	} catch(e) {
		alert("Scener exception:" + e.toString());
	}

}

