import React from 'react';
import styles from './index.module.css';
import cs from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import MenuPanel from './menu-panel';

class DesktopMenu extends React.Component {
  // getRootUrl() {
  //   if (this.props.prefix && typeof window !== 'undefined') {
  //     return (
  //       window.location.origin
  //         ? window.location.origin + '/'
  //         : window.location.protocol + '/' + window.location.host + '/') + this.props.prefix + '/';
  //   }
  //   return '';
  // }

  render() {
    return (
      <div className={cs(styles.menuDrop, styles.hiddenXs, styles.hiddenSm)}>
        <ul>
          {this.props.menuModel &&
            this.props.menuModel.menuItems.map((item, index) => {
              return (
                <li key={index}>
                  {!item.children && (
                    <a
                      href={item.navigateUrl ? item.navigateUrl : null}
                      className={cs(styles.ignore, 'unstyled')}
                    >
                      {item.text}
                    </a>
                  )}{' '}
                  {item.children && (
                    <>
                      <a className={cs(styles.ignore, 'unstyled')}>
                        {item.text} <FontAwesomeIcon icon={faAngleDown} />
                      </a>
                      <div className={styles.Menu}>
                        <MenuPanel item={item} prefix={this.props.prefix} />
                      </div>
                    </>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default DesktopMenu;
