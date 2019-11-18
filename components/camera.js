import { useState, useEffect, forwardRef, createRef } from 'react';
import { Row, Col, Icon, message } from 'antd';
import { createStream } from '../service/api';
import styles from '../static/camera.less';


const ChannelList = {
  1: [-1, 1, 2],
  2: [-1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  3: [-1, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
}

// 摄像头窗口
const Camera = ({ index }) => {
  // 当前窗口实例
  let main = null;
  let ctrlDom = null;

  const ref = createRef();
  // 播放/暂停
  const [play, setPlay] = useState(false);

  // 全屏/恢复
  const [full, setFull] = useState(false);

  // 当前频道
  const [channel, changeChannel] = useState(`channel${index + 1}`);

  // 播放器
  const [player, setPlayer] = useState();

  // 地点频道
  const [place, setPlace] = useState(1);
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

  const changeView = async (item) => {
    console.log(item);
    if (item === '-1') {
      return;
    }
    if (player) {
      try {
        const result = player.destroy();
      } catch (error) {
        // 异常处理
        const canvas = main.getElementsByClassName(styles['view-block'])[0];
        if (canvas) {
          main.removeChild(document.getElementsByClassName(styles['view-block'])[0]);
        }
      }
    }
    changeChannel(`channel${item}`);
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

  // 切换地点
  const onSelectPlace = (e) => {
    setPlace(e.target.value);
  }

  // 刷新
  const onRefresh = async () => {
    if (player) {
      try {
        player.destroy();
      } catch (error) {
        // 异常处理
        const canvas = main.getElementsByClassName(styles['view-block'])[0];
        if (canvas) {
          main.removeChild(document.getElementsByClassName(styles['view-block'])[0]);
        }
      }
    }
    await initStream(channel);
  }

  return (
    <div
      className={`${styles.main} ${full ? styles.full : ''}`}
      ref={(dom) => {
        dom && (main = dom);
      }}>
      {/* 窗口区 */}
      {/* 动态插入 */}
      {/* 操作区 */}
      <div className={styles.control} ref={(dom) => { dom && (ctrlDom = dom) }}>
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
              <select name="" id="" style={{ height: '100%', width: '100%' }} onChange={onSelectPlace}>
                <option value="1">其他</option>
                <option value="2">煤矿</option>
                <option value="3">受煤站</option>
              </select>
            </Col>
            <Col span={5}>
              <select name="" id="" style={{ height: '100%', width: '100%' }} onChange={(e) => changeView(e.target.value)}>
                {
                  ChannelList[place].map(item => <option key={item} value={item}>{item === -1 ? '请选择' : `频道-${item}`}</option>)
                }
              </select>
            </Col>
            <Col span={2}>
              <Icon type="redo" style={{ fontSize: 20, color: '#fff' }} onClick={onRefresh} />
            </Col>
            <Col offset={8} span={2} style={{ textAlign: 'right' }}>
              {
                full ?
                  <Icon type="fullscreen-exit" style={{ fontSize: 20, color: '#fff' }} onClick={changeScreen} /> :
                  <Icon type="fullscreen" style={{ fontSize: 20, color: '#fff' }} onClick={changeScreen} />
              }
            </Col>
          </Row>
        </div>
      </div>
    </div >
  )
}

export default Camera;