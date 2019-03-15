import React from 'react';
import PropTypes from 'prop-types';
import { 
    Button } from 'antd';
import styles from './HeadFootButton.less';

class HeadFootButton extends React.Component {
    static propTypes = {
      buttonData: PropTypes.array,
    };
  
    static defaultProps = {
        buttonData: [],
    };
  
    constructor(props) {
          super(props);
          this.state = {}
    }

    render () {
      const {buttonData} = this.props;
      const buttonRand = () => (
        buttonData.map( (value) => (
          <Button key={value.labe} type={value.type} icon={value.ico} onClick={(e) => value.hangClick(e)}>{value.labe}</Button>
        ))
      )

      return (
        <div className={styles.addButton}>
          {buttonRand()}
        </div>
      )
    }
}

export default HeadFootButton;