/*
 * Action script for extension popup
 */

var aliasToUrlMap;

window.onload = setPrevAliases;

document.getElementById("saveAlias").addEventListener("click", saveNewAlias);

function setPrevAliases() {
	chrome.storage.sync.get("aliasToURLParsed", ({aliasToURLParsed}) => {
		aliasToUrlMap = JSON.parse(aliasToURLParsed);
		var displayStr = "";
		for (var alias in aliasToUrlMap)
		{
			displayStr += alias + ": " + aliasToUrlMap[alias];
			displayStr += "<br />";
		}
		document.getElementById("prevAliases").innerHTML = displayStr;
	});
}

function saveNewAlias() {
	var newAlias = document.getElementById("aliasInput").value;
	var newUrl = document.getElementById("urlInput").value;
	aliasToUrlMap[newAlias] = newUrl;
	var aliasToURLParsed = JSON.stringify(aliasToUrlMap);
	chrome.storage.sync.set({ aliasToURLParsed });
	setPrevAliases();
}