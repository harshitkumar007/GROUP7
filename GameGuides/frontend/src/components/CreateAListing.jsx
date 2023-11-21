import React, { useState } from "react";
import axios from "axios";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { ggMarket, abi_ggMarket } from "./Contract_addr";
import {
  Box,
  Button,
  Input,
  Backdrop,
  CircularProgress,
  Table,
  TextField,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
function CreateAListing() {
  const [tokenid, settokenid] = useState("");
  const [amount, setamount] = useState("");
  const [priceEach, setPriceEach] = useState("");
  const [tokenAddress, settokenAddress] = useState("");
  const { config } = usePrepareContractWrite({
    address: ggMarket,
    abi: abi_ggMarket,
    functionName: "createListing",
    args: [tokenAddress, amount, priceEach, tokenid],
  });
  const { isSuccess, writeAsync, isLoading } = useContractWrite(config);

  if (isLoading) {
    return (
      <Backdrop
        open={true}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit"></CircularProgress>
      </Backdrop>
    );
  }
  return (
    <>
      {isSuccess ? (
        <Typography variant="h6" display="flext" justifyContent="center">
          Your listing has been created!
        </Typography>
      ) : (
        <Box display="flex" justifyContent="center" pt="50px">
        <form>
          <Table>
            <tr>
              <td>
                <TextField
                  size="small"
                  label="Token Address"
                  placeholder="Contract Address"
                  onChange={(e) => {
                    settokenAddress(e.target.value);
                  }}
                ></TextField>
              </td>
            </tr>
            <tr>
              <td>
                <TextField
                  size="small"
                  label="Id"
                  placeholder="Token's Id"
                  onChange={(e) => {
                    settokenid(parseInt(e.target.value));
                  }}
                ></TextField>
              </td>
            </tr>
            <tr>
              <td>
                <TextField
                  label="Amount"
                  placeholder="No of Tokens to sell"
                  size="small"
                  onChange={(e) => {
                    setamount(parseInt(e.target.value));
                  }}
                ></TextField>
              </td>
            </tr>
            <tr>
              <td>
                <TextField
                  size="small"
                  label="Price"
                  placeholder="Price for each of your tokens"
                  onChange={(e) => {
                    setPriceEach(ethers.utils.parseEther(e.target.value));
                  }}
                ></TextField>
              </td>
            </tr>
          </Table>
          <Typography display="flex" justifyContent="center">
          <Button onClick={writeAsync}>List</Button>

          </Typography>
          </form>
        </Box>
      )}
    </>
  );
}

export default CreateAListing;
