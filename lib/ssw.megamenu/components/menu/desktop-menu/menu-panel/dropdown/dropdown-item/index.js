import React from 'react';
import styles from './index.module.css';
import cs from 'classnames';

const DropdownItem = ({ item, index }) => {
  const stylesList = [
    styles.NonClickableMenuItem,
    styles.level1,
    styles.level2,
    styles.ignore,
    styles.ClickableMenuItem,
  ];
  const l1Class = item.data.navigateUrlOnMobileOnly
    ? cs(styles.NonClickableMenuItem, styles.level1)
    : item.data.cssClass
    ? cs(stylesList[item.data.cssClass], styles.level1)
    : styles.level1;

  return (
    <>
      {item.level === 1 && (
        <li key={index} className={l1Class}>
          {(!item.data.navigateUrl || item.data.navigateUrlOnMobileOnly) && (
            <span className={cs(styles.ignore, 'unstyled')}>{item.data.text}</span>
          )}
          {item.data.navigateUrl && !item.data.navigateUrlOnMobileOnly && (
            <a
              href={item.data.navigateUrl ? item.data.navigateUrl : null}
              className={cs(styles.ignore, 'unstyled')}
            >
              {item.data.text}
            </a>
          )}
        </li>
      )}
      {item.level === 2 && (
        <li
          key={index}
          className={
            item.data.cssClass
              ? cs(stylesList[item.data.cssClass], styles.ClickableMenuItem, styles.level2)
              : cs(styles.ClickableMenuItem, styles.level2)
          }
        >
          <a
            href={item.data.navigateUrl ? item.data.navigateUrl : null}
            className={cs(styles.ignore, 'unstyled')}
          >
            {item.data.text}
          </a>
        </li>
      )}
    </>
  );
};

export default DropdownItem;
