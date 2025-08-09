const products = [
    { name: "Headphones", ratings: [4, 5, 4] },
    { name: "Phone Case", ratings: [3, 3.5, 4] },
    { name: "Smartwatch", ratings: [5, 4.5, 4.75] },
];


function calc_average(ratings) {
    let sum = ratings.reduce((acc, num) => acc + num, 0);
    return sum / ratings.length;
}



products.forEach(p => {
    p.average = calc_average(p.ratings);
    p.popular = p.average >= 4.0;
});



products.sort((a, b) => b.average - a.average);



products.forEach(product => {
    console.log(product.name + ": Average = " + product.average.toFixed(2)+ ", Popular = " + product.popular);
});



let popular_products = products
    .filter(p => p.popular)
    .map(p => p.name);



console.log("Popular Products:", popular_products);
