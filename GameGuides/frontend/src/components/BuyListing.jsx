import React from "react";
import { useContractWrite } from "wagmi";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Tooltip,
  IconButton,
  Grid,
  Input,
  TextField,
} from "@mui/material";

function BuyListing({ ListingId, Amount, Price_each }) {
  return (
    <Box>
      <Typography>Enter the amount</Typography>
      <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
    </Box>
  );
}

export default BuyListing;
