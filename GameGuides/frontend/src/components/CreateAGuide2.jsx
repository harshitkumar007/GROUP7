import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import TipTap from "./Tiptap";
import axios from "axios";
import Details from "./Details";
import { ethers } from "ethers";
import {
  MinimalForwarder,
  abi_MinimalForwarder,
  GGtok_meta,
  abi_GGtok_meta,
} from "../new_deployments";
import { useProvider, useSigner, useAccount } from "wagmi";
import { signMetaTxRequest } from "../signMetaTxnRequest";
import GenerateImg from "./GenerateImg";

function CreateAGuide2() {
  const [content, setContent] = useState("");
  const [ipfsUrl, setipfsUrl] = useState("");
  const [loading, setloading] = useState("");
  async function uploadGuide() {
    let df = new FormData();
    const content_blob = new Blob([content], { type: "text/plain" });
    const content_file = new File([content_blob], "files");
    df.append("file", content_file);
    const url = "https://api-eu1.tatum.io/v3/ipfs";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    setloading(true);
    await axios.post(url, df, config).then((response) => {
      setipfsUrl(`ipfs://${response.data.ipfsHash}`);
      setloading(false);
    });
  }
  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress></CircularProgress>
      </Backdrop>
    );
  }
  if (ipfsUrl) {
    return <GenerateImg ipfsUrl={ipfsUrl}></GenerateImg>;
  }
  return (
    <Box>
      <TipTap content={content} setContent={setContent}></TipTap>
      <Typography sx={{ justifyContent: "center", pt: "50px" }} display="flex">
        <Button variant="outlined" onClick={uploadGuide}>
          Upload
        </Button>
      </Typography>
    </Box>
  );
}

export default CreateAGuide2;
