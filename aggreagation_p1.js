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


// Project with embedded values + concatination
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


// String in Upper Case
db.persons.aggregate([
    {
        $project : {
            _id : 0,
            gender : 1,
            fullName : {
                $concat : [
                    {$toUpper : "$name.title"} ,".",
                    {$toUpper : "$name.first"}, " ",
                    {$toUpper : "$name.last"}
                ]
            }
        }
    }
]);


// find length of string
db.persons.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            length : {$strLenCP : "$name.first"}
        }
    }
]);


// Title case instead of Upper case
db.persons.aggregate([
    {
        $project : {
            _id : 0,
            gender : 1,
            fullName : {
                $concat : [
                    {
                        $toUpper : {$substrCP : ["$name.title", 0, 1]}  // M
                    },
                    {
                        $substrCP : ["$name.title", 1, {$subtract : [{$strLenCP : "$name.title"}, 1]}]
                    },
                    ".",
                    {
                        $toUpper : {$substrCP : ["$name.first", 0, 1]}
                    },
                    {
                        $substrCP : ["$name.first", 1, {$subtract : [{$strLenCP : "$name.first"}, 1]}]
                    },
                    " ",
                    {
                        $toUpper : {$substrCP : ["$name.last", 0, 1]}
                    },
                    {
                        $substrCP : ["$name.last" , 1, {$subtract : [{$strLenCP : "$name.last"}, 1]}]
                    }
                ]
            }
        }
    }
]);


// Multiple Projections
db.persons.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            email : 1,
            location : {
                coordinates : [
                    "$location.coordinates.latitude",
                    "$location.coordinates.longitude",
                ]
            }
        }
    },
    {
        $project : {
            gender : 1,
            email : 1,
            location : 1,
            fullName : {
                $concat : [
                    {
                        $toUpper : {$substrCP : ["$name.title", 0, 1]}  // M
                    },
                    {
                        $substrCP : ["$name.title", 1, {$subtract : [{$strLenCP : "$name.title"}, 1]}]
                    },
                    ".",
                    {
                        $toUpper : {$substrCP : ["$name.first", 0, 1]}
                    },
                    {
                        $substrCP : ["$name.first", 1, {$subtract : [{$strLenCP : "$name.first"}, 1]}]
                    },
                    " ",
                    {
                        $toUpper : {$substrCP : ["$name.last", 0, 1]}
                    },
                    {
                        $substrCP : ["$name.last" , 1, {$subtract : [{$strLenCP : "$name.last"}, 1]}]
                    }
                ]
            }
        }
    }
]);


// Type casting - $convert
db.persons.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            email : 1,
            location : {
                coordinates : [
                    {
                        $convert : {
                            input : "$location.coordinates.latitude",
                            to : "double",
                            onError : 0.0,
                            onNull : 0.0
                        }
                    },
                    {
                        $convert : {
                            input : "$location.coordinates.longitude",
                            to : "double",
                            onError : 0.0,
                            onNull : 0.0
                        }
                    }
                ]
            }
        }
    },

    {
        $project : {
            gender : 1,
            email : 1,
            location : 1,
            fullName : {
                $concat : [
                    {
                        $toUpper : {$substrCP : ["$name.title", 0, 1]}  // M
                    },
                    {
                        $substrCP : ["$name.title", 1, {$subtract : [{$strLenCP : "$name.title"}, 1]}]
                    },
                    ".",
                    {
                        $toUpper : {$substrCP : ["$name.first", 0, 1]}
                    },
                    {
                        $substrCP : ["$name.first", 1, {$subtract : [{$strLenCP : "$name.first"}, 1]}]
                    },
                    " ",
                    {
                        $toUpper : {$substrCP : ["$name.last", 0, 1]}
                    },
                    {
                        $substrCP : ["$name.last" , 1, {$subtract : [{$strLenCP : "$name.last"}, 1]}]
                    }
                ]
            }
        }
    }
]);

// Convert string to date
db.persons.aggregate([
    {
        $project : {
            formattedDOB : {
                "$toDate" : "$dob.date"
            },
            age : "$dob.age"
        }
    },
    {
        $project : {
            _id : 0,
            birthDate : {
                $dateToString : {
                    // format : "%Y-%m-%d",
                    // format : "%d-%m-%Y",
                    // format : "%d %b, %Y", // %b - month short name
                    format : "%d %B, %y", // %B - month full name
                    date : "$formattedDOB"
                }
            },
            age : 1
        }
    }
]);