import * as React from 'react';
import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {Chip} from "@mui/material";
import {useEffect} from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

export default function CheckboxesTags({categoriesList, setCategories, actualCategories}) {
    const CustomField = styled(TextField)({
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'yellow',
            },
        },
    });
    useEffect(()=>{},[actualCategories])
    return (
        <Autocomplete
            onChange={(e, getTagProps) => {
                setCategories(getTagProps)
            }}
            multiple
            id="tags-filled"
            options={categoriesList}
            defaultValue={actualCategories}
            freeSolo
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({index})} />
                ))

            }
            renderInput={(params) => (
                <CustomField
                    {...params}
                    label="Catégories*"
                    placeholder="Ecrire une catégorie..."
                />
            )}
        />
    );
}
