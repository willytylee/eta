import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material/";
import { dataSet } from "../data/DataSet";

export const SimpleDialog = ({ onClose, open }) => {
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>請選擇用戶:</DialogTitle>
      <List sx={{ pt: 0 }}>
        {dataSet
          .filter((e) => e.display)
          .map((e, i) => (
            <ListItem
              button
              onClick={() => handleListItemClick(e.user)}
              key={i}
            >
              <ListItemText primary={e.name} />
            </ListItem>
          ))}
      </List>
    </Dialog>
  );
};
