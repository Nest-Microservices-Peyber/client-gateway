/* eslint-disable prettier/prettier */

import { IsEnum, IsOptional } from "class-validator";
import { OrderStatusList } from "../enum/order.enum";

export class statusDto  {

    @IsOptional()
    @IsEnum( OrderStatusList, {
        message: `Status must be one of the following: ${OrderStatusList}`
    })
    status: string;
    
    
}