import {
  Alert,
  Snackbar,
  SnackbarCloseReason,
  SnackbarProps,
} from "@mui/material";
import { SyntheticEvent } from "react";

type GenNotificationProps = SnackbarProps & {
  lang?: string;
  vertical?: "bottom" | "top";
  horizontal?: "left" | "right" | "center";
  loading?: boolean | string;
  error?: boolean | string;
  success?: boolean | string;
  info?: boolean | string;
  autoHideDuration?: number;
};

export default function GenNotification({
  lang = "en",
  vertical = "bottom",
  horizontal = "left",
  autoHideDuration = 10000,
  loading,
  error,
  success,
  info,
  ...rest
}: GenNotificationProps) {
  return (
    <Snackbar
      open={Boolean(loading || error || success)}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical, horizontal }}
      {...rest}
    >
      {loading ? (
        <Alert severity={"info"} sx={{ width: "100%" }}>
          {typeof loading === "string" ? (loading as string) : ("Loading...")}
        </Alert>
      ) : error ? (
        <Alert severity={"error"} sx={{ width: "100%" }}>
          {typeof error === "string" ? (error as string) : ("Unknown Error")}
        </Alert>
      ) : success ? (
        <Alert severity={"success"} sx={{ width: "100%" }}>
          {typeof success === "string" ? (success as string) : ("Succeed")}
        </Alert>
      ) : info ? (
        <Alert severity={"info"} sx={{ width: "100%" }}>
          {typeof info === "string"
            ? (info as string)
            : ("Unknown Information")}
        </Alert>
      ) : (
        <div></div>
      )}
    </Snackbar>
  );
}
