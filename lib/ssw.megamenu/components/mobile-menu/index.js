import React from 'react';
import styles from './index.module.css';
import cs from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

class MobileMenu extends React.Component {
  //const DesktopMenu = ({prefix}) => {
  constructor(props) {
    super(props);
    this.state = { menuModel: null };
  }

  loadMenuModel() {
    if (!this.state.menuModel) {
      let currentComponent = this;
      fetch('https://SSWConsulting.github.io/SSW.Website.Menu.json/menu.json')
      .then(res => res.json())
        .then(function (response) {
          currentComponent.setState({ menuModel: response });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    this.loadMenuModel();
  }

  closeOpenedElements(element) {
    var openedItems = document.getElementsByClassName(cs(styles.dropdown, styles.open));
    for (let item of openedItems) {
      if (item !== element.parentNode?.parentNode) {
        item.className = styles.dropdown;
      }
    }
  }

  openElement(element) {
    this.closeOpenedElements(element);
    element.className = cs(styles.dropdown, styles.open);
  }

  closeElement(element) {
    element.className = styles.dropdown;
  }

  openItem(event) {
    if (event.target.parentNode.className === styles.dropdown) {
      this.closeOpenedElements(event.target.parentNode);
      this.openElement(event.target.parentNode);
    } else if (event.target.parentNode.parentNode.className === styles.dropdown) {
      this.closeOpenedElements(event.target.parentNode);
      this.openElement(event.target.parentNode.parentNode);
    } else if (event.target.parentNode.className === cs(styles.dropdown, styles.open)) {
      this.closeElement(event.target.parentNode);
    } else if (
      event.target.parentNode.parentNode.className === cs(styles.dropdown, styles.open)
    ) {
      this.closeElement(event.target.parentNode.parentNode);
    }
  }

  renderMenuItems(item, index) {
    if (!item.children || item.navigateUrlOnMobileOnly) {
      return (
        <li key={index} className={styles.dropdown}>
          <a
            href={item.navigateUrl ? item.navigateUrl : null}
            className={cs(styles.ignore, 'unstyled')}
          >
            {item.text}
          </a>
        </li>
      );
    } else if (item.children) {
      return (
        <li key={index} className={styles.dropdown}>
          <a className={cs(styles.dropdownToggle, 'unstyled')}>
            {item.text} <FontAwesomeIcon icon={faAngleDown} />
          </a>
          <ul className={styles.dropdownMenu}>
            {item.children.map((item, index) => {
              return this.renderMenuItems(item, index);
            })}
          </ul>
        </li>
      );
    }
  }

  render() {
    return (
      <div
        className={cs(styles.sbSlidebar, styles.sbLeft)}
        style={{ width: this.props.isMenuOpened ? '84vw' : '0px' }}
        onClick={(event) => this.openItem(event)}
      >
        <div className={cs(styles.menuDrop, styles.navbarCollapse)}>
          <ul className={styles.navbarNav}>
            {this.state.menuModel &&
              this.state.menuModel.menuItems.map((item, index) => {
                return this.renderMenuItems(item, index);
              })}
          </ul>
        </div>
      </div>
    );
  }
}
export default MobileMenu;
