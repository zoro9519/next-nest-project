import React from "react";

import { css } from "@emotion/core";
import { Button, Dropdown, Input, Modal } from "semantic-ui-react";

import { CategoryType } from "./TaskList";

import { useAddTaskModal } from "@/hooks/useAddTaskModal";

export const AddTaskModal = React.memo<{
  open: boolean;
  setOpen: (open: boolean) => void;
  refetchTasks: () => Promise<unknown>;
  categories: CategoryType[];
}>(({ open, setOpen, refetchTasks, categories }) => {
  const { title, categoryIds, dispatch, handleAddTask } = useAddTaskModal({ setOpen, refetchTasks });

  const categoryOptions = React.useMemo(() => categories.map(({ id, name }) => ({ value: id, text: name })), [
    categories,
  ]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Modal.Header>新規作成</Modal.Header>
      <Modal.Content>
        <div>
          <div>タイトル</div>
          <Input
            value={title}
            onChange={(e, d) => dispatch({ type: "setTitle", payload: d.value })}
            css={css`
              &&& {
                margin-top: 4px;
                width: 100%;
              }
            `}
          />
        </div>
        <div
          css={css`
            margin-top: 8px;
          `}
        >
          <div>カテゴリ</div>
          <Dropdown
            options={categoryOptions}
            search
            selection
            fluid
            multiple
            value={categoryIds}
            onChange={(e, d) => dispatch({ type: "setCategoryIds", payload: d.value as string[] })}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button content="作成" color="blue" disabled={!title} onClick={handleAddTask} />
        <Button content="キャンセル" onClick={() => setOpen(false)} />
      </Modal.Actions>
    </Modal>
  );
});
