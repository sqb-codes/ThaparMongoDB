db.persons.aggregate([
    {
        $match : {
            gender : "male"
        }
    }
]);

db.persons.aggregate([
    {
        $match : {
            gender : "male"
        }
    },
    {
        $project : {
            name : 1,
            gender : 1
        }
    }
]);

// find count of male and female
db.persons.aggregate([
    {
        $group : {
            _id : {gender : "$gender"},
            count : {$sum : 1}
        }
    }
]);

// Get the male count from each state
db.persons.aggregate([
    {
        $match : {
            gender : "male"
        }
    },
    {
        $group : {
            _id : {state : "$location.state"},
            total : {$sum : 1}
        }
    }
]);

// Get the male count from each state in sorted manner
db.persons.aggregate([
    {
        $match : {
            gender : "male"
        }
    },
    {
        $group : {
            _id : {state : "$location.state"},
            total : {$sum : 1}
        }
    },
    {
        $sort : {
            total : -1
        }
    }
]);


// Project with concatination
db.persons.aggregate([
    {
        $match : {
            gender : "male"
        }
    },
    {
        $project : {
            _id : 0,
            gender : 1,
            fullName : {
                $concat : ["$name.title", " ", "$name.first", " ", "$name.last"]
            }
        }
    }
]);