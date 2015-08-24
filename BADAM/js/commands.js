function execCommand(line) {
	var arr = line.split(" ");
	switch (arr[0])
	{
		case "ADD_OBJ": addObjToScene(arr[1]);
			break;
		case "REMOVE_OBJ": remObjFromScene(arr[1]);
			break;
		case "START_EVENT": addEvent(arr[1]);
			break;
		case "STOP_EVENT": removeEvent(arr[1]);
			break;
		case "ADD_EXIT":unlock(arr[1],arr[2]);
						addExit(arr[1]);
			break;
	}
}
function runScript(instns) {
	for(var i=0;i<instns.length;i++) {
		execCommand(instns[i]);
	}
}
