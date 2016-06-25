var code = document.getElementById("code");

run();

function run() {
	var output = "";

	var lines = code.value.split("\n");

	var variables = {};

	for(var ip = 0; ip < lines.length; ip++) {
		var line = lines[ip].split(" ");

		if(line[0] == "output") {
			if(line[1].charAt(0) == "(") {
				var variable = line[1];
				variable = variable.replace("(", "");
				variable = variable.replace(")", "");
				output = output.concat(variables[variable]);
			} else {
				output = output.concat(line[1]);
			}
		} else if(line[0] == "newline") {
			output = output.concat("<br>");
		} else if(line[0] == "variable") {
			var variable = line[1];
			var value = line[2];
			variables[variable] = value;
		} else if(line[0] == "add") {
			var result = line[1];
			result = result.replace("(", "");
			result = result.replace(")", "");
			var a = getVariableOrValue(line[2], variables);
			var b = getVariableOrValue(line[3], variables);
			variables[result] = Number(a) + Number(b);
		} else if(line[0] == "subtract") {
			var result = line[1];
			result = result.replace("(", "");
			result = result.replace(")", "");
			var a = getVariableOrValue(line[2], variables);
			var b = getVariableOrValue(line[3], variables);
			variables[result] = Number(a) - Number(b);
		}
		 else if(line[0] == "multiply") {
			var result = line[1];
			result = result.replace("(", "");
			result = result.replace(")", "");
			var a = getVariableOrValue(line[2], variables);
			var b = getVariableOrValue(line[3], variables);
			variables[result] = Number(a) * Number(b);
		}
		 else if(line[0] == "divide") {
			var result = line[1];
			result = result.replace("(", "");
			result = result.replace(")", "");
			var a = getVariableOrValue(line[2], variables);
			var b = getVariableOrValue(line[3], variables);
			variables[result] = Number(a) / Number(b);
		}
	}
	variables = null;

	if(output == "") {
		output = "<br>"
	}

	document.getElementById("output").innerHTML = output;
}

function getVariableOrValue(value, variables) {
	var ret = value;
	if(ret.charAt(0) == "(") {
		ret = ret.replace("(", "");
		ret = ret.replace(")", "");
		ret = variables[ret];
	}
	return ret;
}