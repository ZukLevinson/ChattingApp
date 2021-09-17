"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
console.log(process.cwd() + "\\.env." + process.env.NODE_ENV);
dotenv_1.default.config({
    path: process.cwd() + "\\.env." + process.env.NODE_ENV,
});
