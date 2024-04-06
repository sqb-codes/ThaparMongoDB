db.createCollection("movies", {
    validator : {
        $jsonSchema : {
            bsonType : "object",
            required : ["title", "desc", "genre", "rating"],
            properties : {
                title : {
                    bsonType : "string",
                    description : "movie title must be a string"
                },
                desc : {
                    bsonType : "string",
                    description : "movie description must be a string"
                },
                genre : {
                    bsonType : "array",
                    description : "must be an array",
                    items : {
                        bsonType : "string",
                        description : "must be a string"
                    }
                },
                rating : {
                    bsonType : "int",
                    minimum : 1,
                    maximum : 10,
                    description : "must be a number b/w 1 to 10"
                },
                reviews : {
                    bsonType : "array",
                    description : "must be an array",
                    items : {
                        bsonType : "object",
                        properties : {
                            user : {
                                bsonType : "objectId",
                                description : "Must be an object refers to user"
                            }
                        }
                    }
                }
            }
        }
    }
})