import {
    Edit,
    TextInput,
    SelectInput,
    SimpleForm,
    ReferenceInput
} from 'react-admin';
import { Typography, Box } from '@mui/material';

import { validateForm } from './ProductCreate';

const ProductEdit = () => {
    return (
        <Edit title="Product Edit">
            <SimpleForm validate={validateForm}>
                <div>
                    <Typography variant="h6" gutterBottom>
                        Infos
                    </Typography>
                    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                            <TextInput source="name" isRequired fullWidth />
                        </Box>
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                            <SelectInput source="category" choices={[
                                { id: 'hall', name: 'Hall' },
                                { id: 'kitchen', name: 'Kitchen' },
                                { id: 'sushibar', name: 'Sushi Bar' },
                            ]} isRequired fullWidth/>
                        </Box>
                    </Box>

                    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                            <TextInput source="uom" isRequired fullWidth />
                        </Box>
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                            <ReferenceInput label="Current Supplier" source="supplier_id" reference="suppliers">
                                <SelectInput optionText="name" source="current_supplier_id" isRequired fullWidth/>
                            </ReferenceInput>
                        </Box>
                    </Box>
                </div>
            </SimpleForm>
        </Edit>
    );
};

export default ProductEdit;