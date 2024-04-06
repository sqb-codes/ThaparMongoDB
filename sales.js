db.sales.insertMany([
    {
        target : 200,
        sale : 150
    },
    {
        target : 100,
        sale : 80
    },
    {
        target : 200,
        sale : 250
    },
    {
        target : 150,
        sale : 70
    }
]);

// Q. Return where sale is greater than target
db.sales.find({
    $expr : {
        $gt : ["$sale", "$target"]
    }
});
