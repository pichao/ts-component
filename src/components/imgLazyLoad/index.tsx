import React from 'react';
import styles from './index.scss';
import LazyLoad from 'react-lazyload';

const placeholder = <div className={styles.placeholder}>111111111</div>;
const ImgBox = ({ src }) => {
    const src1 = `${src}`;
    console.log(src);
    return (
        <LazyLoad height={2000} placeholder={placeholder} offset={[-100, 0]}>
            <img src={require(`assets/images/${src1}.jpg`)} />
        </LazyLoad>
    );
};
export default ImgBox;
