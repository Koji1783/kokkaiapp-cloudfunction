const functions = require("firebase-functions");
const express = require("express");
const requestPromise = require("request-promise-native");

// local
// http://localhost:5000/kokkaiapp-functions-4b235/us-central1/helloWorld

// deploy
// https://us-central1-kokkaiapp-functions-4b235.cloudfunctions.net/helloWorld

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const app = express();

// APIにリクエストを送る関数を定義
const getDataFromApi = async (keyword) => {
    // cloud functionsから実行する場合には地域の設定が必要になるため，`country=JP`を追加している
    const requestUrl =
        "https://kokkai.ndl.go.jp/api/meeting_list?any=";
    const result = await requestPromise(`${requestUrl}${keyword}${"&maximumRecords=1&recordPacking=json&country=JP"}`);
    return result;
};

app.get("/hello", (req, res) => {
    // レスポンスの設定
    res.send("Hello Express!");
});


// エンドポイント追加
app.get("/kokkai/:keyword", async (req, res) => {
    // APIリクエストの関数を実行
    const response = await getDataFromApi(req.params.keyword);
    res.send(response);
});


// 出力
const api = functions.https.onRequest(app);
module.exports = { api };

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
