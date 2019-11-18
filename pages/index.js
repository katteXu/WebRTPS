import { PureComponent } from 'react';
import { Button, Icon, Select, message } from 'antd';
import router, { withRouter } from 'next/router';
// import jsmpeg from 'jsmpeg';
import styles from '../static/main.less';
import Control from '../components/control';
import Camera from '../components/camera';
import { createStream } from '../service/api';

const Line = {
  4: 4,
  9: 9,
  16: 16
}

class Index extends PureComponent {
  static async getInitialProps(props) {
    const { isServer } = props;
    return {};
  }
  constructor(props) {
    super(props);
    this.state = {
      JSMpeg: null,
    }
  }

  componentDidMount() {
    message.config({
      maxCount: 1,
      duration: 2
    });
    this.setState({
      line: router.query.line
    });
  }

  render() {
    const { line } = this.state;
    const Count = Line[line] || 4;
    const cell = (100 / Math.sqrt(Count))
    return (
      <div className={styles.main}>
        {
          (new Array(Count)).fill(0).map((item, i) => (
            <div className={styles.block} key={i} style={{ width: cell + '%', height: cell + '%' }}>
              <Camera index={i} />
            </div>
          ))
        }
      </div >
    )
  }
}

export default withRouter(Index);