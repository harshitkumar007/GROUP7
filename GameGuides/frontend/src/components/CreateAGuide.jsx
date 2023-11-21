import { Backdrop, Box, Button, CircularProgress, Typography } from "@mui/material";
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

function CreateAGuide() {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address: from } = useAccount();
  const to = GGtok_meta;
  const [isSuccess, setisSuccess] = useState(false);
  const [content, setContent] = useState("");
  const [ipfsUrl, setipfsUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgURL, setimgURL] = useState("");
  const [tokenURI, settokenURI] = useState("");
  const [loading, setloading] = useState(false);
  // const { config, error, isLoading } = usePrepareContractWrite({
  //   address: ggToke,
  //   abi: abi_ggToke,
  //   functionName: "mint",
  //   args: [10000, tokenURI],
  // });

  // const { write,isSuccess } = useContractWrite(config);

  async function sendMetaTx() {
    const url =
      "https://api.defender.openzeppelin.com/autotasks/5724b66e-3552-43d0-926c-e8ffd4b56387/runs/webhook/9861c9d6-0de2-43f5-8dd8-5b826dbd57cf/ECmcDZgN6WUSBppvC6eJuo";
    const forwarder = new ethers.Contract(
      MinimalForwarder,
      abi_MinimalForwarder,
      provider
    );
    const ggTok = new ethers.Contract(GGtok_meta, abi_GGtok_meta, provider);
    const data = ggTok.interface.encodeFunctionData("mint", [10000, tokenURI]);
    const request = await signMetaTxRequest(signer.provider, forwarder, {
      to,
      from,
      data,
    });
    console.log(request);
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    }).then((txn) => {
      console.log(txn);
      setisSuccess(true);
    });
  }

  async function uploadJSON() {
    let JSON_OBJ = {
      name: `${name}`,
      description: `${description}`,
      external_url: `${ipfsUrl}`,
      image: `${imgURL}`,
    };
    const jsn = JSON.stringify(JSON_OBJ);
    const jsnBlob = new Blob([jsn]);
    const jsnFile = new File([jsnBlob], { type: "application/json" });
    const df = new FormData();
    df.append("file", jsnFile);
    const url = "https://api-eu1.tatum.io/v3/ipfs";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    setloading(true);
    await axios.post(url, df, config).then((response) => {
      setloading(false);
      settokenURI(`ipfs://${response.data.ipfsHash}`);
      console.log(response.data.ipfsHash);
    });
  }

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
      setloading(false);
      console.log(df);
      setipfsUrl(`ipfs://${response.data.ipfsHash}`);
      console.log(response.data.ipfsHash);
    });
  }

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress></CircularProgress>
      </Backdrop>
      {isSuccess ? (
        <div>Your token has been minted</div>
      ) : ipfsUrl ? (
        <>
          <Box>
            <h6>Your IPFS url is:</h6>
            <a href={ipfsUrl}>{ipfsUrl}</a>
            <Details
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              imgURL={imgURL}
              setimgURL={setimgURL}
            ></Details>
            {tokenURI ? (
              <Button onClick={sendMetaTx}>Mint</Button>
            ) : (
              <Button variant="contained" onClick={uploadJSON}>
                Upload
              </Button>
            )}
          </Box>
          {/* <Button variant="outlined" href="/details">
            Proceed
          </Button> */}
        </>
      ) : (
        <>
          <TipTap content={content} setContent={setContent}></TipTap>
          <Typography sx={{justifyContent:"center" ,pt:"50px"}} display='flex'>
          <Button variant="outlined" onClick={uploadGuide}>
            Upload
          </Button>
          </Typography>
          
        </>
      )}
    </div>
  );
}

export default CreateAGuide;
