const express = require('express');

const app = express();


app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  next();
});

app.get('/get_list', (req, res, next) => {
  res.send({
    code: 0,
    data: {
      banners: [{
        id: 1,
        name: 'banners-1'
      },
      {
        id: 2,
        name: 'banners-2'
      },
      {
        id: 3,
        name: ' banners-3'
      }],
      comments: [
        {
          id: 1,
          name: 'comments-1'
        },
        {
          id: 2,
          name: ' comments-2'
        },
        {
          id: 3,
          name: ' comments-3'
        }
      ]
    },

  })
});


app.listen(3000, () => {
  console.log('listen 3000 port...');
})