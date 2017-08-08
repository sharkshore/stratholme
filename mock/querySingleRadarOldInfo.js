'use strict';

const qs = require('qs');
// require('body-parser')

// 引入 mock js
const Mock = require('mockjs')
const Random = Mock.Random;

/**
 * 征信雷达-单条查询的历史记录
 * @type {{POST /mock/v1/radarBatch/querySingleRadarOldInfo: ((req, res))}}
 */
module.exports = {
  'POST /mock/v1/radarBatch/querySingleRadarOldInfo' (req, res) {

    const data = Mock.mock({
      'data|5': [{
        'batchNo|9': '@character',
        'orderNo|9': '@character',
        'productNo|11': '@character',
        'name': '@cname',
        'idCard': /^\d{15}|\d{18}$/,
        'queryTime': '@datetime',
        'checkStatus|3': '@character',
        'filePathPdf': '@url',
        'filePathXls': '@url'
      }],
    });

    res.json({
      "success": true,
      "data": {
        "pageNo": 7,
        "pageSize": 5,
        "resDTOs": data.data,
        "totalCount": 98
      },
      "errorCode": "QUERY_NOT_FOUND_INFO",
      "errorMsg": "查无记录",
      req: req.body
    });
  },
};

