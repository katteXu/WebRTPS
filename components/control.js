import { useState } from 'react'
import { Row, Col, Button, Select, Icon } from 'antd';
const Control = ({ onPlay, onSelect, onResize }) => {
  const [play, setPlay] = useState(false);

  const [full, setFull] = useState(false);
  // 
  const handlePlay = () => {
    setPlay(!play);
    if (typeof onPlay === "function") {
      onPlay(!play)
    }
  }

  const changeScreen = () => {
    setFull(!full);
    if (typeof onResize === "function") {
      onResize(!full);
    }
  }

  return (
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
        <select name="" id="" style={{ height: '100%', width: '100%' }}>
          <option value="1">频道1</option>
          <option value="2">频道2</option>
          <option value="3">频道3</option>
          <option value="4">频道4</option>
          <option value="5">频道5</option>
          <option value="6">频道6</option>
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
  )
}

export default Control;