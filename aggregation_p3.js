db.customers.aggregate([
    {
        $lookup : {
            from : "cart",
            localField : "c_id",
            foreignField : "c_id",
            as : "output"
        }
    }
]);


db.customers.aggregate([
    {
        $lookup : {
            from : "cart",
            localField : "c_id",
            foreignField : "c_id",
            as : "output"
        }
    },
    {
        $project : {
            _id : 0,
            name : 1,
            email : "$details.email",
            itemsInCart : "$output"
        }
    }
]);