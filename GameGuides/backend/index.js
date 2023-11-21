const Moralis = require("moralis").default;
const {EvmChain}=require("@moralisweb3/evm-utils");
const express = require("express");
const fetch=require("node-fetch");

const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 8080;
const contract_addrs=["0x634Bf2f90CbB69840c8b3F79bb3CEa3e102A976C"];
const chain =EvmChain.MUMBAI;

app.use(express.json());

app.use(cors({
  origin: '*'
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// MORALIS TEMPLATE
// app.get("/", async (req, res) => {
//   await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
//   try {

//   } catch (e) {
//     res.send(e);
//   }
// });

app.get("/Browse", async (req, res) => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  try {
    const response=await Moralis.EvmApi.nft.getContractNFTs({
      address:contract_addrs[0],
      chain,
    });
    console.log(response.status)
    res.send(response)
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

app.get("/myGuides", async (req, res) => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  // const address = req.body.address;
  const {address}=req.query;
  try {
    const response=await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
      tokenAddresses:contract_addrs
    });
    console.log(response);
    res.send(response);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});



app.post("/api/predictions", async (req, res) => {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: "Token 11d877024512700925e2c3f804131b5cf2c09b05",
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify({
      version:
        "a9758cbfbd5f3c2094457d996681af52552901775aa2d6dd0b17fd15df959bef",
      input: { prompt: req.body.prompt, num_outputs: 1 },
    }),
  });
  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
  } else {
    const prediction = await response.json();
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
  }
});

app.get("/api/predictions/:id",async(req,res)=>{
  console.log(req.params.id);
  const response=await fetch(
    "https://api.replicate.com/v1/predictions/" + req.params.id,
    {
        headers:{
            Authorization:"Token 11d877024512700925e2c3f804131b5cf2c09b05",
            "Content-Type":"application/json",
        },
    }
);
console.log(response);
if(response.status !==200){
    let error=await response.json();
    res.statusCode=500;
    res.end(JSON.stringify({detail:error.detail}));
    return;
}
  const prediction =await response.json();
  res.end(JSON.stringify(prediction));
})