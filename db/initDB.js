db.productsDB.drop();

db = db.getSiblingDB('productsDB');

db.createCollection('productsDB', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'updated_at', 'prices', 'rate'],
            properties: {
                name: { bsonType: 'string' },
                updated_at: { bsonType: 'date' },
                prices: { bsonType: 'array' },
                rate: { bsonType: 'double' },
                category: {
                    enum: ['product', 'equipment'],
                },
            },
        },
    },
});