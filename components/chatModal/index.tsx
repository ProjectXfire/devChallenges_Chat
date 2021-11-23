import React from "react";
// Providers
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// Styles
import { SChatModal } from "@styles/components/chat";
import { SButton } from "@styles/shared/button";
import { colors } from "@styles/variables/colors";
import { SErrorMessage } from "@styles/shared/errorMessage";

type ChatModalProps = {
  modalActive?: boolean;
  hideChatChannel?: () => void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  newChannel: (data: any, e: any) => void;
  errors: any;
  errorOnRequest: string;
};

export const ChatModal = ({
  modalActive,
  hideChatChannel,
  handleSubmit,
  setValue,
  newChannel,
  errors,
  errorOnRequest,
}: ChatModalProps) => {
  return (
    <SChatModal modalActive={modalActive} onSubmit={handleSubmit(newChannel)}>
      <h3>NEW CHANNEL</h3>
      <input
        type="text"
        placeholder="Channel name"
        onChange={(e) => setValue("name", e.target.value)}
      />
      <ErrorMessage
        errors={errors}
        name="name"
        render={({ message }) => <SErrorMessage>{message}</SErrorMessage>}
      />
      <textarea
        rows={4}
        placeholder="Channel description"
        onChange={(e) => setValue("description", e.target.value)}
      ></textarea>
      <ErrorMessage
        errors={errors}
        name="description"
        render={({ message }) => <SErrorMessage>{message}</SErrorMessage>}
      />
      <span>{errorOnRequest}</span>
      <div>
        <SButton
          type="button"
          color={colors.lightWhite}
          bkgColor={colors.lightBlack}
          width="80px"
          size="sm"
          onClick={hideChatChannel}
        >
          Cancel
        </SButton>
        <SButton
          type="submit"
          color={colors.lightWhite}
          bkgColor={colors.blue}
          width="80px"
          size="sm"
        >
          Save
        </SButton>
      </div>
    </SChatModal>
  );
};
