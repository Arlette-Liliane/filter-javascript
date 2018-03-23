var

    dataJson,
    seenNames = {},
    selected = {},
    dataRegion = [],
    dataCategorie = [],
    dataColor = [],

//dataJson = loadJsonFile();

    dataJson = mydata;

document.getElementsByClassName('nb-article')[0].innerHTML = dataJson.length;

var region = dataJson.map(function (value) {
    return {'region': value.region}
}).filter(function (currentObject) {
    if (currentObject.region in seenNames) {
        return false;
    } else {
        seenNames[currentObject.region] = true;
        return true;
    }
}).sort(function (a, b) {
    if (a.region < b.region) return -1;
    else if (a.region == b.region) return 0;
    else return 1
});

loadRegion(region)

function loadJsonFile() {
    var request = new XMLHttpRequest();
    request.open("GET", "src/assets/json/fdv2017.json", false);
    request.send(null)
    return JSON.parse(request.responseText);

}

var robe_vin = dataJson.map(function (value) {
    return {'color': value.color}
}).filter(function (currentObject) {
    if (currentObject.color in seenNames) {
        return false;
    } else {
        seenNames[currentObject.color] = true;
        return true;
    }
});

loadRobeVin(robe_vin);


var categorie = dataJson.map(function (value) {
    return {'price_range': value.price_range}
}).filter(function (currentObject) {

    if (currentObject.price_range in seenNames) {
        return false;
    } else {
        seenNames[currentObject.price_range] = true;
        return true;
    }
})

loadCategorie(categorie);

var cardInfo = dataJson.map(function (value) {
    return {
        'domain': value.domain,
        'appelation': value.appellation,
        'millesime': value.millesime,
        'price_vp_bundle': value.price_vp_bundle,
        'price_range': value.price_range,
        'color': value.color,
        'region': value.region
    }
})


var countChecked = function () {
    var n = $("input:checked").length;

    if (parseInt(n) > 0) {

        //if the value is unchecked delete value in array selected
        if ($("input[data-value*=" + $(this).attr('data-value') + "]").prop("checked") === false) {
            initArray();
            $('input:checked').each(function () {
                console.log("value checked" + $('input:checked').attr('name'))
                selected = CreateFilterWithCheckboxValue($(this));
            });
        }
        else
            selected = CreateFilterWithCheckboxValue($(this));
        console.log(selected)
        //filter with value checked
        cardInfoFiltre = multiFilter(cardInfo, selected)
        loadCard(cardInfoFiltre);
        console.log(cardInfoFiltre.map(function (value) {
            return {
                'price_range': value.price_range,
                'color': value.color,
                'region': value.region
            }
        }));
        //update value for article number filter
        document.getElementsByClassName('nb-article-filtre')[0].innerHTML = cardInfoFiltre.length;

    }
    else {
        initArray();
        loadCard(cardInfo);
        document.getElementsByClassName('nb-article-filtre')[0].innerHTML = cardInfo.length;
    }
};

$("input[type=checkbox]").on("click", countChecked);
loadCard(cardInfo);

function initArray() {
    selected = [];
    dataRegion = [];
    dataCategorie = [];
    dataColor = [];
}

function multiFilter(array, filters) {
    //un tableau des propriétés propres à un objet
    const filterKeys = Object.keys(filters);
    // filters all elements passing the criteria
    return array.filter((item) => {
        // dynamically validate all filter criteria
        return filterKeys.every(key => !!~filters[key].indexOf(item[key]))
    })
}

function deleteEmptyArray(value) {
    if (selected.region.length == 0)
        delete selected['region'];
    if (selected.price_range.length == 0)
        delete selected['price_range'];
    if (selected.color.length == 0)
        delete selected['color'];
}

function CreateFilterWithCheckboxValue(self) {
    if (self.attr('name') == "region") {
        dataRegion.push(self.attr('data-value'));
    }
    if (self.attr('name') == "categorie") {
        dataCategorie.push(self.attr('data-value'));
    }
    if (self.attr('name') == "color") {
        dataColor.push(self.attr('data-value'));
    }

    selected = {
        "region": dataRegion,
        "price_range": dataCategorie,
        "color": dataColor
    };

    deleteEmptyArray(selected);

    return selected;
}

function loadRegion(value) {

    var selectHtml = document.getElementById('region-filters');
    var valueHtml = '';
    for (var i = 0; i < 4; i++) {
        valueHtml += ' <li class="filter">' +
            '<label>';
        valueHtml += '<input type="checkbox" class="myf" name="region" data-value="' + value[i].region + '" />' +
            value[i].region
        valueHtml += '   </label></li>';
    }

    selectHtml.innerHTML = valueHtml;
}

function loadRobeVin(value) {

    var selectHtml = document.getElementById('robe-filters');
    var valueHtml = '';
    for (var i = 0; i < value.length; i++) {
        valueHtml += ' <li class="filter">' +
            '<label>';
        valueHtml += '<input type="checkbox" class="myf" name="color" data-value="' + value[i].color + '" />' +
            value[i].color
        valueHtml += '   </label></li>';
    }
    selectHtml.innerHTML = valueHtml;
}

function loadCategorie(value) {

    var selectHtml = document.getElementById('categorie-filters');
    var valueHtml = '';
    for (var i = 0; i < value.length; i++) {
        valueHtml += ' <li class="filter">' +
            '<label>';
        valueHtml += '<input type="checkbox" class="myf" name="categorie" data-value="' + value[i].price_range + '" />' +
            value[i].price_range;
        valueHtml += '   </label></li>'
    }

    selectHtml.innerHTML = valueHtml;
}

function loadCard(value) {
    var cardHtml = document.getElementsByClassName('wine-block')[0]
    var valueHtml = '<div class="cards-block"><div class="row card-deck grid-items">';
    var j = 1;
    for (var i = 0; i < value.length; i++) {

        valueHtml += '<div class="card">' +
            '                    <div class="card-header">' +
            '                        <div class="row">' +
            '                            <div class="col-md-8">' +
            '                                <div class="card-text domaine">' + value[i].domain + '</div>' +
            '                                <div class="card-text cotes">' + value[i].appelation + '</div>' +
            '                                <div class="card-text annee">' + value[i].millesime + '</div>' +
            '                            </div>' +
            '                            <div class="col-md-4 price">' +
            '                                ' + value[i].price_vp_bundle + '€' +
            '                            </div>' +
            '                        </div>' +
            '' +
            '                    </div>' +
            '                    <div class="card-body">' +
            '                        <img class="card-img-top" src="dist/assets/img/720x350.png" alt="Card image cap">' +
            '                    </div>' +
            '                </div>';

        if (j == 3) {
            valueHtml += '</div></div>';
            valueHtml += '<div class="cards-block"><div class="row card-deck">';
            j = 0;
        }
        j++

    }
    cardHtml.innerHTML = valueHtml;
}