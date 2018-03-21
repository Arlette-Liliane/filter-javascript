var nbArticle ;
var nbrArticleFiltre;
var dataJson;
var seenNames = {};
var selected = [];
var data = [];

dataJson = loadJsonFile();

document.getElementsByClassName('nb-article')[0].innerHTML = dataJson.length;

var region = dataJson.map(function (value) {
    return {'region':value.region}
}).filter(function(currentObject) {
    if (currentObject.region in seenNames) {
        return false;
    } else {
        seenNames[currentObject.region] = true;
        return true;
    }
});
loadRegion(region)

function  loadJsonFile(){
    var request = new XMLHttpRequest();
   request.open("GET", "src/assets/json/fdv2017.json", false);
   request.send(null)
   return JSON.parse(request.responseText);

}

var robe_vin = dataJson.map(function (value) {
    return {'color':value.color}
}).filter(function(currentObject) {
    if (currentObject.color in seenNames) {
        return false;
    } else {
        seenNames[currentObject.color] = true;
        return true;
    }
});

loadRobeVin(robe_vin);


var categorie = dataJson.map(function (value) {
    return {'price_range':value.price_range}
}).filter(function(currentObject) {
    
    if (currentObject.price_range in seenNames) {
        return false;
    } else {
        seenNames[currentObject.price_range] = true;
        return true;
    }
});

loadCategorie(categorie);


var cardInfo = dataJson.map(function (value) {
    return {'domain':value.domain,
    'appelation':value.appellation, 
    'millesime': value.millesime, 
    'price_vp_bundle':value.price_vp_bundle,
    'categorie':value.price_range,
    'color':value.color,
    'region':value.region}
})


var countChecked = function() {
    var n = $( "input:checked" ).length;
    
  if (parseInt(n) > 0){
   
            selected[$(this).attr('name')] = $(this).attr('data-value');

    data.push(selected)
    if ($( "input[name*="+$(this).attr('name')+"]" ).prop( "checked" ) === false){
        for (var i = 0; i < data.length; i++) {
        
               if (data[i].categorie === $(this).attr('data-value') || data[i].region === $(this).attr('data-value')
            || data[i].color === $(this).attr('data-value')){
                   delete data[i];
               }
                        
        }
        
    }
        
    cardInfoFiltre = cardInfo.filter(function(currentObject) {
        let flag =  false;
         if (data) {
            var categorieFilter = false;
            var colorFilter = false;
            var regionFilter = false;
             data.forEach(function(element) {
                categorieFilter = element.categorie ? currentObject.categorie === element.categorie : true;
                colorFilter = element.color ? currentObject.color === element.color : true;
                regionFilter = element.region ? currentObject.region === element.region : true;
                flag = categorieFilter && colorFilter && regionFilter;
              });  
         }
         else
            flag = true;
    selected = [];
           
    return flag;
    
    });

    loadCard(cardInfoFiltre);
    document.getElementsByClassName('nb-article-filtre')[0].innerHTML = cardInfoFiltre.length;

  }
  else{
    loadCard(cardInfo);
    document.getElementsByClassName('nb-article-filtre')[0].innerHTML = 0;

  }

  };

  $( "input[type=checkbox]" ).on( "click", countChecked );


loadCard(cardInfo);




function loadRegion(value){

    var selectHtml = document.getElementById('region-filters');
    var valueHtml = '';
    for (var i = 0; i < value.length; i++) {
        valueHtml += ' <li class="filter">'+
                            '<label>';
        valueHtml += '<input type="checkbox" class="myf" name="region" data-value="'+value[i].region+'" />'+
                            value[i].region
        valueHtml += '   </label></li>';
    }


    selectHtml.innerHTML =  valueHtml;

}

function loadRobeVin(value){
    
        var selectHtml = document.getElementById('robe-filters');
        var valueHtml = '';
        for (var i = 0; i < value.length; i++) {
            valueHtml += ' <li class="filter">'+
            '<label>';
            valueHtml += '<input type="checkbox" class="myf" name="color" data-value="'+value[i].color+'" />'+
                                value[i].color
            valueHtml += '   </label></li>';
        }
      
    
        selectHtml.innerHTML =  valueHtml;
    
}

function loadCategorie(value){
    
        var selectHtml = document.getElementById('categorie-filters');
        var valueHtml = '';
        for (var i = 0; i < value.length; i++) {
            valueHtml += ' <li class="filter">'+
                                '<label>';
            valueHtml += '<input type="checkbox" class="myf" name="categorie" data-value="'+value[i].price_range+'" />'+
                                value[i].price_range;
            valueHtml += '   </label></li>'
        }
     
    
        selectHtml.innerHTML =  valueHtml;
}

function loadCard(value){
    
        var cardHtml = document.getElementsByClassName('wine-block')[0]
        var valueHtml = '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 grid"><div class="row card-deck grid-items">';
        var j = 1;
        for (var i = 0; i < value.length; i++) {
           
            valueHtml += '<div class="card grid-item grid-item--'+value[i].color+' grid-item--'+value[i].price_range+' grid-item--'+value[i].region+'">' +
                '                    <div class="card-header">' +
                '                        <div class="row">' +
                '                            <div class="col-md-8">' +
                '                                <div class="card-text domaine">'+value[i].domain+'</div>' +
                '                                <div class="card-text cotes">'+value[i].appelation+'</div>' +
                '                                <div class="card-text annee">'+value[i].millesime+'</div>' +
                '                            </div>' +
                '                            <div class="col-md-4 price">' +
                '                                '+value[i].price_vp_bundle +'e '+
                '                            </div>' +
                '                        </div>' +
                '' +
                '                    </div>' +
                '                    <div class="card-body">' +
                '                        <img class="card-img-top" src="http://placehold.it/720x350" alt="Card image cap">' +
                '                    </div>' +
                '                </div>';
    
                if (j == 3)
                {
                    valueHtml += '</div></div>';
                     valueHtml += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div class="row card-deck">';
                    j = 0;
                }
                j++
          
        }
        cardHtml.innerHTML = valueHtml;
    }












  



