# Node JS Learning

**Learn With Sumit**

### Express

**_Introduction_**

#### Mongodb Database

- [x] mongodb commands

1.  For show local database
    > show dbs
2.  create and use database
    > use DATABASE_NAME
3.  when database use yet
    > db
4.  Data insert for uses database

- > db.COLLECTION_NAME.insertOne({name:"expName"})
- > db.COLLECTION_NAME.insertMany([{},{},{}])

5.  Show all data of database

- > db.COLLECTION_NAME.find()
- > db.COLLECTION_NAME.find({propertyName: value})
- > db.COLLECTION_NAME.find({propertyName: value},{hideProperty: 0})
- > db.COLLECTION_NAME.find({propertyName: value}).limit(1)
- > db.COLLECTION_NAME.find({propertyName: value}).limit(1).skip(1)
- > db.COLLECTION_NAME.findOne({propertyName: value})

6.  Update from database collection obj

- > db.COLLECTION_NAME.updateOne({propertyName:value},{$set:{updatePropertyName: updatedValue}})
- > db.COLLECTION_NAME.updateMany({propertyName:value},{$set:{updatePropertyName: updatedValue}})

7.  Delete data

- > db.COLLECTION_NAME.deleteOne({propertyName:value})
- > db.COLLECTION_NAME.deleteMany({propertyName:value})
