import * as React from 'react';
import { Fragment, useCallback } from 'react';
import {
    Count,
    DatagridConfigurable,
    ExportButton,
    List,
    SearchInput,
    SelectColumnsButton,
    TextField,
    TopToolbar,
    useListContext,
    CreateButton,
    ReferenceArrayField,
    SingleFieldList,
    ChipField
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

const ProductList = () => (
    <List
        filterDefaultValues={{ category: 'hall' }}
        sort={{ field: 'id', order: 'ASC' }}
        perPage={25}
        filters={productFilters}
        actions={<ListActions />}
    >
        <TabbedDatagrid />
    </List>
);

const productFilters = [
    <SearchInput key="search" source="q" alwaysOn />,
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
                        <TextField source="name" />
                        <TextField source="uom" />
                        <TextField source="category" />
                        <ReferenceArrayField source="available_suppliers" reference="suppliers">
                            <SingleFieldList>
                                <ChipField source="name" />
                            </SingleFieldList>
                        </ReferenceArrayField>
                        <TextField source="monday_required" />
                        <TextField source="tuesday_required" />
                        <TextField source="wednesday_required" />
                        <TextField source="thursday_required" />
                        <TextField source="friday_required" />
                        <TextField source="saturday_required" />
                        <TextField source="sunday_required" />
                    </DatagridConfigurable>
                </>
            )}
        </Fragment>
    );
};

export default ProductList;