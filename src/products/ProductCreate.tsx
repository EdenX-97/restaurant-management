import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    ReferenceInput,
    useTranslate
} from 'react-admin';
import { Box, Typography } from '@mui/material';

export const validateForm = (
    values: Record<string, any>
): Record<string, any> => {
    const errors = {} as any;
    if (!values.name) {
        errors.name = 'ra.validation.required';
    }
    if (!values.category) {
        errors.category = 'ra.validation.required';
    }
    if (!values.uom) {
        errors.uom = 'ra.validation.required';
    }
    if (!values.current_supplier_id) {
        errors.current_supplier_id = 'ra.validation.required';
    }
    return errors;
};

const ProductCreate = () => (
    <Create>
        <SimpleForm
            sx={{ maxWidth: 500 }}
            defaultValues={{
                name: '',
                uom: 'each',
                category: 'hall',
                current_supplier_id: 1,
            }}
            validate={validateForm}
        >
            <SectionTitle label="Infos" />
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
        </SimpleForm>
    </Create>
);

const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label as string)}
        </Typography>
    );
};

export default ProductCreate;