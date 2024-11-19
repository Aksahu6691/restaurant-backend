import { DataSource } from "typeorm";
import env from './environment.config';
import { appEnv } from "../utils/constant";

const isLocal = env.environment == appEnv.local;

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: env.db.url,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    logging: isLocal ? 'all' : ['error', 'warn'],
    entities: [isLocal ? 'src/**/*.model.ts' : 'build/**/*.model.js'],
    synchronize: isLocal, // Set to false in production
})