const Stream = require('./rtps-stream/videoStream');

const ChannelList = {
  // 煤矿
  channel0: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=0',
  channel1: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=1',
  channel2: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=2',
  channel3: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=3',
  channel4: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=4',
  channel5: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=5',
  channel6: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=6',
  channel7: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=7',
  channel8: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=8',
  channel9: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=9',
  channel10: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=10',
  channel11: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=11',
  channel12: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=12',
  channel13: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=13',
  channel14: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=14',
  channel15: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=15',
  channel16: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=16',
  channel17: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=17',
  channel18: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=18',
  channel19: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=19',
  channel20: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=20',
  channel21: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=21',
  channel22: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=22',
  channel23: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=23',
  channel24: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=24',
  channel25: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=25',
  channel26: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=26',
  channel27: 'rtsp://admin:admin123@1.71.251.4:9001/cam/realmonitor?channel=27',
  // 受煤站
  channel28: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=0',
  channel29: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=1',
  channel30: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=2',
  channel31: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=3',
  channel32: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=7',
  channel33: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=5',
  channel34: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=6',
  channel35: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=7',
  channel36: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=8',
  channel37: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=9',
  channel38: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=10',
  channel39: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=11',
  channel40: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=12',
  channel41: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=13',
  channel42: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=14',
  channel43: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=15',
  channel44: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=16',
  channel45: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=17',
  channel46: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=18',
  channel47: 'rtsp://admin:admin123@1.71.251.7:9001/cam/realmonitor?channel=19',
}

// 流媒体池
const StreamPool = {};

// 创建流
let port = 0;
const createStream = (key, subtype) => {
  const keyName = `${key}-${subtype}`
  const stream = StreamPool[keyName];
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
    name: `${keyName}`,
    url: `${ChannelList[key]}&subtype=${subtype}`,
    port: _p
  }
  console.log(opt.url);
  const _stream = new Stream(opt);
  //  绑定事件
  bindEvent(_stream);
  _stream.start();
  StreamPool[keyName] = {
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

