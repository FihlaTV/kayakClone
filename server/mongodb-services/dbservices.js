
var MLab = require('mlab-data-api');
var mLab=MLab({
  key: '2zFxu-V-PYhi0OpXK9tc7fbQ77SGIxbt',
  host:'https://api.mlab.com', //optional
  uri : '/api',//optional
  version :'1',//optional
  database:'kayak', //optional
  timeout : 10000 //optional
})

var options = {
    database: 'kayak', //optional
    collection: 'flightsData',
    query: { }
  };






  mLab.listDocuments(options)
    .then(function (response) {
      console.log('got',response.data)
    })
    .catch(function (error) {
      console.log('error', error)
    });