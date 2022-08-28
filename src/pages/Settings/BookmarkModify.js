import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material/";
import { useSnackbar } from "notistack";
import {
  Edit as EditIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  FileUpload as FileUploadIcon,
  FileDownload as FileDownloadIcon,
} from "@mui/icons-material";
import { BookmarkDialog } from "../../components/Settings/BookmarkDialog";
import { ImportExportDialog } from "../../components/BookmarkDialog/ImportExportDialog";

export const BookmarkModify = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [bookmarkDialogMode, setBookmarkDialogMode] = useState(null);
  const [imExportMode, setImExportMode] = useState(null);

  const handleClearBtnOnClick = (i) => {
    const action = (snackbarId) => (
      <>
        <IconButton
          className="deleteBtn"
          onClick={() => {
            localStorage.removeItem("bookmark");
            localStorage.removeItem("user");
            closeSnackbar(snackbarId);
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => {
            closeSnackbar(snackbarId);
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </>
    );

    enqueueSnackbar("確定刪除書籤 ?", {
      variant: "warning",
      autoHideDuration: 5000,
      action,
    });
  };

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setBookmarkDialogMode("category")}>
            <ListItemAvatar>
              <Avatar>
                <EditIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="新增, 編輯或刪除" />
          </ListItemButton>
        </ListItem>
        {!process.env.NODE_ENV ||
          (process.env.NODE_ENV === "development" && (
            <>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={() => setImExportMode("import")}>
                  <ListItemAvatar>
                    <Avatar>
                      <FileUploadIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="匯入書籤" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setImExportMode("export")}>
                  <ListItemAvatar>
                    <Avatar>
                      <FileDownloadIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="匯出書籤" />
                </ListItemButton>
              </ListItem>
            </>
          ))}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleClearBtnOnClick}>
            <ListItemAvatar>
              <Avatar>
                <DeleteIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="刪除書籤" secondary="請謹慎使用" />
          </ListItemButton>
        </ListItem>
      </List>
      <BookmarkDialog
        bookmarkDialogMode={bookmarkDialogMode}
        setBookmarkDialogMode={setBookmarkDialogMode}
      />
      <ImportExportDialog
        imExportMode={imExportMode}
        setImExportMode={setImExportMode}
      />
    </>
  );
};
