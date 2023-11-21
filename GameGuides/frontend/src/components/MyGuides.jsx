import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  useAccount,
  useContractRead,
  useContract,
  useProvider,
  useSigner,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { abi_ggToke, ggToke, ggMarket } from "./Contract_addr";
import { ethers } from "ethers";
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
  Stack,
  Backdrop,
  CircularProgress
} from "@mui/material";

import { ArrowOutward } from "@mui/icons-material";

function MyGuides() {
  const { address } = useAccount();
  const [nfts, setNfts] = useState("");
  // const {loadingstate,setLoadingstate}=useState('loading');
  const [isApproved, setApproved] = useState("");

  function http_url(ipfs_url) {
    const hash = ipfs_url.slice(7);
    return `https://ipfs.fleek.co/ipfs/${hash}`;
  }

  function nftHandler(items) {
    console.log(items);
    setNfts(items);
  }

  const { config: config1 } = usePrepareContractWrite({
    address: ggToke,
    abi: abi_ggToke,
    functionName: "setApprovalForAll",
    args: [ggMarket, true],
    onSuccess: () => {
      setApproved(true);
    },
  });

  const { writeAsync: Approve } = useContractWrite(config1);

  const { isLoading } = useContractRead({
    address: ggToke,
    abi: abi_ggToke,
    functionName: "myGuides",
    overrides: { from: address },
    onSuccess: async (data) => {
      const items = await Promise.all(
        data.map(async (i) => {
          console.log(i);
          const tokenUri = http_url(i.uri);
          const item = await axios
            .get(tokenUri)
            .then((meta) => {
              console.log(meta);
              let id = parseInt(i.id);
              let imgUrl = http_url(meta.data.image);
              let externalUrl = http_url(meta.data.external_url);
              let item = {
                tokenId: id,
                creator: i.creator,
                image: imgUrl,
                external_url: externalUrl,
                description: meta.data.description,
                name: meta.data.name,
              };
              return item;
            })
            .catch((e) => {
              let item = {
                tokenId: "unkown (invalid uri)",
                creator: "unkown (invalid uri)",
                image:
                  "/home/kalyan_singh/BUIDL2022/Moralis_full_stack/frontend/src/Images/101230258_p0_master1200.jpg",
                external_url: "unknow",
                description: "Unknown",
                name: "Unkown",
              };
              return item;
            });
          return item;
        })
      ).catch((e) => {
        console.log(e);
      });
      nftHandler(items);
    },
  });

  const { isError } = useContractRead({
    address: ggToke,
    abi: abi_ggToke,
    functionName: "isApprovedForAll",
    args: [address, ggMarket],
    onSuccess: async (data) => {
      setApproved(data);
    },
  });

  if (!nfts.length) {
    return (
      <Backdrop
        open={true}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit"></CircularProgress>
      </Backdrop>
    )
  }

  return (
    <>
      <Stack direction="row" spacing="10px" padding="5px">
        {nfts.map((nft) => {
          return (
            <Card sx={{ minWidth: 350}} variant="outlined">
              <CardMedia
                component="img"
                height="350"
                image={nft.image}
                onError="/home/kalyan_singh/BUIDL2022/Moralis_full_stack/frontend/src/Images/101230258_p0_master1200.jpg"
                alt={nft.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {nft.name}
                </Typography>
                <Typography>
                Id:
                  {nft.tokenId}
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
              </CardActions>
            </Card>
          );
        })}
      </Stack>

      {isApproved ? (
        <></>
      ) : (
        <Typography display="flex" justifyContent="center" mt="5px">
        <Button size="small" onClick={Approve}>
          Monetize
        </Button>
        </Typography>
        
      )}
    </>
  );
}

export default MyGuides;
