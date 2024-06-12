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






// Q. If sales are greater than 150, subtract sales by 20 else return sales as it is
db.sales.find({
    $expr : {
        $gt : [
            {$cond : {
                if: {
                    $gt: ["$sale", 150]
                },
                then: {
                    $subtract: ["$sale", 20]
                },
                else: "$sale"
            }}, "$target"
        ]
    }
});



