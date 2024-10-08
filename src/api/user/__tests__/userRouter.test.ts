import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import request from "supertest";

import type { User } from "@/api/user/userModel";
import { users } from "@/api/user/userRepository";
import type { ServiceResponse } from "@/common/models/serviceResponse";
import { app } from "@/server";

describe("User API Endpoints", () => {
  describe("GET /users", () => {
    it("should return a list of users", async () => {
      // Act
      const response = await request(app).get("/users");
      const responseBody: ServiceResponse<User[]> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Users found");
      expect(responseBody.responseObject.length).toEqual(users.length);
      responseBody.responseObject.forEach((user, index) => compareUsers(users[index] as User, user));
    });
  });

  describe("GET /users/:id", () => {
    it("should return a user for a valid ID", async () => {
      // Arrange
      const testId = "65005e589f1a5b4d04880f71"; // Use toString() to match MongoDB string comparison
      const expectedUser = users.find((user) => user._id.toString() === testId) as User;

      // Act
      const response = await request(app).get(`/users/${testId}`);
      const responseBody: ServiceResponse<User> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("User found");
      if (!expectedUser) throw new Error("Invalid test data: expectedUser is undefined");
      compareUsers(expectedUser, responseBody.responseObject);
    });

    it("should return a not found error for non-existent ID", async () => {
      // Arrange
      const testId = "65005e589f1a5b4d04880f73";

      // Act
      const response = await request(app).get(`/users/${testId}`);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("User not found");
      expect(responseBody.responseObject).toBeNull();
    });

    it("should return a bad request for invalid ID format", async () => {
      // Act
      const invalidInput = "abc";
      const response = await request(app).get(`/users/${invalidInput}`);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("Invalid input");
      expect(responseBody.responseObject).toBeNull();
    });
  });
});

function compareUsers(mockUser: User, responseUser: User) {
  if (!mockUser || !responseUser) {
    throw new Error("Invalid test data: mockUser or responseUser is undefined");
  }

  expect(responseUser._id.toString()).toEqual(mockUser._id.toString()); // Ensure ObjectId is compared correctly
  expect(responseUser.name).toEqual(mockUser.name);
  expect(responseUser.email).toEqual(mockUser.email);
  expect(responseUser.passwordHash).toEqual(mockUser.passwordHash);
  expect(new Date(responseUser.createdAt)).toEqual(mockUser.createdAt);
  expect(new Date(responseUser.updatedAt)).toEqual(mockUser.updatedAt);
}
