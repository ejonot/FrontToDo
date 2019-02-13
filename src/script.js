
  function majClasseEtats(){
  var etats=document.getElementById("etats");
  for(var i = 0; i < etats.children.length; i++) {
    var etat=etats.children[i];
    etat.className = etat.className.replace(/\bactive\b/g, "");
    if(etat.querySelectorAll("input")[0].checked) etat.className+=" active";
    }
}


function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};
