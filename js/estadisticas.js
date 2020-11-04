var membersSenate;

var Table = new Vue ({
  el: '.container',
  data: {
      statistics:{
    
    numberOfSenators : 0 ,
    numberOfDemocrats : 0 ,
    numberOfRepublicans : 0 ,
    numberOfIndependient : 0 ,
    
    democratsAverageVotes : 0 ,
    republicansAverageVotes : 0 ,
    independientAverageVotes : 0 ,
    lessVotesMembers: 0 ,
    moreVotesMembers: 0 ,
    mostloyaleMembers: 0 ,
    leastloyaleMembers: 0 ,
}
   
  }
});

var init = {
  headers:{
      "X-API-Key" : "aVtP95QyTYzCwyKe92E0juIuwpV24hqZW1zlLje8" 
  }
};

var url = 'https://api.propublica.org/congress/v1/113/house/members.json';

if(document.title.includes("Senate")){

  url = 'https://api.propublica.org/congress/v1/113/senate/members.json'

}

fetch(url, init)

.then(function(response){

  return response.json();

})       

.then(function(json){

    membersSenate = json.results[0].members;

    calculateQuantityOfSenatorsAndParty();

    calculateAverageVotes();

    senatorsVoteLeastOften();

   // tdsGlanceTable(); 

    mostEngaged();

    mostloyale();

    leastloyale();

   // buildAllTables();  

   

});   




function calculateQuantityOfSenatorsAndParty(){

    var democrats = 0;
    var republicans = 0;
    var independient = 0;

    for(var i = 0 ; i < membersSenate.length ;i++){
        if(membersSenate[i].party == "D"){
            democrats++;
        }
    
    
       else if(membersSenate[i].party == "R"){
            republicans++;
        }
    
        else{
            independient++;
        }
    }

    Table.statistics.numberOfDemocrats = democrats;
    Table.statistics.numberOfRepublicans = republicans;
    Table.statistics.numberOfIndependient = independient;

}

function calculateAverageVotes(){

    var democratsVotesPrc = 0
    var republicansVotesPrc = 0
    var independientVotesPrc = 0

    for(var i = 0 ; i < membersSenate.length ;i++){
        if(membersSenate[i].party == "D"){
            democratsVotesPrc += membersSenate[i].votes_with_party_pct; 
        }

        else if(membersSenate[i].party == "R"){
            republicansVotesPrc += membersSenate[i].votes_with_party_pct; 
        }

        else{
            independientVotesPrc += membersSenate[i].votes_with_party_pct;
        }
    }
    
//----------two ways for same result. No creo que renuncien todos los demoratas o los republicanos pero dejo ambas refes con fines didacticos------//

    Table.statistics.democratsAverageVotes = (Table.statistics.numberOfDemocrats == 0) ? 0 : democratsVotesPrc / Table.statistics.numberOfDemocrats;

    Table.statistics.republicansAverageVotes = (Table.statistics.numberOfRepublicans == 0) ? 0 : republicansVotesPrc /Table.statistics. numberOfRepublicans;
    
    if(Table.statistics.numberOfIndependient == 0)
    Table.statistics.independientAverageVotes = 0;
    else
    Table.statistics.independientAverageVotes = independientVotesPrc / Table.statistics.numberOfIndependient;


}

function senatorsVoteLeastOften (){
    
    membersSenate.sort(function(pre, next) {
        return next.missed_votes_pct - pre.missed_votes_pct;
    });
 
    var prcMissedVotes = Math.round(membersSenate.length * 10 / 100);
    var lessVotesMembers= membersSenate.slice(0 , prcMissedVotes)
    
    Table.statistics.lessVotesMembers = lessVotesMembers;

}

