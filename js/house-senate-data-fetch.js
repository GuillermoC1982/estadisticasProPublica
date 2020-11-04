var membersSenate;

var init = {
  headers:{
      "X-API-Key" : "aVtP95QyTYzCwyKe92E0juIuwpV24hqZW1zlLje8" 
  }
};

var membersVue = new Vue ({
    el: '#membersData',
    data: {
     membersSenate: {}
  }
});

var url = 'https://api.propublica.org/congress/v1/113/house/members.json';

if(document.title.includes("Senate")){
  
  url = 'https://api.propublica.org/congress/v1/113/senate/members.json', init;

}
 
  fetch(url, init)
  .then(function(response){
    return response.json();
  })       
  .then(function(json){
      membersVue.membersSenate = json.results[0].members;
    

      //membersOfSenateTable();
      
});