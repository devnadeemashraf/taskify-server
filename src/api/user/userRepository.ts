import type { User } from "@/api/user/userModel";
import mongoose from "mongoose"; // For ObjectId type

export const users: User[] = [
  {
    _id: "65005e589f1a5b4d04880f71", // Generating a new ObjectId string
    name: "Alice",
    email: "alice@example.com",
    passwordHash: "somehashedpassword",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  },
  {
    _id: "65005e589f1a5b4d04880f72", // Generating a new ObjectId string
    name: "Robert",
    email: "robert@example.com",
    passwordHash: "somehashedpassword",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  },
];

export class UserRepository {
  async findAllAsync(): Promise<User[]> {
    return users;
  }

  async findByIdAsync(id: string): Promise<User | null> {
    return users.find((user) => user._id === id) || null;
  }
}
