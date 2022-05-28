import { useState } from "react"
import { ethers } from "ethers"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/router"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY)

const LoginButton = () => {
    const [loginState, setLoginState] = useState();
    const router = useRouter()
    const checkUser = async () => {
        const { data } = await supabase.from("users").select("*")
        console.log(`data`, data)
    }

    const login = async () => {
        setLoginState("Connecting to your wallet")
        if (!window.ethereum) {
            setLoginState("No MetaMask Wallet... Please install it");
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const walletAddr = await signer.getAddress();
        setLoginState("Generating Nonce...");

        let response = await fetch("/api/auth/nonce", {
            method: "POST",
            body: JSON.stringify({
                walletAddr,
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
        const { nonce } = await response.json()

        setLoginState("Please sign the Nonce...");
        console.log("data from backend", nonce)
        

        const signature = await signer.signMessage(nonce)
        // console.log("signature", signature)


         response = await fetch("/api/auth/wallet", {
            method: "POST",
            body: JSON.stringify({
                walletAddr,
                nonce,
                signature
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })

        setLoginState("Login completed");

        const {user, token} = await response.json()
        await supabase.auth.setAuth(token);
        console.log(`user`, user)
        console.log(`token`, token)
        router.reload("/")
    }

    return (
        <div className ="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex-col items-center justify-center w-full flex-1 px-20 text-center"> 
                <p >{loginState}</p>
                <button  onClick={login}>
                    Sign in with MetaMask
                </button>
                
            </main>
        </div>

    )
   
}

export default LoginButton