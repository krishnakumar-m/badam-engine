var ObjType = {
	"KEY":1,
	"PROP":2,
	"WEAPON":3,
	"FLAG":4,
	"CONTAINER":5,
	"CANNOT_CARRY":6,
	"LOCK":7

};

turns = 0;

// Goes into engine

function getObjById(objArray, id) {
	for (var i = 0;i < objArray.length;i++)
	{
        if (objArray[i].id == id)
		{
            return objArray[i];
        }
    }
	return null;
}



function openDoor(doorName) {

	var door = getObjById(doors, doorName);

	for (i = 0;i < door.connects.length;i++)
	{
		var scene = getObjById(scenes, door.connects[i]);

		var doorIndx = scene.exits.indexOf(doorName);

		scene.exits.splice(doorIndx, 1);

		for (j = 0;j < door.connects.length;j++)
		{
			scene.exits.splice(doorIndx, 0, door.connects[j]);
		}

		scene.exits.splice(scene.exits.indexOf(scene.id), 1);

	}

	door.status = 0;
	return true;

}

function getKeys(door) {
	var doorObj = getObjById(doors, door);
	if (doorObj != null)
	{
		return doorObj.key;
	}
    return null;
}

function unlock(door, key) {

	var doorObj = getObjById(doors, door);
	if (typeof(doorObj.key) == "undefined")
	{
		console.log("No keys available for door:" + door);
		return false;
	}
	if (doorObj.key.indexOf(key) != -1)
	{
		console.log(door + " unlocked with " + key);
		doorObj.status = 1;
		return true;
	}
	return false;

}

function getAvailKeys(door) {
	var keys = getKeys(door);

	var availKeys = new Array();
	for (var i=0;i < inventory.length;i++)
	{
		if (keys.indexOf(inventory[i]) > -1)
		{
			availKeys.push(inventory[i]);
		}
	}
	return availKeys;
}

function useKey(door, key) {
	if (unlock(door, key))
	{
	    inventory.splice(inventory.indexOf(key), 1);
		return true;
	}
	return false;
}

function getSceneObjs(scene) {
	if (typeof(scene.objects) != "undefined")
	{
		return scene.objects;
	}
	return null;
}


function getEvntObjs(scene) {
	var objList = new Array();
	for (var i=0;i < evnt.length;i++)
	{
		var evntObj= getObjById(scene.events, evnt[i]);
		if (evntObj != null && typeof(evntObj.objs) != "undefined")
		{
			objList = objList.concat(evntObj.objs);
		}
	}
	return objList;
}


function addExit(ev) {
	scene.exits.push(ev);
}


function addEvent(ev) {
	evnt.push(ev);
}

function removeEvent(ev) {
	evnt.splice(evnt.indexOf(ev), 1);
}

function addObjToScene(obj) {
	scene.objects.push(obj);
}

function remObjFromScene(obj) {
	scene.objects.splice(scene.objects.indexOf(obj), 1);
}

function selectObject(objName) {
	var objObj = getObjById(objects, objName);
	if (objObj == null)
	{
		return false;
	}

	if (typeof(objObj.unlockdoor) != "undefined")
	{
		unlock(objObj.unlockdoor, objName);
	}

	if (typeof(objObj.code) != "undefined")
	{
		runScript(objObj.code);
	}
	if (objObj.type.indexOf(ObjType.CANNOT_CARRY) == -1)
	{
		inventory.push(objName);
		remObjFromScene(objName);
	}
	return true;
}

function getObjTitle(objName) {
	var objObj = getObjById(objects, objName);
	return objObj.title;
}

function getObjMsg(objName) {
	var objObj = getObjById(objects, objName);
	if (typeof(objObj.msg) != "undefined")
	{
		return objObj.msg;
	}
	return objObj.title;
}

function combineObjects(objName1, objName2) {
	var obj1 = getObjById(objects, objName1);
	if (obj1 != null && typeof(obj1.workswith) != "undefined")
	{
		var combo = getObjById(obj1.workswith, objName2);
		return combo;
	}
	return null;
}

function getHealthLabel() {
	
	if (typeof(health.label) == "undefined") {
		return "";
	}
		
	var unitHlth = health.max / health.label.length;

	var indx = Math.ceil(health.current / unitHlth);
	
	return health.label[indx-1];
}
