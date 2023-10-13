import {
    // BooleanField,
    TextField,
    EmailField,
    Datagrid,
    // DateInput,
    List,
    // NullableBooleanInput,
    // NumberField,
    // SearchInput,
} from 'react-admin';
// import { useMediaQuery, Theme } from '@mui/material';

// import SegmentsField from './SegmentsField';
// import SegmentInput from './SegmentInput';
// import CustomerLinkField from './CustomerLinkField';
// import ColoredNumberField from './ColoredNumberField';
// import MobileGrid from './MobileGrid';

// const supplierFilters = [
//     <SearchInput source="q" alwaysOn />,
//     <DateInput source="last_seen_gte" />,
//     <NullableBooleanInput source="has_ordered" />,
//     <NullableBooleanInput source="has_newsletter" defaultValue />,
//     <SegmentInput source="groups" />,
// ];

const SupplierList = () => {
    // const isXsmall = useMediaQuery<Theme>(theme =>
    //     theme.breakpoints.down('sm')
    // );
    // const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <List
            // filters={isSmall ? supplierFilters : undefined}
            sort={{ field: 'last_seen', order: 'DESC' }}
            perPage={25}
        >
            {/* {isXsmall ? (
                <MobileGrid />
            ) : ( */}
                <Datagrid
                    optimized
                    rowClick="edit"
                    sx={{
                        '& .column-groups': {
                            md: { display: 'none' },
                            lg: { display: 'table-cell' },
                        },
                    }}
                >
                    <TextField source="name" />
                    <TextField source="phone" />
                    <EmailField source="email" />
                    <TextField source="tel" />
                    <TextField source="fax" />
                    <TextField source="delivery_date" />
                    <TextField source="delivery_due_time" />
                </Datagrid>
            {/* )} */}
        </List>
    );
};

export default SupplierList;