function tdsGlanceTable(){


    

    /*var tr = "";

   
    tr+="<tr><td>Republican</td><td>" + statistics.numberOfRepublicans + "</td><td>" + (statistics.republicansAverageVotes).toFixed(2) + "%</td></tr>";
    tr+="<tr><td>Democrat</td>" + "<td>" + statistics.numberOfDemocrats +  "</td><td>" + (statistics.democratsAverageVotes).toFixed(2) + "%</td></tr>";
    tr+="<tr><td>Independent</td>" + "<td>" + statistics.numberOfIndependient +  "</td><td>" + ((statistics.independientAverageVotes).toFixed(2)|| "0" )+ "%</td></tr>";

    document.getElementById("tdsGlance").innerHTML += tr;*/

    
}

/*function generateTable(idBodyTable, colection, sType){
    var tr = "";

    for(var i = 0 ; i < colection.length; i++){

        tr+="<tr><td>" + colection[i].last_name + " " + colection[i].first_name + " " + (colection[i].middle_name || "") + "</td>";
        tr+="<td>" + ((sType == "total_votes") ? colection[i].total_votes : colection[i].missed_votes) + "</td>"
        tr+="<td>" + ((sType == "total_votes") ? colection[i].votes_with_party_pct : colection[i].missed_votes_pct) + "%</td></tr>"
    }
    document.getElementById(idBodyTable).innerHTML += tr;
}*/

function generateTable(idBodyTable, colection){
    
    
    /*var tr = "";

    for(var i = 0 ; i < colection.length; i++){

        tr+="<tr><td>" + colection[i].last_name + " " + colection[i].first_name + " " + (colection[i].middle_name || "") + "</td>";
        tr+="<td>" + colection[i][propiedadTD2] + "</td>"
        tr+="<td>" + colection[i][propiedadTD3] + "%</td></tr>"
    }
    document.getElementById(idBodyTable).innerHTML += tr;*/
}

function buildAllTables()
{

    if(document.title.includes("Attendance")){
        generateTable("most-engaged", statistics.moreVotesMembers);
        generateTable("least-engaged", statistics.lessVotesMembers);
    }
    else if(document.title.includes("Party-Loyalty")){
        generateTable("least-Loyal", statistics.leastloyaleMembers);
        generateTable("most-loyal", statistics.mostloyaleMembers);
    }

    /*if(document.title.includes("Attendance")){
        generateTable("most-engaged", statistics.moreVotesMembers, "missed_votes", "missed_votes_pct");
        generateTable("least-engaged", statistics.lessVotesMembers, "missed_votes", "missed_votes_pct");
    }
    else if(document.title.includes("Party-Loyalty")){
        generateTable("least-Loyal", statistics.leastloyaleMembers, "total_votes", "votes_with_party_pct" );
        generateTable("most-loyal", statistics.mostloyaleMembers, "total_votes", "votes_with_party_pct" );
    }*/
    
}

//more simple : if(document.title == "Attendance") == if(document.getElementsByTagName("title")[0].innerHTML == "Attendance")



function mostEngaged (){
    
    membersSenate.sort(function(pre, next) {
        return pre.missed_votes_pct - next.missed_votes_pct;
    });
 
    var prcMissedVotes = Math.round(membersSenate.length * 10 / 100);
    var moreVotesMembers= membersSenate.slice(0 , prcMissedVotes)
    
    Table.statistics.moreVotesMembers = moreVotesMembers;

}

function mostloyale(){

    membersSenate.sort(function(pre, next){
        return next.votes_with_party_pct - pre.votes_with_party_pct;
    });

    var prcVotesWithParty = Math.round(membersSenate.length * 10 / 100);
    var mosltloyalgroup =  membersSenate.slice(0 , prcVotesWithParty)

    Table.statistics.mostloyaleMembers = mosltloyalgroup
    
}

function leastloyale(){

    membersSenate.sort(function(pre, next){
        return pre.votes_with_party_pct - next.votes_with_party_pct;
    });

    var prcVotesWithParty = Math.round(membersSenate.length * 10 / 100);
    var leasltloyalgroup =  membersSenate.slice(0 , prcVotesWithParty)

    Table.statistics.leastloyaleMembers = leasltloyalgroup
    
}
