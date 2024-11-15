"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialRoutes = exports.dishRoutes = void 0;
const DishRoutes_1 = __importDefault(require("./dishes/DishRoutes"));
exports.dishRoutes = DishRoutes_1.default;
const TestimonialRoutes_1 = __importDefault(require("./testimonial/TestimonialRoutes"));
exports.testimonialRoutes = TestimonialRoutes_1.default;
