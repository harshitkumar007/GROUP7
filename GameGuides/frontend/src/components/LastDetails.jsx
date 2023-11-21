import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  IconButton,
  Table,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { signMetaTxRequest } from "../signMetaTxnRequest";
import { ethers } from "ethers";
import {
  MinimalForwarder,
  abi_MinimalForwarder,
  GGtok_meta,
  abi_GGtok_meta,
} from "../new_deployments";
import { useProvider, useSigner, useAccount } from "wagmi";



function LastDetails({ ipfsUrl, imgUrl }) {
    const provider = useProvider();
  const { data: signer } = useSigner();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setloading] = useState("");
  const [tokenURI, settokenURI] = useState("");
  const[isSuccess,setisSuccess]=useState(false);
  const { address: from } = useAccount();
  const to = GGtok_meta;
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
      image: `${imgUrl}`,
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

  if(isSuccess){
    <Typography variant='h4' justifyContent="center" display="flex" mt="15%">
    Your Token Has been Generated!
    </Typography>
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
  if(tokenURI){
   
  }
  return (
    <>


    {
        tokenURI ? (
            <Typography display="flex" justifyContent="center" mt="300px"> 
            <Button variant="contained" color="secondary" onClick={sendMetaTx}>
                Mint
            </Button>
            </Typography>

        ):(
            <Box display="flex" justifyContent="center" mt ="150px">
            <form onSubmit={uploadJSON}>
              <Table>
                <tr>
                  <td>
                    <TextField
                      label="Name"
                      placeholder="Token Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    ></TextField>
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextField
                      label="Description"
                      placeholder="Enter Description"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></TextField>
                  </td>
                </tr>
              </Table>
              <Typography display="flex" justifyContent="center" pt="15px">
                <Button type="submit">Submit</Button>
              </Typography>
            </form>
          </Box>
        )
    }
   </>
  );
}

export default LastDetails;
