import { get, post } from "./apiMethods"



export const posthtml =  async (html) =>{
  
    const response = await post(`http://localhost:3000/api/grape_template`,html,{ headers: { "Content-Type": "application/json" } })
       return response;

}