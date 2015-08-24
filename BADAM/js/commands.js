function execCommand(line) {
	var arr = line.split(" ");
	switch (arr[0])
	{
		case "ADD_OBJ": for(var i=1;i<arr.length;i++) {
							addObjToScene(arr[i]);
						}
			break;
		case "REMOVE_OBJ": for(var i=1;i<arr.length;i++) {
								remObjFromScene(arr[i]);
							}
			break;
		case "START_EVENT": for(var i=1;i<arr.length;i++) {
								addEvent(arr[i]);
							}
			break;
		case "STOP_EVENT": for(var i=1;i<arr.length;i++) {
								removeEvent(arr[i]);
							}
			break;
		case "ADD_EXIT":if(arr.length>2) {
							unlock(arr[1],arr[2]);
						}
						addExit(arr[1]);
			break;
	}
}
function runScript(instns) {
	for(var i=0;i<instns.length;i++) {
		execCommand(instns[i]);
	}
}
