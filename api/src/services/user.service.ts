import { eq } from "drizzle-orm";
import { db } from "../database/connection";
import { NewUser, User, user } from "../schema/user";
import * as validator from "validator";
import * as bcrypt from "bcrypt";
import { createToken } from "../middlewares/tokenCreation";
import { initializeNewUser } from "../utils/initializeNewUser";

type SignupServiceProps = {
  username: string;
  email: string;
  password: string;
};

type LoginServiceProps = {
  email: string;
  password: string;
};

type LoginResponse = {
  email: string;
  token: string;
};

export const findUser = async (
  value: string,
  type: string
): Promise<User | undefined> => {
  try {
    let result: User[] = [];
    if (type === "username") {
      result = await db.select().from(user).where(eq(user.userName, value));
    } else if (type === "email") {
      result = await db.select().from(user).where(eq(user.userEmail, value));
    }
    return result[0];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    throw new Error("Failed to retrieve user information from the database.");
  }
};

export const signupUserService = async (data: SignupServiceProps) => {
  const { username, email, password } = data;

  if (!username || !email || !password) {
    throw new Error("All fields must be filled!");
  }
  if (!validator.default.isEmail(email)) {
    throw new Error("Email is not valid!");
  }
  if (!validator.default.isStrongPassword(password)) {
    throw new Error("Password not strong enough!");
  }

  const userExists = await findUser(username, "username");
  if (!userExists) {
    const emailExists = await findUser(email, "email");
    if (!emailExists) {
      const salt = await bcrypt.genSalt(15);
      const hashedPassword = await bcrypt.hash(password, salt);
      let resultNewUser: unknown;

      const newUser: NewUser = {
        userName: username,
        userPassword: hashedPassword,
        userEmail: email,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        resultNewUser = await db.insert(user).values(newUser);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        throw new Error("Failed to create user!");
      }

      try {
        await initializeNewUser(username);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        throw new Error("Failed to initialize user's playlists!");
      }

      return resultNewUser;
    } else {
      throw new Error("User with this email already exists!");
    }
  } else {
    throw new Error("User with this username already exists!");
  }
};

export const loginUserService = async (
  data: LoginServiceProps
): Promise<LoginResponse> => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("All fields must be filled!");
  }

  const user = await findUser(email, "email");

  if (user) {
    const valid = await bcrypt.compare(password, user.userPassword ?? "");
    if (!valid) {
      throw new Error("Incorrect password!");
    }
    const usersToken = createToken(
      user.userId,
      user.userName ?? "",
      user.userEmail ?? ""
    );
    return { email: email, token: usersToken };
  } else {
    throw new Error("Incorrect email!");
  }
};
