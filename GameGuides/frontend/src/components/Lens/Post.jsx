import React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount,
  useSigner,
} from "wagmi";
import {
  LensHub,
  abi_LensHub,
  createProfile,
  abi_createProfile,
  zeroaddress,
} from "./constants";
import { ethers } from "ethers";
import { Box,Button } from "@mui/material";
function Post({
  profileId,
  contentURI,
  collectModule,
  collectModuleInitData,
  referenceModule,
  referenceModuleInitData,
}) {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: LensHub,
    abi: abi_LensHub,
    functionName: "post",
    args: [
      {
        profileId,
        contentURI,
        collectModule,
        collectModuleInitData,
        referenceModule,
        referenceModuleInitData,
      },
    ],
    enabled:
      profileId !== undefined &&
      contentURI !== undefined &&
      collectModule !== undefined &&
      collectModuleInitData !== undefined &&
      referenceModule !== undefined &&
      referenceModuleInitData !== undefined,
  });

  const { data, writeAsync, error } = useContractWrite(config);

  return (
    <Box display="flex" justifyContent="center">
      <Button onClick={writeAsync}>Submit</Button>
      {data ? console.log(data) : <></>}
    </Box>
  );
}

export default Post;
