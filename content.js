
$(function(){

       
    $(document.body).bind('mouseup', function(e){
        var selection;
        
        if (window.getSelection) {
          selection = window.getSelection();
        } 
        else if (document.selection) {
          selection = document.selection.createRange();
        }

        //converting to word which is free from spaces
        selection=selection.toString();
        selection=selection.replace(" ","");

        //checks whether there is something to check for meaning or not
        if(selection!=''){

        var ourRequest = new XMLHttpRequest();
        var url='https://od-api.oxforddictionaries.com:443/api/v1/entries/en/'+selection;
        // get the api id and key from https://developer.oxforddictionaries.com/
        var api_id = "";
        var api_key = "";
        ourRequest.open('GET', url);
        ourRequest.setRequestHeader("Accept","application/json");
        ourRequest.setRequestHeader("app_id",api_id);
        ourRequest.setRequestHeader("app_key",api_key);
         var cc=document.getElementById("myModal124");
            if (cc!=null) {
              cc.remove();
            }
                var btn = document.createElement("div");
                btn.setAttribute("id","popup1");
                document.body.appendChild(btn);
              document.getElementById("popup1").outerHTML='<div id="myModal124" class="modal124"><div class="modal-content124"><span class="close124">&times;</span><h1 class="h1124">'+selection+'</h1> <p class="p124" id="pp1124">Loading...</p><input type="button" value="click here for more information..." id="syn1124"/><p id="rel1124"></p> </div></div>';
                  var modal = document.getElementById('myModal124');
                  var span = document.getElementsByClassName("close124")[0];
                modal.style.display = "block";
       ourRequest.onload = function() {
      
        span.onclick = function() {
              modal.style.display = "none";
          }

          // When the user clicks anywhere outside of the modal, close it
          window.onclick = function(event) {
              if (event.target == modal) {
                  modal.style.display = "none";
              }
          }
            if (ourRequest.status >= 200 && ourRequest.status < 400) {
            var ourData = JSON.parse(ourRequest.responseText);
            var ab = ourData.results[0].lexicalEntries[0].entries[0].senses[0].definitions;
            document.getElementById('pp1124').innerHTML=ab;
          
          modal.style.display = "block";
          // When the user clicks on <span> (x), close the modal
} else {
      var syn=document.getElementById('syn1124');
      if(syn!=null){
        document.getElementById('syn1124').remove();
      }
      
      if ((/(.*)ed_?/.exec(selection)))
     {
      document.getElementById('pp1124').innerHTML="<p>Sorry..Invalid selection</p><p>You are suggested to select only v1 form of the verb..</p><p>1.Are you searching for <b>"+selection.substr(0,selection.length-2)+"</b></p> ";
     }
     else if((/(.*)es_?/.exec(selection))){
      document.getElementById('pp1124').innerHTML="<p>Sorry..Invalid selection</p><p>You are suggested to select only v1 form of the verb..</p><p>2Are you searching for <b>"+selection.substr(0,selection.length-2)+"</b></p> ";
     }
     else if((/(.+)+s_?/.exec(selection))){
      document.getElementById('pp1124').innerHTML="<p>Sorry..Invalid selection</p><p>You are suggested to select only v1 form of the verb..</p><p>3Are you searching for <b>"+selection.substr(0,selection.length-1)+"</b></p> ";
     }
     else if((/(.*)ing_?/.exec(selection))){
      document.getElementById('pp1124').innerHTML="<p>Sorry..Invalid selection</p><p>You are suggested to select only v1 form of the verb..</p><p>4Are you searching for <b>"+selection.substr(0,selection.length-3)+"</b></p> ";
     }
    }
};
  ourRequest.send();

document.getElementById("syn1124").addEventListener("click", function(){

            var url='https://od-api.oxforddictionaries.com:443/api/v1/entries/en/'+selection+'/synonyms;antonyms';
            // get the api id and key from https://developer.oxforddictionaries.com/
            var api_id = "";
            var api_key = "";
            ourRequest.open('GET', url);
            ourRequest.setRequestHeader("Accept","application/json");
            ourRequest.setRequestHeader("app_id",api_id);
            ourRequest.setRequestHeader("app_key",api_key);
            document.getElementById('rel1124').innerHTML="Loading...";
             document.getElementById('syn1124').remove();
            ourRequest.onload = function() {
    
   
       if (ourRequest.status >= 200 && ourRequest.status < 400) {

      var ourData = JSON.parse(ourRequest.responseText);
      if ("examples" in ourData.results[0].lexicalEntries[0].entries[0].senses[0]) {var re='<hr><b>Example</b> : '+ourData.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text;}
       re = re+'<br><br><b>Synonym</b> : '+ourData.results[0].lexicalEntries[0].entries[0].senses[0].synonyms[0].id;
       if ("antonyms" in ourData.results[0].lexicalEntries[0].entries[0].senses[0]) {re=re+'<br><br> <b>Antonym</b> : '+ourData.results[0].lexicalEntries[0].entries[0].senses[0].antonyms[0].id;}
       document.getElementById('rel1124').innerHTML=re;
}
else{
  document.getElementById('rel1124').innerHTML="No related data found!";
}
};
 ourRequest.send();
});
}
});
});
