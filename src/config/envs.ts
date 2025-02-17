/* eslint-disable prettier/prettier */

import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    PRODUCTS_MICROSERVICE: string;
    PRODUCTS_MICROSERVICE_PORT: number;

    ORDERS_MICROSERVICE: string;
    ORDERS_MICROSERVICE_PORT: number;
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),

    ORDERS_MICROSERVICE: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
    //DATABASE_URL: joi.string().required(),
})
.unknown(true);

const {error, value } = envSchema.validate(process.env)

if(error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;
export const envs = {
    port: envVars.PORT,
    productsMicroservices: envVars.PRODUCTS_MICROSERVICE,
    productsMicroservicesPort: envVars.PRODUCTS_MICROSERVICE_PORT,

    ordersMicroservices: envVars.ORDERS_MICROSERVICE,
    ordersMicroservicesPort: envVars.ORDERS_MICROSERVICE_PORT,
}