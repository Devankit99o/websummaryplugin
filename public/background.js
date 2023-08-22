/* global chrome */
chrome.runtime.onInstalled.addListener(function() {
    console.log('Extension installed!');
  });
  
  chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const currentUrl = tabs[0].url;
      console.log('this is background',currentUrl);
    });
  });
  