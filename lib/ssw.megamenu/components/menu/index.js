import React from 'react';
import styles from './index.module.css';
import DesktopMenu from './desktop-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import cs from 'classnames';

import services from '../../assets/images/Menu-Banner-Services.png'
import products from '../../assets/images/Menu-Banner-Products.png'
import training from '../../assets/images/Menu-Banner-Training.png'
import user_group from '../../assets/images/Menu-Banner-UserGroup.png'
import rules from '../../assets/images/Menu-Banner-Standards.png'
import about_us from '../../assets/images/Menu-Banner-AboutUs.png'

const searchUrl = `https://www.google.com.au/search?q=site:ssw.com.au%20`;
class Menu extends React.Component {
  menu_Search(search) {
    if (window) {
      window.open(searchUrl + search);
    }
  }

  handleKeyDownOnMenuSearchInput(event) {
    if (event.key === 'Enter') {
      this.menu_Search(event.target.value);
    }
  }

  render() {
    const { menuModel } = this.props;
    return (
      // this.state.menuModel &&
      <div className={styles.MegaMenu}>
        <div className={styles.menuContent}>
          <div className={cs(styles.menuMobile, styles.visibleXs, styles.visibleSm)}>
            <div
              className={styles.sbToggleLeft}
              onClick={() => this.props.onClickToggle()}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
          <DesktopMenu
            prefix={this.props.prefix}
            menuModel={menuModel}
          ></DesktopMenu>
          <div className={styles.menuSearch}>
            <input
              type="text"
              className={styles.searchBox}
              onKeyDown={(event) => this.handleKeyDownOnMenuSearchInput(event)}
            />
          </div>
        </div>
      </div>
    );
  }
}

// This is a temporary workaround
// Ideally the images should be hosted and the image url passed in via https://SSWConsulting.github.io/SSW.Website.Menu.json/menu.json
const imageLibrary = {
    "Menu-Banner-Services.png": services,
    "Menu-Banner-Products.png": products,
    "Menu-Banner-Training.png": training,
    "Menu-Banner-UserGroup.png": user_group,
    "Menu-Banner-Standards.png": rules,
    "Menu-Banner-AboutUs.png": about_us,
}

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuModel: require('../../assets/data/menu.json'),
      menuLoaded: false,
    };
  }

  componentDidMount() {
    let currentComponent = this;
    fetch('https://SSWConsulting.github.io/SSW.Website.Menu.json/menu.json')
      .then(res => res.json())
      .then(function (response) {
          currentComponent.setState({ 
              menuModel: {
                  ...response,
                  menuItems: response.menuItems.map(menuItem => {
                      return {
                          ...menuItem,
                          src: imageLibrary[menuItem.groupImageUrl]
                      }
                  })

              }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { menuModel, menuLoaded } = this.state;

    return (
      <Menu menuModel={menuModel} menuLoaded={menuLoaded} {...this.props} />
    );
  }
}

export default Wrapper;
