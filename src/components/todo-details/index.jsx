import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

function TodoDetails({
  todoDetails,
  setTodoDetails,
  openDialog,
  setOpenDialog,
}) {
  const handleClose = () => {
    setTodoDetails(null);
    setOpenDialog(false);
  };

  // console.log(openDialog)
  return (
    <Fragment>
      <Dialog onClose={handleClose} open={openDialog}>
        <DialogTitle>
          Hello, {todoDetails?.todo || "No details available"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default TodoDetails;
