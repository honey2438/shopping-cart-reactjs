import axios from "axios";
import { get_token } from "./get_token";
import { remove_token } from "./remove_token";
import {getConfig} from "../config/getConfig";

export const IsAuthenticated = () => {
  const config = getConfig();
  const is_authenticated_url=config.is_authenticated_url;
  const checkAuthentication=async()=>{
  try {
    let res = await axios.get(is_authenticated_url, {
      headers: {
        Authorization: get_token(),
      },
    });
    if(res.status === 200)return true;
    else{
        remove_token();
        return false;
    } 
  } catch (e) {
    remove_token();
    return false;
  }
}
return checkAuthentication();
};
