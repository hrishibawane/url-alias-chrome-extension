/*
 * Action script for extension popup
 */

var aliasToUrlMap;

window.onload = setPrevAliases;

document.getElementById("saveAlias").addEventListener("click", saveNewAlias);

function saveNewAlias() {
	var newAlias = document.getElementById("aliasInput").value;
	var newUrl = document.getElementById("urlInput").value;
	aliasToUrlMap[newAlias] = newUrl;
	var aliasToURLParsed = JSON.stringify(aliasToUrlMap);
	chrome.storage.sync.set({ aliasToURLParsed });
	setPrevAliases();
}

function setPrevAliases() {
	chrome.storage.sync.get("aliasToURLParsed", ({aliasToURLParsed}) => {
		aliasToUrlMap = JSON.parse(aliasToURLParsed);
		var parentElem = document.getElementById("prevAliases");
		parentElem.innerHTML = "";
		for (var alias in aliasToUrlMap)
		{
			var listTag = document.createElement("li");
			listTag.className = "list-group-item";
			var listText = document.createTextNode(alias + ": " + aliasToUrlMap[alias]);
			listTag.appendChild(listText);
			parentElem.appendChild(listTag);
		}
		//document.getElementById("prevAliases").innerHTML = displayStr;
	});
}
