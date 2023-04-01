import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Box>
      <Typography variant="h1">Page not found</Typography>
      <Link to={"/"}>Go back home</Link>
    </Box>
  );
};

export default PageNotFound;
