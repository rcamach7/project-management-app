import { Dispatch, SetStateAction } from 'react';
import { Modal, Typography, Box } from '@mui/material';
import TemplateCard from './TemplateCard';

interface Props {
  setShowTemplateSelection: Dispatch<SetStateAction<boolean>>;
}

const options = [
  {
    title: 'Software Project',
    description: 'Template for a software project.',
    image: '/static/images/cards/contemplative-reptile.jpg',
  },
  {
    title: 'Planning',
    description: 'Template for planning a project.',
    image: '/static/images/cards/contemplative-reptile.jpg',
  },
];

export default function TemplateSelection({ setShowTemplateSelection }: Props) {
  return (
    <Modal
      open={true}
      onClose={() => setShowTemplateSelection((SS) => !SS)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      keepMounted
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(300px, 95%, 640px)',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{ fontSize: '1.5em' }}
          gutterBottom
        >
          Select a template
        </Typography>
        <Box sx={{ display: 'flex' }}>
          {/* {options.map((option) => (
            <TemplateCard
              key={option.title}
              title={option.title}
              description={option.description}
              image={option.image}
            />
          ))} */}
        </Box>
      </Box>
    </Modal>
  );
}
