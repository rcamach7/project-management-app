import { useState } from 'react';
import { Board, FormStatus } from 'models/client';
import { CenteredBox } from '@/components/layout/index';
import { ActionButton, ConfirmDeleteDialog } from '@/components/atoms/index';
import { BoardForm } from '@/components/molecules/index';

interface Props {
  activeBoard: string;
  activeBoardData: Board;
  handleDeleteBoard: (boardId: string) => void;
  handleBoardFormAction: (
    action: FormStatus['action'],
    title: string,
    description: string,
    boardId?: string
  ) => void;
}

export default function TabButtons({
  activeBoardData,
  activeBoard,
  handleDeleteBoard,
  handleBoardFormAction,
}: Props) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    show: false,
    action: 'CREATE',
  });

  return (
    <>
      <CenteredBox
        sx={{
          borderRadius: '0 0 5px 5px',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          pt: 1,
          gap: { xs: 1, sm: 2 },
        }}
      >
        <ActionButton
          text="Create New Board"
          variant="text"
          size="small"
          sx={{
            fontSize: { xs: '.7em', sm: '.9em', md: '1em' },
            color: 'secondary.main',
            p: '2px 4px',
          }}
          onClick={() => setFormStatus({ show: true, action: 'CREATE' })}
        />
        {activeBoard && (
          <>
            <ActionButton
              text="Edit Current Board"
              variant="text"
              size="small"
              sx={{
                fontSize: { xs: '.7em', sm: '.9em', md: '1em' },
                color: 'secondary.main',
                p: '2px 4px',
              }}
              onClick={() => setFormStatus({ show: true, action: 'EDIT' })}
            />
            <ActionButton
              text="Delete Current Board"
              variant="text"
              size="small"
              sx={{
                fontSize: { xs: '.7em', sm: '.9em', md: '1em' },
                color: 'red',
                p: '2px 4px',
              }}
              onClick={() => setShowDeleteConfirmation(true)}
            />
          </>
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
      {formStatus.show && (
        <BoardForm
          action={formStatus.action}
          handleClose={() => setFormStatus({ show: false, action: 'CREATE' })}
          title={activeBoardData?.title}
          description={activeBoardData?.description}
          boardId={activeBoardData?._id}
          handleBoardFormAction={handleBoardFormAction}
        />
      )}
    </>
  );
}
