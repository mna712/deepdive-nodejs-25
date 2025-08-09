async function fetch_products() {
    try {
        const response = await fetch('data.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }


        const data = await response.json();
        const products = data.products;


        console.log("All Product Names:");
        products.forEach(p => console.log(p.name));


        const total_price = products.reduce((sum, p) => sum + p.price, 0);
        console.log("\nTotal price of all products:", total_price);


        const most_expensive = products.reduce((max, p) => p.price > max.price ? p : max);
        console.log("\nMost expensive product:", `${most_expensive.name} `);


        console.log("\nProducts in stock:");
        products.filter(p => p.inStock).forEach(p => console.log(p.name));


        const categories = products.map(p => p.category);
        console.log("\nAll Categories:", categories);


        const unique_categories = [...new Set(categories)];
        console.log("Unique Categories:", unique_categories);

    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
}

fetch_products();

