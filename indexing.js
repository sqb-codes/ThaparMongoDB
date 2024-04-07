// Get query execution plan
db.persons.find({gender : "male"}).explain();

db.persons.find({gender : "male"}).explain("executionStats");

// Check if indexing is already applied
db.persons.getIndexes();

// 1. Create Index
db.persons.createIndex({gender : 1});

// 2. Drop a particular index
db.persons.dropIndex('gender_1');

// 3. Drop all indexes
db.persons.dropIndexes();

// 4. Compound Index
db.persons.createIndex({gender : 1, "location.state" : 1});

// 5. Unique Index
db.persons.createIndex({email : 1}, {unique : true});
// After executing this query you won't be able to store duplicate email IDs


