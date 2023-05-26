import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

detenv. config();

const Configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
})
const openai = new OpenAIApi(configuration);