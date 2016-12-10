document.addEventListener('DOMContentLoaded', function() {
    var unsavedChanges = false;
   
    chrome.storage.sync.get("browserNotesSave", function (items) {
        if(items["browserNotesSave"]!==undefined){
            document.getElementById("myarea").value = items["browserNotesSave"]
        }        
    });

    $('#myarea').bind('input propertychange', function() {      
        unsavedChanges = true;      
    });

    window.setInterval(function(){
        if(unsavedChanges){
            var txt = document.getElementById("myarea").value;
            
            chrome.storage.sync.set({"browserNotesSave" : txt}, function() {                
                unsavedChanges = false;
            });        
        }
    }, 250);
});