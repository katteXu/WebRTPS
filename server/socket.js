const Stream = require('./rtps-stream/videoStream');

const ChannelList = {
  channel1: 'rtsp://admin:admin123@1.71.251.4:8010/cam/realmonitor?channel=1&subtype=0',
  channel2: 'rtsp://admin:admin123@1.71.251.4:8011/cam/realmonitor?channel=1&subtype=0',
  channel3: 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov'
}

// 流媒体池
const StreamPool = {};

// 创建流
let port = 0;
const createStream = (key) => {
  console.log("线路数量：=====>(", Object.keys(StreamPool).length, ")");
  const stream = StreamPool[key];
  // 如果存在流 则直接返回对应的端口号 供前端订阅
  if (stream) {
    return { port: stream.port }
  }

  if (!ChannelList[key]) {
    return { port: null, msg: '无频道资源' }
  }
  const _p = 5000 + (port++)
  const opt = {
    name: `stream${port}`,
    url: ChannelList[key],
    port: _p
  }
  const _stream = new Stream(opt);
  _stream.start();
  StreamPool[key] = {
    stream: _stream,
    port: _p,
  }
  return { port: _p };
}

module.exports = {
  createStream
}

