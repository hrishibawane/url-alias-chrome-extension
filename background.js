/*
 * Background script
 */

// Empty alias to URL mapping
var aliasToURLMap = {}
var aliasToURLParsed = JSON.stringify(aliasToURLMap);

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ aliasToURLParsed });
	console.log("URL map value set");
});

chrome.omnibox.onInputEntered.addListener((alias) => {
	console.log("Alias received: ", alias);
	chrome.storage.sync.get("aliasToURLParsed", ({ aliasToURLParsed }) => {
		var aliasToURLMap = JSON.parse(aliasToURLParsed);
		chrome.tabs.create({ url: aliasToURLMap[alias] });
	});
});
