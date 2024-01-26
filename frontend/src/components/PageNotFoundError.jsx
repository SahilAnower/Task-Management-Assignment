import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function PageNotFoundError() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <iframe
          src="https://giphy.com/embed/OZeWzZalgU5XNyHAqh"
          width="200"
          height="200"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
          borderRadius="5"
        ></iframe>
        <Typography variant="h5" color="textSecondary" mt={2}>
          Oops! Page Not Found : 404
        </Typography>
      </Box>
    </Container>
  );
}

export default PageNotFoundError;
