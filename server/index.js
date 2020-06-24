const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;

const Sites = require('../database/Site.js');

app.use(bodyParser.json());
app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));

app.get('/site/:id', function(req, res) {
  console.log('site id: ', req.params);

  var siteID = req.params.id;
  var query = Sites.where({id: siteID});
  query.findOne(function(err, site) {
    if (err) {
      return err;
    }
    if (site) {
      console.log('site host:', site.host.name);
      res.send(site);
    } else {
      res.send('Not found');
    }
  });

});


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}/:id`);
});