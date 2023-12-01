import { ButtonGroup, TextField, TextFieldProps } from "@mui/material";
import {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from "react";
import { BsFillClipboardCheckFill, BsFillClipboardFill } from "react-icons/bs";
import GenBox from "../GenBox/GenBox";
import GenIconButton from "../GenIconButton/GenIconButton";

type GenQueryTextBoxProps = TextFieldProps & {
  children?: ReactNode;
  onChange?: (value: any) => void;
  onKeyDown?: (event: ReactKeyboardEvent) => void;
  onCopy?: (event: ReactMouseEvent) => void;
  copySuccess?: boolean;
  textValue?: string;
  fontStyle?: any;
};

export default function GenQueryTextBox({
  sx,
  children,
  onChange,
  onKeyDown,
  onCopy,
  copySuccess,
  textValue,
  fontStyle,
  ...rest
}: GenQueryTextBoxProps) {
  return (
    <GenBox
      sx={{
        position: "relative",
        marginBottom: { xs: "1rem", md: 0 },
        ...sx,
      }}
    >
      <TextField
        value={textValue}
        onChange={onChange}
        minRows={4}
        fullWidth
        multiline
        onKeyDown={onKeyDown}
        sx={{
          "& textarea": {
            marginTop: "8px",
            ...fontStyle,
          },
        }}
        {...rest}
      />
      {onCopy && (
        <GenIconButton
          onClick={onCopy}
          disabled={!(textValue && textValue.length)}
          sx={{
            position: "absolute",
            right: "0.5rem",
            top: "0.25rem",
            "& svg": { fontSize: "0.9rem" },
          }}
        >
          {copySuccess ? <BsFillClipboardCheckFill /> : <BsFillClipboardFill />}
        </GenIconButton>
      )}
      <ButtonGroup
        variant="outlined"
        sx={{
          position: { xs: "relative", md: "absolute" },
          right: { xs: 0, md: "0.5rem" },
          left: { xs: 0, md: "unset" },
          height: "2rem",
          bottom: { xs: "-1rem", md: "0.5rem" },
          width: { xs: "100%", md: "unset" },
          justifyContent: "center",
          "& button": {
            fontSize: "0.8rem",
            letterSpacing: "-0.6px",
            lineHeight: "0.8rem",
          },
        }}
      >
        {children}
      </ButtonGroup>
    </GenBox>
  );
}
