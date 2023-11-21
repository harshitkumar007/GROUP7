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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LastDetails from "./LastDetails";

function GenerateImg({ ipfsUrl }) {
  const [src, setsrc] = useState("");
  const [loading, setloading] = useState("");
  const [Prompt, setPrompt] = useState("");
  const[Proceed,setProceed]=useState(false);
  const [imgUrl,setimgUrl]=useState("");

  async function AiImg() {
    const response = await fetch("http://localhost:8080/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        prompt: Prompt,
      }),
    });
    let prediction = await response.json();
    console.log(prediction);
    setloading(true);
    while (
      prediction.status !== "failed" &&
      prediction.status !== "succeeded"
    ) {
      const response = await fetch(
        `http://localhost:8080/api/predictions/${prediction.id}`
      );
      prediction = await response.json();
      if (prediction.status == "succeeded") {
        console.log(prediction);
        setsrc(prediction.output[0]);
        setloading(false);
      }
    }
  }
  async function handleProceed(){
    let img_file = await fetch(src)
        .then((r) => r.blob())
        .then((blob) => new File([blob], { type: "image/png" }));
      let df = new FormData();
      df.append("file", img_file);
      const url = "https://api-eu1.tatum.io/v3/ipfs";
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      setloading(true)
      await axios.post(url, df, config).then((response) => {
        setimgUrl(`ipfs://${response.data.ipfsHash}`);
        setloading(false);
        setProceed(true);
      })
  }

  if(Proceed){
    return (
        <LastDetails ipfsUrl={ipfsUrl} imgUrl={imgUrl}></LastDetails>
    )
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
  if (src) {
    return (
      <>
        <Box justifyContent="center" display="flex" mt="60px">
          <img src={`${src}`} width="350px" height="350px"></img>
        </Box>
        <Typography display="flex" justifyContent="center" mt="10px">
          <ButtonGroup variant="contained" >
            <Button sx={{paddingLeft:"35px",paddingRight:"35px"}} onClick={()=>{setsrc("")}}>Redo</Button>
            <Button onClick={handleProceed}>Proceed</Button>
          </ButtonGroup>
        </Typography>
      </>
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="center" mt="250px">
        <form>
          <Table>
            <tr>
              <td>
                <TextField
                  label="Prompt"
                  placeholder="Enter the prompt"
                  size="small"
                  onChange={(e) => {
                    setPrompt(e.target.value);
                  }}
                ></TextField>
              </td>
            </tr>
          </Table>
        </form>
      </Box>
      <Typography display="flex" justifyContent="center" mt="15px">
        <Button onClick={AiImg}>Generate</Button>
      </Typography>
    </>
  );
}

export default GenerateImg;
