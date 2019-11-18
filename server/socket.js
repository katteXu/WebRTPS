const Stream = require('./rtps-stream/videoStream');

const ChannelList = {
  // 煤矿
  channel1: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=1&subtype=1',
  channel2: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=2&subtype=1',
  channel3: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=3&subtype=1',
  channel4: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=4&subtype=1',
  channel5: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=5&subtype=1',
  channel6: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=6&subtype=1',
  channel7: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=7&subtype=1',
  channel8: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=8&subtype=1',
  channel9: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=9&subtype=1',
  channel10: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=10&subtype=1',
  channel11: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=11&subtype=1',
  channel12: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=12&subtype=1',
  channel13: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=13&subtype=1',
  channel14: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=14&subtype=1',
  channel15: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=15&subtype=1',
  channel16: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=16&subtype=1',
  channel17: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=17&subtype=1',
  channel18: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=18&subtype=1',
  channel19: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=19&subtype=1',
  channel20: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=20&subtype=1',
  channel21: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=21&subtype=1',
  channel22: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=22&subtype=1',
  channel23: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=23&subtype=1',
  channel24: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=24&subtype=1',
  channel25: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=25&subtype=1',
  channel26: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=26&subtype=1',
  channel27: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=27&subtype=1',
  // 受煤站
  channel28: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=1&subtype=1',
  channel29: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=2&subtype=1',
  channel30: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=3&subtype=1',
  channel31: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=7&subtype=1',
  channel32: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=5&subtype=1',
  channel33: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=6&subtype=1',
  channel34: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=7&subtype=1',
  channel35: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=8&subtype=1',
  channel36: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=9&subtype=1',
  channel37: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=10&subtype=1',
  channel38: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=11&subtype=1',
  channel39: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=12&subtype=1',
  channel40: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=13&subtype=1',
  channel41: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=14&subtype=1',
  channel42: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=15&subtype=1',
  channel43: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=16&subtype=1',
  channel44: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=17&subtype=1',
  channel45: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=18&subtype=1',
  channel46: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=19&subtype=1',
}

// 流媒体池
const StreamPool = {};

// 创建流
let port = 0;
const createStream = (key) => {
  const stream = StreamPool[key];
  // 如果存在流 则直接返回对应的端口号 供前端订阅
  if (stream) {
    stream.line = stream.line + 1;
    return { port: stream.port }
  }

  if (!ChannelList[key]) {
    return { port: null, msg: '无频道资源' }
  }
  const _p = 5000 + (port++)
  const opt = {
    name: `${key}`,
    url: ChannelList[key],
    port: _p
  }
  const _stream = new Stream(opt);
  //  绑定事件
  bindEvent(_stream);
  _stream.start();
  StreamPool[key] = {
    stream: _stream,
    port: _p,
    line: 1
  }
  return { port: _p };
}

/**
 * 线路退出停止线程
 * @param {Stream} stream 
 */
const bindEvent = (stream) => {
  stream.server.on("connection", (socket) => {
    socket.on('close', () => {
      const currentLine = StreamPool[stream.name].line - 1;
      StreamPool[stream.name].line = currentLine;
      if (currentLine === 0) {
        stream.stop();
        delete StreamPool[stream.name];
        // console.log('当前服务端线程池:', StreamPool);
      }
    });
  });
}


module.exports = {
  createStream
}

