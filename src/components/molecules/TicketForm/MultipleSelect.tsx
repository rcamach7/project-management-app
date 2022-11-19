import { LabelsEnum } from 'models/client';
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Chip,
} from '@mui/material';

interface Props {
  selectedLabels: LabelsEnum[];
  handleChange: (event: SelectChangeEvent<LabelsEnum[]>) => void;
}

export default function MultipleSelectChip({
  selectedLabels,
  handleChange,
}: Props) {
  return (
    <FormControl sx={{ width: '100%', mb: 2 }}>
      <InputLabel id="select-labels">Labels</InputLabel>
      <Select
        labelId="select-labels"
        id="select-labels"
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
