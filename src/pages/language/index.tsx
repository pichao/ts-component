import React, { useCallback, useContext, useEffect } from 'react';

import { useTranslation, Trans } from 'react-i18next';
import { store } from 'store/index';
import styles from './index.scss';
import { Button } from 'antd';
export interface Props {
    userName?: string;
    lang?: string;
}
export default (props: Props) => {
    const { dispatch, state } = useContext(store);
    const { t, i18n } = useTranslation();
    useEffect(() => {}, []);
    const changeLan = useCallback((lan) => {
        i18n.changeLanguage(lan);
    }, []);
    return (
        <div className={styles.language}>
            <Trans>
                To get started, edit <code>src/App.js</code> and save to reload.
            </Trans>
            <div>
                <Trans i18nKey="welcome">welcome</Trans>
            </div>

            <div>
                <Button
                    onClick={() => {
                        changeLan('zh');
                    }}
                >
                    中文
                </Button>
                <Button
                    onClick={() => {
                        changeLan('en');
                    }}
                >
                    {' '}
                    英文
                </Button>
            </div>
        </div>
    );
};
