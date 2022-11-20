const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const express = require('express');
const search = require('./controllers/search')

let agg = [
    {
      $search: {
        index: 'search_blog',
        text: {
          query: search,
          path: {
            'wildcard': '*'
          }
        }
      }
    }
  ]



  MongoClient.connect(
    "mongodb+srv://musiclover:bobdylaN%2196@mymusic.wef1hdo.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    async function (connectErr, client) {
      assert.equal(null, connectErr);
      const coll = client.db("test").collection("posts");
      let cursor = await coll.aggregate(agg);
      await cursor.forEach((doc) => console.log(doc));
      client.close();
    }
  );


  