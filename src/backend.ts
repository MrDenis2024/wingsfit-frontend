import axiosApi from "./axiosApi.ts";
import {ITrainer} from "./types/trainerTypes.ts";

const run = async ()=>{
     const { data: trainers } = await axiosApi.get<ITrainer[]>(`/trainers/`);

     console.log(trainers);
 };
 run().catch(console.error);