import { PureComponent } from 'react';
import { Button, Icon, Select, message } from 'antd';
// import jsmpeg from 'jsmpeg';
import styles from '../static/main.less';
import Control from '../components/control';
import Camera from '../components/camera';
import { createStream } from '../service/api';
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      JSMpeg: null
    }
  }

  componentDidMount() {
    message.config({
      maxCount: 1,
      duration: 2
    });
  }

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.block}>
          <Camera />
        </div>
        <div className={styles.block}>
          <Camera />
        </div>
        <div className={styles.block}>
          <Camera />
        </div>
        <div className={styles.block}>
          <Camera />
        </div>
      </div >
    )
  }
}

export default Index;