import { Box, Button, TextField, Typography ,Backdrop,CircularProgress} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import Rest_of_comp from "./Rest_of_comp";
import axios from "axios";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Details({
  name,
  setName,
  description,
  setDescription,
  imgURL,
  setimgURL,
  ipfsUrl,
}) {
  const [Prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("");
  const [src, setsrc] = useState();
  // const [isTick, setTick] = useState(false);

  useEffect(() => {
    async function uploadImg() {
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
      await axios.post(url, df, config).then((response) => {
        setimgURL(`ipfs://${response.data.ipfsHash}`);
      })
    }
    uploadImg();
  }, [src]);

  // function tickHandler(e) {
  //   if (e.target.checked) {
  //     setTick(true);
  //   } else {
  //     setTick(false);
  //   }
  // }

  async function generateImage() {
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
        setStatus(prediction.status);
        setsrc(prediction.output[0]);
      }
    }
  }

  return (
    <>
      {/* <br></br> */}
      {/* <input type="checkbox" onChange={tickHandler}></input>I have my own Image */}
      <div>
        {imgURL ? (
          <Box>
            <a href={imgURL}>{imgURL}</a>
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                setimgURL("");
              }}
            >
              Redo
            </Button>
          </Box>
        ) : (
          <Box>
            <br></br>
            <TextField
              size="small"
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
            <Button onClick={generateImage}>Generate Image</Button>
          </Box>
        )}
        <Rest_of_comp
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
        ></Rest_of_comp>
      </div>
    </>
  );
}

export default Details;
