import React, { useState } from 'react';

import DownloadIcon from '@mui/icons-material/Download';
import { Fragment, useCallback } from 'react';
import {
    Count,
    DatagridConfigurable,
    TextInput,
    SelectColumnsButton,
    TextField,
    TopToolbar,
    useListContext,
    ReferenceField,
    CreateButton,
    Button,
    InfiniteList
} from 'react-admin';
import domToImage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { useMediaQuery, Divider, Tabs, Tab, Theme, Box, Card, Table, TableBody, TableRow, TableCell } from '@mui/material';


import MobileGrid from './MobileGrid';

const ListActions = () => {
    const [downloading, setDownloading] = useState(false);

    const handleDownload = () => {
        setDownloading(true);

        const listElement = document.getElementById('main-content')

        if (listElement) {
            const actionsElement = listElement.getElementsByClassName('RaList-actions')[0];
            const tabsElement = listElement.getElementsByClassName('MuiTabs-root')[0];
            actionsElement.remove();
            tabsElement.remove();

            domToImage.toBlob(listElement).then((blob: Blob) => {
                if (blob) {
                    saveAs(blob, 'purchases.png');
                    setDownloading(false);
                }
                window.location.reload();
            });
        } else {
            console.error("List element not found.");
            setDownloading(false);
        }
    };

    return (
        <TopToolbar>
            <CreateButton />
            <SelectColumnsButton />
            <Button
                label="Download"
                onClick={handleDownload}
                disabled={downloading}
            >
                <DownloadIcon/>
            </Button>
        </TopToolbar>
    );
};

const ContactSidebar = () => {
    const contactInfo = {
        deliverTo: 'Kyo Sushi Bar (205746)',
        deliverDate: '10/10',
        contactName: 'Ken',
        contactNumber: '0411111111',
    };

    return (
        <Box
            sx={{
                display: {
                    xs: 'none',
                    sm: 'block'
                },
                order: -1, // display on the left rather than on the right of the list
                width: '15em',
                marginRight: '1em',
            }}
        >
            <Card>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{paddingTop: 0}}>
                                <h3>Deliver to:</h3>
                                <p style={{ margin: 0 }}>{contactInfo.deliverTo}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{paddingTop: 0}}>
                                <h3>Deliver date:</h3>
                                <p style={{ margin: 0 }}>{contactInfo.deliverDate}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{paddingTop: 0}}>
                                <h3>Contact name:</h3>
                                <p style={{ margin: 0 }}>{contactInfo.contactName}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{paddingTop: 0}}>
                                <h3>Contact number:</h3>
                                <p style={{ margin: 0 }}>{contactInfo.contactNumber}</p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </Box>
    )
};

const PurchaseList = () => {
    return (
        <div>
            <InfiniteList
                aside={<ContactSidebar />}
                filterDefaultValues={{ supplier_name: 'JFC' }}
                sort={{ field: 'id', order: 'ASC' }}
                filters={purchaseFilters}
                actions={<ListActions />}
                sx={{
                    marginTop: '0.5em'
                }}
            >
                <TabbedDatagrid />
            </InfiniteList>
        </div>
    )
};

const purchaseFilters = [
    <TextInput key="search" source="q" alwaysOn />,
];

const tabs = [
    { id: 'JFC', name: 'JFC' },
    { id: 'JFCC', name: 'JFCC' },
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
                    { ...filterValues, supplier_name: value },
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
                value={filterValues.supplier_name}
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
                                        supplier_name: choice.name,
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
                        omit={['id', 'supplier_name']}
                    >
                        <TextField source="id" />
                        <TextField label="Amount" source="order_amount" />
                        <TextField source="uom" />
                        <TextField source="supplier_name" />
                        <ReferenceField label="Name" source="stock_id" reference="stocks">
                            <TextField source="stock_name" />
                        </ReferenceField>
                        <TextField source="item_id" />
                        <TextField source="memo" />    
                    </DatagridConfigurable>
                </>
            )}
        </Fragment>
    );
};

export default PurchaseList;