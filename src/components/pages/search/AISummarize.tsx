import axios from "axios"

export const completion =  async (prompt: string): Promise<string> => {
  const URL = process.env.REACT_APP_PROXY_SERVER + "ai?definition=" + prompt

  try{
    const res = await axios.get(URL)
  const {data} = res
    console.log(data)
    return data["result"]

  }catch(err){
    return ""
  }
}