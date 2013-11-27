function handleCommand(cmd) // After Enter has been pressed, select the correct result to display
{
	var el = document.getElementById("prompt"); // Remove the prompt to prevent conflits with uniques IDs
	el.parentNode.removeChild(el);
	var cu = document.getElementById("cursor"); // Same here with the cursor
	cu.parentNode.removeChild(cu);
	var content = document.getElementById("content");
	content.innerHTML += " " + cmd + "<br />"; // Keep a trace of the command
	
	
	var spl = cmd.split(" ");
	var command = spl[0];
	var args = Array();
	if(spl.length == 1) {args = undefined;}
	else 
	{
		args[0] = "null";
		for(var p=1; p < spl.length; p++)
		{
			args[p] = spl[p];
		}
	}
	
	
	// Then a long series of cases, where the correct page is being loaded
	switch(command)
	{
		case "cat":
			if(args)
			{
				switch(args[1])
				{
					case "aboutme":
					break;
					case "competences" :
					case "skills" :
						content.innerHTML += load_file("skills.html");
					break;
					case "divers" :
					break;
					case "etatcivil" :
						content.innerHTML += load_file("aboutme.html");
					break;
					case "experience" :
						content.innerHTML += load_file("experience.html");
					break;
					case "linux":
						content.innerHTML += load_file("linux.html");
					break;
				}
			}
			else {content.innerHTML += "No argument specified. Aborting.";}
		break;
		case "clear" :
			content.innerHTML = "";
		break;
		
		case "help" :
			content.innerHTML += load_file("help.html");
		break;
		case "ifconfig":
			if(args && args[1] != "lo" )
			{
				content.innerHTML += "Error while loading "+args[1]+": Device not found";
			}
			else {content.innerHTML += load_file("ifconfig.html");}
			break;
		case "ls" : 
			content.innerHTML += load_file("ls.html");
		break;
		case "man":
		if(args)
		{
			switch(args[0])
			{
				case "cat":
				break;
			}
		}
		else {"No argument specified. Aborting."}	
		break;
		case "moo" : 
			content.innerHTML += load_file("moo.html");
		break;
		case "mkdir":
			content.innerHTML += "Sorry, I am read-only ... and you're not root!";
			break;
		case "refresh" :
			window.location.reload(true);
		break;
		case "su":
		case "sudo":
			content.innerHTML += "I was sure you would try that... But no, sorry :(";
			// You're such a badass :D
			break;
		
		case "":
		break;
		default:
			content.innerHTML += command + " : command not found ";
	}	
	scroll();
	content.innerHTML += "<br />" + load_file("prompt.html"); // And then display back the prompt
}
