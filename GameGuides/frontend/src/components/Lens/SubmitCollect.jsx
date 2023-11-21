import React , {useState}from 'react';
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

function SubmitCollect({profileId,pubId,initdata}) {

    const [errormsg,seterrormsg]=useState("");

    const {config}=usePrepareContractWrite({
        address:LensHub,
        abi:abi_LensHub,
        functionName:"collect",
        args:[profileId,pubId,initdata],
        onError:(error)=>{
                // const error_=JSON.parse(error.message);
                seterrormsg(error.message)

        }
    })
    const { data, writeAsync, error } = useContractWrite(config);
    console.log(profileId);
    console.log(pubId);
    console.log(initdata)


  return (
    <div>
    {
        errormsg ?(
            <>
                {errormsg}
            </>
        ):(
            <button onClick={writeAsync}>Confirm</button>
        
        )
    }
    {
            data? (console.log(data)):(<></>)
    }
        
    </div>
  )
}

export default SubmitCollect