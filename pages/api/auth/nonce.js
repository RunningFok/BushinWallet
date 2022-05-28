import supabase from "../../../services/supabase.js";
import { v4 as uuidv4} from "uuid"

const nonceApi = async (req, res) => {

    const { walletAddr } = req.body;
    const nonce = uuidv4();

    const { data, error } = await supabase
        .from("users")
        .select("nonce")
        .eq("walletAddr", walletAddr)
        
    
    if(data.length > 0) {
        const { data, error } = await supabase.from("users").update({ nonce: nonce }).match({ walletAddr: walletAddr })
        console.log("user exists")
    } else {
        const { data, error } = await supabase.from("users").insert([{ nonce: nonce, walletAddr: walletAddr }])
    }

    console.log("error", error)
    console.log("data", data);

    if(error) {
        res.status(400).json({error: error.message})

    } else {
        res.status(200).json({ nonce })
    }
}

export default nonceApi;