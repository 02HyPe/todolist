import { List, ListSchema } from "../modules/list/list.model";
import { User, UserSchema } from "../modules/users/users.model";
import { Session, SessionSchema } from "../modules/session/session.model";
import mongoose from "mongoose";

export const UserModel = mongoose.model<User>("users", UserSchema, "users");
export const ListModel = mongoose.model<List>(
  "todo.list",
  ListSchema,
  "todo.list"
);
export const SessionModel = mongoose.model<Session>(
  "sessions",
  SessionSchema,
  "sessions"
);
