import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useState } from "react";

function TodoItem({ todo, fetchDetailsOfCurrentTodo }) {
  const [loadingDetails, setLoadingDetails] = useState(false);
  const handleFetchDetails = async () => {
    setLoadingDetails(true); // Start loading
    await fetchDetailsOfCurrentTodo(todo?.id);
    setLoadingDetails(false); // Stop loading
  };
  return (
    <Card
      sx={{
        maxWidth: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h5" color={"textSecondary"}>
          {todo?.todo}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            opacity: "0.75",
            "&:hover": {
              backgroundColor: "#000",
              color: "#fff",
              opacity: "1",
            },
          }}
          onClick={handleFetchDetails}
          disabled={loadingDetails}
        >
          {loadingDetails ? "Loading..." : "Details"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default TodoItem;
