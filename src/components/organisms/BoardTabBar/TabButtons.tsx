import { useState } from 'react';
import { CenteredBox } from '@/components/layout/index';
import { ActionButton, ConfirmDeleteDialog } from '@/components/atoms/index';

interface Props {
  activeBoard: string;
  handleDeleteBoard: (boardId: string) => void;
}

export default function TabButtons({ activeBoard, handleDeleteBoard }: Props) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <CenteredBox
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          pt: 1,
        }}
      >
        <ActionButton
          text="Create New Board"
          variant="outlined"
          size="small"
          sx={{
            fontSize: { xs: '.7em', sm: '.9em', md: '1em' },
            color: 'secondary.main',
            border: 1,
            borderColor: 'secondary.main',
            p: '2px 4px',
          }}
        />
        {activeBoard && (
          <ActionButton
            text="Delete Board"
            variant="outlined"
            size="small"
            sx={{
              fontSize: { xs: '.7em', sm: '.9em', md: '1em' },
              color: 'secondary.main',
              border: 1,
              borderColor: 'secondary.main',
              p: '2px 4px',
            }}
            onClick={() => setShowDeleteConfirmation(true)}
          />
        )}
      </CenteredBox>
      {showDeleteConfirmation && (
        <ConfirmDeleteDialog
          title={`Are you sure you want to delete this board?`}
          content={`This will delete the board and all of its data will be lost.`}
          open={showDeleteConfirmation}
          asset_id={activeBoard}
          handleClose={() => setShowDeleteConfirmation(false)}
          handleDelete={handleDeleteBoard}
        />
      )}
    </>
  );
}
