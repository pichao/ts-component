import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import styles from './index.scss';
import { Link } from 'react-router-dom';
// import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Button, Checkbox, DatePicker } from 'antd';
import { useGetformParams } from 'hooks/useGetformParams';

import { useRequest } from 'hooks/useRequest';
import { store } from 'store/index';
import { SketchPicker } from 'react-color';
import { camelCase } from 'lodash-es';
import ImgBox from 'components/imgLazyLoad/index';
import { forceCheck } from 'react-lazyload';
import homeUrl, { ReactComponent as HomeSvg } from 'assets/images/home2.svg';
import usetable from 'hooks/useTable';

export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
export default (props: HelloWorldProps) => {
    const { dispatch, state } = useContext(store);
    console.log(state, 'cccccccc');
    const options = useMemo(
        () => ({
            searchOptions: [
                {
                    type: 'input',
                    formItemProps: {
                        name: 'aaa',
                        initialValue: state.address,
                    },
                },
                {
                    type: 'input',
                    formItemProps: {
                        name: 'bbb',
                        initialValue: 'bbb',
                    },
                },
                {
                    type: 'input',
                    formItemProps: {
                        name: 'ccc',
                        initialValue: 'ccc',
                    },
                },
            ],
        }),
        [state],
    );
    const getData1 = useCallback((params) => {
        console.log(params, 'params');
        return new Promise((resolve, reject) => {
            return {
                status: 200,
            };
        });
    }, []);
    const [Xtable, getSearchParams, getFormParams] = usetable(options, getData1, ['aaa']);
    useEffect(() => {
        dispatch({
            type: 'aaa',
            payload: {
                address: 'xxxxxxx',
            },
        });
    }, []);
    // console.log(camelCase('Foo Bar'));
    // const selectedData = useSelector((state) => {
    //     console.log(state, 'stateyyyyyyyyyyyyy');
    //     return state;
    // }, shallowEqual) as any;
    // const dispatch = useDispatch();
    const [formData, setFormItem] = useGetformParams({
        name: '',
        add: '',
    });
    const submit = () => {
        console.log(formData);
    };

    // const [isFetching, res, getData] = useRequest(
    //     {
    //         method: 'get',
    //         url: '/api/v2/all',
    //     },
    //     () => {
    //         console.log('请求完成后执行');
    //     },
    // );
    // console.log(isFetching, res, 'uuuuuuuuuuuu');
    const handleColorChange = ({ hex }) => {
        console.log(hex);
        document.body.style.setProperty('--primary-color', hex);

        (window as any).less
            .modifyVars({
                '@primary-color': hex,
            })
            .then(() => {
                console.log('更新主题成功');
            })
            .catch((error) => {
                console.log(`Failed to update theme`);
            });
    };
    return (
        <div>
            <Xtable />
            <div>
                <Button
                    onClick={() => {
                        console.log(getSearchParams(), 'getSearchParams');
                    }}
                >
                    getSearchParams
                </Button>
                <Button
                    onClick={() => {
                        console.log(getFormParams(), 'getFormParams()');
                        getFormParams();
                    }}
                >
                    getFormParams
                </Button>
            </div>
            {/* <div>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                        // sss;

                        setFormItem('name', e.target.value);
                    }}
                />
                <img src={homeUrl} alt="" />
                <HomeSvg fill={'red'} />
                <input
                    type="text"
                    value={formData.add}
                    onChange={(e) => {
                        // sss;

                        setFormItem('add', e.target.value);
                    }}
                />
                <Link to={'/about$'}>about</Link>
                <Link to={'/users$'}>users</Link>
            </div>
            <button onClick={submit}>测试</button>
            <button
                onClick={() => {
                    // getData();
                    dispatch({
                        type: 'test_state',
                        payload: {
                            tips: '测试state',
                        },
                    });
                }}
            >
                测试state
            </button>
            <DatePicker />
            <SketchPicker onChangeComplete={handleColorChange} /> */}
            {/* {selectedData.showAlert ? <div>这里验证发送action</div> : null} */}
            {/* <Button type={'primary'}>primary</Button>
            <div>
                <img src={require('assets/images/a.jpg')} />
            </div>
            <div>
                <img src={require('assets/images/a.jpg')} />
            </div>{' '}
            <div>
                <img src={require('assets/images/a.jpg')} />
            </div>{' '}
            <div>
                <img src={require('assets/images/a.jpg')} />
            </div>{' '}
            <div>
                <img src={require('assets/images/a.jpg')} />
            </div>{' '}
            <div>
                <img src={require('assets/images/a.jpg')} />
            </div>{' '}
            <div>
                <img src={require('assets/images/a.jpg')} />
            </div>
            <div className={styles.home}>这是home页面</div>
            <ImgBox src={'a'} />
            <ImgBox src={'b'} />
            <ImgBox src={'c'} />
            <ImgBox src={'d'} />
            <ImgBox src={'e'} />
            <ImgBox src={'f'} /> */}
        </div>
    );
};
