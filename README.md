### Service Worker 后台推送通知的例子，可离线推送。
- 启动

```shell
npm i && npm start
```

- 推送

点击`启用订阅`,会询问是否确定。点击允许，会出现一个代码串，如下

```json
{"endpoint":"https://fcm.googleapis.com/fcm/send/cHzXQHnL1Hc:APA91bEHwBuqQNyccsgoo7ciqdfgDmvk1h2h-CqLCEWC3jJUKWVc-D9PaYSq5eDi88zlEL8Rz3j57WWoyOr9FwS9kFnnUE-FEJRSX7ucwVI4UgyvZatJ-_4Y5-tlC1WwMG9xOsjYJTTDjKaRXqvXnKhSbXkMd1R7qA","expirationTime":null,"keys":{"p256dh":"BLi814WAd6CWYo0me5qoeKc5oV2Q1PSarrAzZJINAPbhpD3sLE4fPB_ETpVO8ZJdm1mup8gR72qd1XSka2ni02k","auth":"ZYVezUhhJ7Et8I8_sWXtnA"}}
```

这个就是用户的订阅信息，[用这个信息去模拟服务端推送 Codelab Message Sending](https://web-push-codelab.glitch.me/)

不出意外，会显示推送的消息.

> 如果不小心点了通知禁止，可以点击浏览器网址导航左侧的`圈i`。


上面的模拟的服务器推送，如果需要集成，可以载入对应的包。

- [后端push包](https://github.com/web-push-libs)
- [ruby push](https://github.com/zaru/webpush)
