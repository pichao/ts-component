import { Form, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import types from './types';
const usetable = (options, getData, filter = []) => {
    // filter为动态字段，因为form表单initionValue不接受动态字段，所以，在动态字段拿到前不应该请求表格数据
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useState({});
    const [formParams, setFormParams] = useState({});
    const Xtable = useCallback(() => {
        useEffect(() => {
            setSearchParams(form.getFieldsValue());
            setFormParams(form.getFieldsValue());
        }, []);

        return (
            <>
                <Form
                    form={form}
                    onValuesChange={(changedValues, allValues) => {
                        setFormParams(allValues);
                    }}
                >
                    {options.searchOptions.map((item) => {
                        const targetType = types.find((i) => i.type === item.type);
                        if (targetType) {
                            return (
                                <Form.Item key={item.name} {...item.formItemProps}>
                                    <targetType.component />
                                </Form.Item>
                            );
                        }
                        return null;
                    })}
                </Form>
            </>
        );
    }, [options]);
    const getTableData = useCallback(
        async (params) => {
            const result = await getData(params);
        },
        [getData, searchParams],
    );
    useEffect(() => {
        console.log(searchParams, 'searchParams');

        let flag = true;
        filter.forEach((item) => {
            if (!searchParams[item]) {
                flag = false;
            }
        });
        if (Object.keys(searchParams).length && flag) {
            getTableData(searchParams);
        }
    }, [searchParams]);
    const getSearchParams = useCallback(() => {
        return searchParams;
    }, [searchParams]);
    const getFormParams = useCallback(() => {
        return formParams;
    }, [formParams]);
    return [Xtable, getSearchParams, getFormParams];
};
export default usetable;
