
// $eq - equal operator
db.students.find({course: {$eq : "BCA"}});

// $ne - not equal operator
db.students.find({course: {$ne : "BCA"}});

// $gt - greater than
db.students.find({batch: {$gt : 2020}});

// $lt - greater than
db.students.find({batch: {$lt : 2020}});

// $gte - greater than equals to 
db.students.find({batch: {$gte : 2020}});

// $lte - greater than equals to
db.students.find({batch: {$lte : 2020}});

// $or
db.students.find({$or : [{year:2020}, {course:"BCA"}]});
db.students.find({$or : [{course:"Btech"}, {course:"BCA"}]});

// $in
db.students.find({course : {$in : ["Btech", "BCA"]}});

// $nin
db.students.find({course : {$nin : ["Btech", "BCA"]}});

// $and
db.students.find({$and : [{year:2020}, {course:"BCA"}]});

// $not
db.students.find({course : {$not : "Btech"}});

// $nor = Not + Or
db.students.find({$nor : [{year:2020}, {course:"BCA"}]});


// $exists
db.students.find({batch : {$exists : true}});

// $exists + $gt
db.students.find({batch : {$exists : true, $gt : 2022}});

// $type
db.students.find({batch : {$type : "number"}});

