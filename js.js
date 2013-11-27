function autocomplete()
{
	var commandes = ["aboutme", "clear", "competences", "divers", "experience", "help", "ls", "moo", "refresh", "skills", ""];
	var nb = 0;
	var elem = document.getElementById("prompt");
	var content = document.getElementById("content");
	var pos=0;
	// Pour chaque élément du tableau des commandes
	for(var i=0;i<commandes.length;i++)
	{
		// On checke si le bout de commande tapé correspond au début d'une commande valide
		if(commandes[i].indexOf(elem.innerHTML.substring(6)) == 0)
		{
			nb++;
			pos = i;
		}
	}
	if(nb == 1) elem.innerHTML = "&nbsp;"+commandes[pos].toString();
}

function clavier(e) // reads the keyboard entry
{
	var elem = document.getElementById("prompt");
	//content.innerHTML += e.keyCode;
	if(e.keyCode > 64 && e.keyCode < 91) // a-z
	{
		var cle = e.keyCode + 32; // lowercase
		elem.innerHTML += String.fromCharCode(cle);
	}
	switch(e.keyCode)
	{
		//alert(e.keyCode);
		case 8 : // Backspace
			var str = elem.innerHTML.substring(0, elem.innerHTML.length-1); // delete one letter
			elem.innerHTML = str;
			break;
		case 9 : // Tab
			autocomplete();
			break;
		case 32 : // ESPACE
			elem.innerHTML += " ";
			break;
		case 109 : // -
		case 189 :
			elem.innerHTML += "-";
			break;
		case 110 : // .
		case 190 :
			elem.innerHTML += ".";
			break;
		case 13: // ENTER
			handleCommand(elem.innerHTML.substring(6));
			break;
	}
	
}

function flashCursor()
{
	if(document.getElementById("cursor") != null) // Is it does not exist, just don't :)
	{
		if(document.getElementById("cursor").style.backgroundColor=="white"){ // If it's white, put it black
			document.getElementById("cursor").style.backgroundColor="black";
		}
		else{
			document.getElementById("cursor").style.backgroundColor="white"; // Else put it white
		}
	}
	setTimeout("flashCursor",500); // Every 500ms
}

function load() // At the page loading
{
	setTimeout('document.getElementById("content").innerHTML = load_file("welcome.html")', 750); // Welcome after 750ms
	setTimeout('document.getElementById("content").innerHTML += load_file("prompt.html")', 1200); // Put the prompt after
	setTimeout('flashCursor', 1800); // and flash the prompt
	scroll();
}

function load_file(fichier) // Load an HTML file
{
	var requete = null;
	if (window.XMLHttpRequest) requete = new XMLHttpRequest();
	else if (window.ActiveXObject) requete = new ActiveXObject("Microsoft.XMLHTTP");
	else return;
	requete.open('GET', fichier, false);
	requete.send(null);
	return requete.responseText;
}



function scroll() // Allows the page to be scrolled automatically
{
	var objDiv = document.getElementById("content");
	objDiv.scrollTop = objDiv.scrollHeight;
}

function unload() // Useless
{
	document.getElementById("content").innerHTML = " ";
}
