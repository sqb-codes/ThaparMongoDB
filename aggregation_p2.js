// Working with arrays

// Query-1 : Get class wise all subjects
db.students.aggregate([
    {
        $group : {
            _id : {
                class : "$class"
            },
            allSubjects : {
                $push : "$subjects"
            }
        }
    }
]);

// Use $unwind to deconstruct array and get only unique subjects
db.students.aggregate([
    {
        $unwind : "$subjects"
    },
    {
        $group : {
            _id : {
                class : "$class"
            },
            allSubjects : {
                $addToSet : "$subjects"
            }
        }
    }
]);


// Query-2 : Marks of each student for One subject only - $slice
db.students.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            subject : {
                $slice : ["$subjects", 1]
            },
            marks : {
                $slice : ["$marks", 1]
            }
        }
    }
]);


// Query-3 : Marks of each student for a particular index
db.students.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            subject : {
                $slice : ["$subjects", 1, 1] // start with 1st index and pick 1 subject
            },
            marks : {
                $slice : ["$marks", 1, 1]
            }
        }
    }
]);


// Query-4 : Marks of each student for last subject -> slice with -ve value
db.students.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            subject : {
                $slice : ["$subjects", -1]
            },
            marks : {
                $slice : ["$marks", -1]
            }
        }
    }
]);

// Query-5 : Marks of each student for last two subjects -> slice with -ve value
db.students.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            subject : {
                $slice : ["$subjects", -2, 2]
            },
            marks : {
                $slice : ["$marks", -2, 2]
            }
        }
    }
]);


// Query-6 : Filter particular records based on some condition
// Filter all theory marks greater than 85

db.students.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            examScore : {
                $filter : {
                    input : "$marks",
                    as : "score",
                    cond : {
                        $gt : ["$$score.theory", 85]
                    }
                }
            }
        }
    }
]);


// Multiple Stages with Array
db.students.aggregate([
    {
        $unwind : "$marks"
    },
    {
        $project : {
            _id : 0,
            name : 1,
            rollno : 1,
            score : "$marks.theory"
        }
    },
    {
        $sort : {score : -1}
    },
    {
        $group : {
            _id : "$_id", name : {$first : "$name"}, maxScore : {$max : "$score"}
        }
    },
    {
        $sort : {maxScore : -1}
    }
]);

// Query-7 : Categories data in groups based on some boundaries

db.persons.aggregate([
    {
        $bucket : {
            groupBy : "$dob.age",
            boundaries : [20,40,60,80],
            output : {
                numberOfPersons : {
                    $sum : 1
                },
                avgAge : {
                    $avg : "$dob.age"
                }
            }
        }
    }
]);


// $bucketAuto - Auto calculate boundaries
db.persons.aggregate([
    {
        $bucketAuto : {
            groupBy : "$dob.age",
            buckets : 3,
            output : {
                numberOfPersons : {
                    $sum : 1
                },
                avgAge : {
                    $avg : "$dob.age"
                }
            }
        }
    }
]);








