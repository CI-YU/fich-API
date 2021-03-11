var express = require('express');
var router = express.Router();
// const db = require('../config/database');
const user = require('../models/users.js');
// const taiex = require('../models/taiex.js');
const dailyPrice = require('../models/tDailyPrice.js');
const tsecurity = require('../models/tsecurity.js');
const tkSecurtity_DailyPrice = require('../models/tkSecurtity_DailyPrice.js');
// const fs = require('fs');
// const csv = require('csv-parser');
// const path = 'path';
const axios = require('axios');
router.get('/', (req, res) =>
  user
    .findAll()
    .then((user) => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch((err) => console.log('error:', err))
);

//test add data in mariadb
router.post('/add', (req, res) => {
  user
    .create({
      mail: 'billhuang@airiti.com',
      name: 'bill-huang',
      status: 'A',
    })
    .then((user) => {
      console.log(user);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

//test add csv data in mariadb
// router.get('/stock', (req, res) => {
//   const results = [];
//   fs.createReadStream(path)
//     .pipe(csv())
//     .on('data', (row) => {
//       results.push({
//         date: row.Date,
//         open: row.Open !== 'null' ? row.Open : null,
//         high: row.High !== 'null' ? row.High : null,
//         low: row.Low !== 'null' ? row.Low : null,
//         close: row.Close !== 'null' ? row.Close : null,
//         'adj Close': row['Adj Close'] !== 'null' ? row['Adj Close'] : null,
//         volume: row.Volume !== 'null' ? row.Volume : null,
//       });
//     })
//     .on('end', () => {
//       taiex
//         .bulkCreate(results)
//         .then(() => {
//           res.status(200).send('Success');
//         })
//         .catch((err) => {
//           res.status(500).send(err.message);
//         });
//     });
// });

const twseAPI =
  // 'https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&type=0099P&date=';
  'https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&stockNo=';
router.get('/stock/cement', (req, res) => {
  const cementAPI = `${twseAPI}${req.query.stockNo}&date=${req.query.date}`;
  axios.get(cementAPI).then((response) => {
    let results = [];

    //塞入資料庫
    search(req.query.stockNo).then((result) => {
      console.log('result:', result);
      //整理api資料到results
      response.data.data.forEach((element) => {
        results.push({
          DailyPrice_PriceDate: req.query.date,
          DailyPrice_TradeVolume: element[2],
          DailyPrice_Transaction: element[3],
          DailyPrice_TradeValue: element[4],
          DailyPrice_Open: element[5],
          DailyPrice_High: element[6],
          DailyPrice_Low: element[7],
          DailyPrice_Close: element[8],
          DailyPrice_Change: element[10],
          DailyPrice_PriceEarningRatio: element[15],
        });
      });
      bulkInsert(results).then((res) => {
        results = [];
        res.forEach((el) => {
          results.push({
            Security_ID: result.dataValues.Security_ID,
            DailyPrice_ID: el,
          });
        });
        console.log(results);
        InsertSecurtity_DailyPrice(results);
      });
    });
    res.status(response.status).send(results);
  });
});

async function bulkInsert(data) {
  try {
    const arrResult = [];
    const dailyPrices = await dailyPrice.bulkCreate(data);
    dailyPrices.map((daily) => arrResult.push(daily.toJSON().DailyPrice_ID));
    return arrResult;
  } catch (e) {
    console.log(e);
  }
}

async function InsertSecurtity_DailyPrice(data) {
  try {
    await tkSecurtity_DailyPrice.bulkCreate(data);
  } catch (e) {
    console.log(e);
  }
}

async function search(ticker) {
  try {
    return await tsecurity.findOne({
      attributes: ['Security_ID'],
      where: {
        Security_Ticker: ticker,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = router;
