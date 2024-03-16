import { FC, useState } from 'react';
import { Flex, Search, Select, SelectEvent } from "vienna-ui"
import { IFilterState, ITableFields } from "../types/types";

interface ValueType {
    name: string;
    text: string;
}

interface FilterTableProps {
    filter: IFilterState;
    setFilter: (newFilter: IFilterState) => void;
    setLimit: (newLimit: number) => void;
    tableFields: ITableFields;
    limit?: number;
    setPage: (newPage: number) => void;
}

const FilterTable: FC<FilterTableProps> = ({
    filter,
    tableFields,
    limit = 10,
    setFilter,
    setLimit,
    setPage,
}) => {
    const [valueFilter, setValueFilter] = useState<ValueType>({ name: '', text: '' });
    const [valueLimit, setValueLimit] = useState<number>(0);

    const handleFilterSelect: SelectEvent = (e, data) => {
        if (data) {
            const selectedSort = data.value as ValueType;
            setFilter({ ...filter, sort: selectedSort.name });
            setValueFilter(selectedSort);
        }
    };

    const handleLimitSelect: SelectEvent = (e, data) => {
        if (data) {
            const newLimit = Number(data.value);

            setLimit(newLimit);
            setValueLimit(data.value);
            setPage(1);
        }
    };

    const limitOptions = Array.from({ length: Math.min(5, limit) }, (_, i) => (i + 1) * limit / 5);

    return (
        <Flex
            flow="row"
            alignItems="flex-end"
            marginVertical="s5"
        >
            <Search
                design='material'
                value={filter.query}
                placeholder='Начните поиск'
                onChange={(e, data) => setFilter({ ...filter, query: data?.value || '' })}
            />
            <Flex marginLeft="s5" style = {{width: "40%"}}>
                <Select
                    valueToString={(item) => item && item.text}
                    compare={(item) => item && item.name}
                    design='material'
                    placeholder='Сортировка по'
                    value={valueFilter}
                    onSelect={handleFilterSelect}
                    size='m'
                >
                    <Select.Option disabled value={{ name: '', text: 'Сортировка по' }} />
                    {Object.keys(tableFields).map(key => (
                        <Select.Option key={key} value={{ name: key, text: tableFields[key] }} />
                    ))}
                </Select>
                <Select
                    design='material'
                    placeholder='Количество строк'
                    value={valueLimit}
                    onSelect={handleLimitSelect}
                    size='m'
                >
                    <Select.Option disabled>Строк на странце</Select.Option>
                    {limitOptions.map((option, index) => (
                        <Select.Option key={index}>{option}</Select.Option>
                    ))}
                </Select>
            </Flex >
        </Flex>

    )
}

export default FilterTable
