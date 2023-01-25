import { Dispatch, SetStateAction } from 'react';
import { Modal, Typography, Box } from '@mui/material';
import TemplateCard from './TemplateCard';
import axios from 'axios';

interface Props {
  setShowTemplateSelection: Dispatch<SetStateAction<boolean>>;
}

const options = [
  {
    title: 'Software Project',
    description: 'Template for a software project.',
    image: '/template_cards/software.svg',
  },
  {
    title: 'Basic',
    description: 'Template for planning a project.',
    image: '/template_cards/planning.svg',
  },
];

export default function TemplateSelection({ setShowTemplateSelection }: Props) {
  const handleTemplateSelection = async (template: string) => {
    const res = await axios.post('/api/workspace/template', { template });
    console.log(res);
  };

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
          sx={{
            fontSize: '1.25em',
            textAlign: 'center',
            mb: 2,
          }}
          gutterBottom
        >
          Select a template
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          {options.map((option) => (
            <TemplateCard
              key={option.title}
              title={option.title}
              description={option.description}
              image={option.image}
              onClick={handleTemplateSelection}
            />
          ))}
        </Box>
      </Box>
    </Modal>
  );
}
