import { useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { LabelsEnum } from 'models/client';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(label: string, selectedLabels: readonly string[]) {
  return {
    fontWeight: selectedLabels.indexOf(label) === -1 ? 'normal' : 'bold',
  };
}

export default function MultipleSelectChip() {
  const [selectedLabels, setSelectedLabels] = useState<LabelsEnum[]>([
    LabelsEnum.WIP,
  ]);

  const handleChange = (event: SelectChangeEvent<typeof selectedLabels>) => {
    const {
      target: { value },
    } = event;
    if (typeof value !== 'string') {
      setSelectedLabels(value);
    }
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-multiple-chip-label">Labels</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={selectedLabels}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.5,
            }}
          >
            {selected.map((value) => (
              <Chip
                size="small"
                variant="outlined"
                sx={{ borderColor: 'secondary.main' }}
                key={value}
                label={value}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {Object.keys(LabelsEnum).map((label) => (
          <MenuItem
            key={label}
            value={LabelsEnum[label]}
            style={getStyles(label, selectedLabels)}
            sx={{ fontSize: '12px' }}
          >
            {LabelsEnum[label]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
