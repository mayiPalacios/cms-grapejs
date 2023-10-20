import { get, post } from "./apiMethods"



export const posthtml =  async (html,css) =>{
  
    const response = await post(`http://localhost:3000/api/grape_template`,html,{ headers: { "Content-Type": "application/json" } })
       return response;

}


export const gethtml = async (id) =>{
     
    try {
        const response = await get(`http://localhost:3000/api/grape_template?id=${id}`, { headers: { "Content-Type": "application/json" } });
       return   response;
        
      } catch (error) {
        console.error("Error while fetching HTML:", error);
        throw error;
      }
}