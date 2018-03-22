function multiFilter(array, filters) {
    const filterKeys = Object.keys(filters);
    //un tableau des propriétés propres à un objet
    console.log(filters);
    console.log("filter key"+Object.keys(filters));
    console.log("filter key indexof"+Object.keys(filters));
    // filters all elements passing the criteria
    return array.filter((item) => {
      // dynamically validate all filter criteria
   
      console.log(filterKeys.every(key => filters[key].indexOf(item[key])))
      return filterKeys.every(key => !!~filters[key].indexOf(item[key])
     
        );
    });
}

/*let products = [
    { name: "A", color: "Blue", size: 50 },
    { name: "B", color: "Blue", size: 60 },
    { name: "C", color: "Black", size: 70 },
    { name: "D", color: "Green", size: 50 },
  ];
  console.log(products);
  // the value of each key is an array with the values to filter
  let filters = {
    color: ["Blue", "Black"],
    size: [70, 50]
  };*/

  let products = mydata.map(function (value) {
    return {
  
        'price_range': value.price_range,
        'color': value.color,
        'region': value.region
    }
});
  console.log(products);
    
    // the value of each key is an array with the values to filter
    let filters = {
      "region":["Alsace", "Beaujolais", "Bordeaux", "Bourgone"]
    };
  
  // filter the products array by color: blue and black
  // and also by size: 70 and 50
  var filtered = multiFilter(products, filters);
  
  console.info('Filtered:');
  console.log(filtered);