import { Box, Card, CardHeader, CardContent, Typography } from '@mui/material';
import {
    EditButton,
    TextField,
    useTranslate,
    useListContext,
    RecordContextProvider,
    ReferenceField
} from 'react-admin';

import { Product } from '../types';

const MobileGrid = () => {
    const { data, isLoading } = useListContext<Product>();
    const translate = useTranslate();
    if (isLoading || data.length === 0) {
        return null;
    }
    return (
        <Box margin="0.5em">
            {data.map(record => (
                <RecordContextProvider key={record.id} value={record}>
                    <Card sx={{ margin: '0.5rem 0' }}>
                        <CardHeader
                            title={
                                <TextField source="name" variant="body1" />
                            }
                            titleTypographyProps={{ variant: 'body1' }}
                            action={<EditButton />}
                        />
                        <CardContent sx={{ pt: 0 }}>
                            <Typography variant="body2" gutterBottom>
                                {translate(
                                    'UOM'
                                )}
                                :&nbsp;
                                <TextField source="uom" showTime />
                            </Typography>

                            <Typography variant="body2" gutterBottom>
                                {translate(
                                    'Current Supplier'
                                )}
                                :&nbsp;
                                <ReferenceField source="current_supplier_id" reference="suppliers">
                                    <TextField source="name" />
                                </ReferenceField>
                            </Typography>
                        </CardContent>
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

MobileGrid.defaultProps = {
    data: {},
    ids: [],
};

export default MobileGrid;