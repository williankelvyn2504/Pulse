"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs/promises"));
class Pulse {
    constructor(filePath) {
        this.filePath = filePath;
        this.database = new Map();
        this.load();
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs.readFile(this.filePath, "utf-8");
                const jsonData = JSON.parse(data);
                this.database = new Map(Object.entries(jsonData));
            }
            catch (error) {
                fs.writeFile(this.filePath, JSON.stringify({}, null, 2));
            }
        });
    }
    put(key, value) {
        if (!value || value === undefined) {
            throw new Error("Value cannot be undefined");
        }
        this.database.set(key, value);
        this.save();
    }
    get(key) {
        return this.database.has(key) ? this.database.get(key) : null;
    }
    remove(key) {
        this.database.delete(key);
        this.save();
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataToSave = Object.fromEntries(this.database);
            try {
                const currentData = yield fs.readFile(this.filePath, "utf-8");
                if (currentData !== JSON.stringify(dataToSave, null, 2)) {
                    yield fs.writeFile(this.filePath, JSON.stringify(dataToSave, null, 2));
                }
            }
            catch (error) {
                console.error("Error saving database:", error);
                yield fs.writeFile(this.filePath, JSON.stringify(dataToSave, null, 2));
            }
        });
    }
}
module.exports = Pulse;
