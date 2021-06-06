import React from 'react';
import styles from './index.scss';
import LazyLoad from 'react-lazyload';
const placeholder = <div className={styles.placeholder}></div>;
const ImgBox = () => {
    return (
        <LazyLoad height={200} placeholder={placeholder}>
            <img src={require('assets/b.jpg')} />
        </LazyLoad>
    );
};
export default ImgBox;
