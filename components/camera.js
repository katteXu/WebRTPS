import { useState, useEffect, forwardRef, createRef } from 'react';
import { Row, Col, Icon, message } from 'antd';
import { createStream } from '../service/api';
import styles from '../static/camera.less';


// 摄像头窗口
const Camera = () => {
  // 当前窗口实例
  let main = null;
  let ctrlDom = null;

  const ref = createRef();
  // 播放/暂停
  const [play, setPlay] = useState(false);

  // 全屏/恢复
  const [full, setFull] = useState(false);

  // 当前频道
  const [channel, changeChannel] = useState('channel1');

  // 播放器
  const [player, setPlayer] = useState();

  useEffect(() => {
    (async () => {
      await initStream(channel);
    })()
  }, [channel])

  // 播放
  const handlePlay = async () => {
    message.success(`${!play ? '播放' : '暂停'}`);
    setPlay(!play);
    // 当前存在播放器
    if (player) {
      if (!play) {
        player.play();
      } else {
        player.stop();
      }
    } else {
      await initStream(channel);
    }
  }

  const changeView = async (channel) => {
    if (player) {
      try {
        player.destroy();
      } catch (error) {
        // 异常信息
        // console.error(error);
      }
    }
    changeChannel(channel);
  }

  // 全屏放大缩小
  const changeScreen = () => {
    setFull(!full);
  }

  // 创建连接流
  const initStream = async (c) => {
    const params = {
      key: c
    }
    // 创建流 获取端口号
    const { port, msg } = await createStream({ params });
    if (port) {
      createCanvas(port);
      setPlay(true);
    } else {
      message.error(msg);
      setPlay(false);
    }
  }

  // 创建视窗
  const createCanvas = (port) => {
    const _canvas = document.createElement('canvas');
    _canvas.className = styles['view-block'];
    const _player = new window.JSMpeg.Player(`ws://${document.location.hostname}:${port}`, { canvas: _canvas });
    main.insertBefore(_canvas, ctrlDom);
    setPlayer(_player);
  }

  return (
    <div
      className={`${styles.main} ${full ? styles.full : ''}`}
      ref={(dom) => { main = dom }}>
      {/* 窗口区 */}
      {/* 动态插入 */}
      {/* 操作区 */}
      <div className={styles.control} ref={(dom) => { ctrlDom = dom }}>
        <div className={styles['control-block']}>
          <Row gutter={12}>
            <Col span={2} style={{ textAlign: 'right' }}>
              {
                play ?
                  <Icon type="pause-circle" style={{ fontSize: 20, color: '#fff' }} onClick={handlePlay} /> :
                  <Icon type="play-circle" style={{ fontSize: 20, color: '#fff' }} onClick={handlePlay} />
              }
            </Col>
            <Col span={5}>
              <select name="" id="" style={{ height: '100%', width: '100%' }}>
                <option value="1">煤仓1</option>
                <option value="2">煤仓2</option>
              </select>
            </Col>
            <Col span={5}>
              <select name="" id="" style={{ height: '100%', width: '100%' }} onChange={(e) => changeView(e.target.value)}>
                <option value="channel1">频道1</option>
                <option value="channel2">频道2</option>
                <option value="channel3">频道3</option>
              </select>
            </Col>
            <Col offset={10} span={2} style={{ textAlign: 'right' }}>
              {
                full ?
                  <Icon type="fullscreen-exit" style={{ fontSize: 20, color: '#fff' }} onClick={changeScreen} /> :
                  <Icon type="fullscreen" style={{ fontSize: 20, color: '#fff' }} onClick={changeScreen} />
              }
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Camera;