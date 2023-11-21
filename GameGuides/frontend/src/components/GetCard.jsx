import React, { useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useContract,
  useSigner,
} from "wagmi";
import { ggToke, abi_ggToke, ggMarket, abi_ggMarket } from "./Contract_addr";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Tooltip,
  IconButton,
  Typography,
  Button,
  Box,
  Input,
  Backdrop,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { ArrowOutward } from "@mui/icons-material";
import { ethers } from "ethers";

function http_url(ipfs_url) {
  const hash = ipfs_url.slice(7);
  return `https://ipfs.io/ipfs/${hash}`;
}

function GetCard({ TokenId, ListingId, Amount, Price_each }) {
  const [nft, setnft] = useState("");
  const [price, setprice] = useState("");
  const [bamt, setbamt] = useState("");
  const [clicked, setClicked] = useState("");

  const { config } = usePrepareContractWrite({
    address: ggMarket,
    abi: abi_ggMarket,
    functionName: "buyListing",
    args: [ListingId, bamt],
    overrides: {
      value: price,
    },
  });

  const { writeAsync: buy } = useContractWrite(config);

  // const contract=useContract({
  //     address:ggMarket,
  //     abi:abi_ggMarket,
  //     signerOrProvider:Signer
  // })

  // async function buy(){
  //     await contract.buyListing()
  // }

  const { isLoading } = useContractRead({
    address: ggToke,
    abi: abi_ggToke,
    functionName: "uri",
    args: [TokenId],
    onSuccess: async (data) => {
      const tokenUri = http_url(data);
      const meta = await axios.get(tokenUri);
      const item = {
        name: meta.data.name,
        image: http_url(meta.data.image),
        external_url: http_url(meta.data.external_url),
        description: meta.data.description,
      };
      setnft(item);
    },
  });

  return (
    <>
      {nft ? (
        <Stack direction="row" spacing="2">
          <Card sx={{ maxWidth: 350 }} variant="outlined">
            <CardMedia
              component="img"
              height="350"
              image={nft.image}
              alt={nft.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {nft.name}
              </Typography>
              <Typography>
                {TokenId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {nft.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Tooltip title="Read">
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(nft.external_url);
                  }}
                >
                  <ArrowOutward></ArrowOutward>
                </IconButton>
              </Tooltip>
              {clicked ? (
                <Box>
                  {price ? (
                    <Typography>
                      {Math.round(parseInt(price) / 10 ** 18).toFixed(2)}
                    </Typography>
                  ) : (
                    <></>
                  )}
                  <TextField
                    type="number"
                    InputProps={{
                      inputProps: {
                        max: { Amount },
                        min: 1,
                      },
                    }}
                    placeholder="Number of tokens to buy"
                    size="small"
                    onChange={(e) => {
                      let str = (Price_each * e.target.value).toString();
                      setprice(ethers.utils.parseEther(str));
                      setbamt(parseInt(e.target.value));
                    }}
                  ></TextField>
                  <Button size="small" onClick={buy}>
                    Confirm
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      setClicked(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography >Price:{Price_each}</Typography>
                  <Typography>Amount:{Amount}</Typography>
                  <Typography>
                    <Button
                      size="small"
                      onClick={() => {
                        setClicked(true);
                      }}
                    >
                      Buy
                    </Button>
                  </Typography>
                </Box>
              )}
            </CardActions>
          </Card>
        </Stack>
      ) : (
        <Backdrop
          open={true}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit"></CircularProgress>
        </Backdrop>
      )}
    </>
  );
}

export default GetCard;
