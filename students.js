[
    {
        "name" : "Max",
        "year" : 4,
        "phone" : 7899844444,
        "course" : "BCA",
        "batch" : 2022,
    },
    {
        "name" : "Nick",
        "year" : 2,
        "phone" : 7899844004,
        "course" : "BCA",
        "batch" : 2022,
    },
    {
        "name" : "Adam",
        "year" : 1,
        "phone" : 7800844444,
        "course" : "Btech",
        "batch" : 2019,
    },
    {
        "name" : "Naman",
        "year" : 2,
        "phone" : 7897777444,
        "course" : "Btech",
        "batch" : 2020,
    },
]


[
    {
        "name" : "John",
        "email": "john@gmail.com",
        "details" : {
            "state" : "Punjab",
            "city" : "Patiala"
        },
        "subjects" : ["C++","OS","Networking","DBMS","Maths"],
        "marks" : [78,66,89,54,78]
    },
    {
        "name" : "Max",
        "email": "max@gmail.com",
        "details" : {
            "state" : "Punjab",
            "city" : "Patiala"
        },
        "subjects" : ["C++","OS","Networking","DBMS","Maths"],
        "marks" : [58,67,78,65,70]
    },
    {
        "name" : "Naman",
        "email": "naman12@gmail.com",
        "details" : {
            "state" : "UP",
            "city" : "Noida"
        },
        "subjects" : ["C++","OS","Maths","Mongo","Python"],
        "marks" : [78,66,45,78,98]
    }
]


// Using for each
db.students.find().forEach((document) => {printjson(document)});

// Cursor
var data = db.students.find();
while(data.hasNext()) {printjson(data.next())};

// Sorting documents
db.students.find().sort({year:-1});

// limit
db.students.find().limit(2);

// skip
db.students.find().skip(2);

// Pagination
db.students.find().limit(2).skip(2);
db.students.find().skip(2).limit(2);









// $set
db.students.updateOne({name:"John"}, {$set : {name:"Max"}});

// $inc
// ==============================

// RegEx - Regular Expressions
// Q. Get students data whose name starts with 'M'
db.students.find({name : {$regex : "^M"}});

// Ignore case
db.students.find({name : {$regex : "^m", $options : "i"}});

// Q. Get students data whose name ends with 'm'
db.students.find({name : {$regex : "m$", $options : "i"}});


// Q. Get students data whose name contains with 'm'
db.students.find({name : {$regex : /m/, $options : "i"}});


