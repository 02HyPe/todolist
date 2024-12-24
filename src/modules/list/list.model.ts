import mongoose from "mongoose";

export interface List {
  title: string;
  description: string;
  dateAddedOn: Date;
  dueDate: Date;
  priority: string;
  status: string;
  user: string;
  completedAt: Date;
}

export const ListSchema = new mongoose.Schema<List>({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  dateAddedOn: { type: Date, required: true, default: Date.now() },
  dueDate: { type: Date, required: true },
  priority: {
    type: String,
    default: "priority yet to set",
    enum: ["high", "meduim", "low"],
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "completed", "missed"],
  },
  user: { type: String, required: true },
  completedAt: { type: Date, required: false },
});
