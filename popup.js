/*
 * Action script for extension popup
 */

var aliasToUrlMap;

window.onload = setPrevAliases;

document.getElementById("saveAlias").addEventListener("click", saveNewAlias);
document.getElementById("copyURL").addEventListener("click", copyCurrentURL);

function saveNewAlias() {
	var newAlias = document.getElementById("aliasInput").value;
	var newUrl = document.getElementById("urlInput").value;
	aliasToUrlMap[newAlias] = newUrl;
	var aliasToURLParsed = JSON.stringify(aliasToUrlMap);
	chrome.storage.sync.set({ aliasToURLParsed });
	setPrevAliases();
}

function copyCurrentURL() {
	var options = {active: true, currentWindow: true};
	chrome.tabs.query(options, (tabs) => {
		document.getElementById("urlInput").value = tabs[0].url;
	});
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
	});
}
