var code = document.getElementById("code");

var variables = {};
var output = "";
var error = false;

exception("Press \"Run\" to start the program");

function run() {
	variables = {};
	output = "";

	var lines = code.value.trim().split(";");
	lines.pop();

	if (lines.length > 0) {
		for (var i = 0; i < lines.length; i++) {
			if (!error) {
				var line = lines[i].trim().split("(");
				interpretLine(line);
			}
		}
	} else {
		exception("Program has 0 lines of code");
	}
}

function interpretLine(line) {
	if (line.length == 1) {
		exception("\"" + line + "\" is not a valid line of code");
	}
	var command = line[0].trim();
	var args = line[1].trim();
	args = args.replace("(", "");
	args = args.replace(")", "");
	args = args.split(",");
	for (var i = 0; i < args.length; i++) {
		args[i] = args[i].trim();
	}

	if(command == "output") {
		if(args.length == 1) {
			var line = args[0];
			updateOutput(line);
		} else {
			exception("The command output requires exactly one argument");
		}
	} else if(command == "newline") {
		updateOutput("<br>");
	} else {
		exception("\"" + command + "\" is not a valid command");
	}
}

function updateOutput(text) {
	output = output.concat(text);
	document.getElementById("output").innerHTML = output;
}

function exception(message) {
	error = true;
	document.getElementById("output").innerHTML = "<div style=\"color:red\">" + message + "</div>";
}

function getValue(value) {
	var ret = value.trim();
	if(ret.charAt(0) == "(") {
		ret = ret.replace("(", "");
		ret = ret.replace(")", "");
		ret = variables[ret];
	}
	return ret;
}