import * as React from 'react';
import { Fragment, useCallback } from 'react';
import {
    Count,
    DatagridConfigurable,
    ExportButton,
    List,
    // SearchInput,
    TextInput,
    SelectColumnsButton,
    TextField,
    TopToolbar,
    useListContext,
    ReferenceField,
    CreateButton,
    DateField
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@mui/material';

import MobileGrid from './MobileGrid';

const ListActions = () => (
    <TopToolbar>
        <CreateButton />
        <SelectColumnsButton />
        <ExportButton />
    </TopToolbar>
);

const StockList = () => (
    <List
        filterDefaultValues={{ category: 'hall' }}
        sort={{ field: 'id', order: 'ASC' }}
        perPage={25}
        filters={stockFilters}
        actions={<ListActions />}
    >
        <TabbedDatagrid />
    </List>
);

const stockFilters = [
    <TextInput key="search" source="q" alwaysOn />,
];

const tabs = [
    { id: 'hall', name: 'hall' },
    { id: 'kitchen', name: 'kitchen' },
    { id: 'sushibar', name: 'sushibar' },
];

const TabbedDatagrid = () => {
    const listContext = useListContext();
    const { filterValues, setFilters, displayedFilters } = listContext;
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );

    const handleChange = useCallback(
        (event: React.ChangeEvent<{}>, value: any) => {
            setFilters &&
                setFilters(
                    { ...filterValues, category: value },
                    displayedFilters,
                    false
                );
        },
        [displayedFilters, filterValues, setFilters]
    );

    return (
        <Fragment>
            <Tabs
                variant="fullWidth"
                centered
                value={filterValues.category}
                indicatorColor="primary"
                onChange={handleChange}
            >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={
                            <span>
                                {choice.name} (
                                <Count
                                    filter={{
                                        ...filterValues,
                                        category: choice.name,
                                    }}
                                    sx={{ lineHeight: 'inherit' }}
                                />
                                )
                            </span>
                        }
                        value={choice.id}
                    />
                ))}
            </Tabs>
            <Divider />
            {isXSmall ? (
                <MobileGrid />
            ) : (
                <>
                    <DatagridConfigurable
                        rowClick="edit"
                        omit={['id', 'category']}
                    >
                        <TextField source="id" />
                        <ReferenceField label="Product Name" source="product_id" reference="products">
                            <TextField source="name" />
                        </ReferenceField>
                        <TextField source="category" />
                        <TextField source="uom" />
                        <ReferenceField label="Current Supplier" source="supplier_id" reference="suppliers">
                            <TextField source="name" />
                        </ReferenceField>
                        <TextField source="item_id" />
                        <TextField source="memo" />
                        <TextField source="quantity" />
                        <DateField source="last_updated" />                
                    </DatagridConfigurable>
                </>
            )}
        </Fragment>
    );
};

export default StockList;