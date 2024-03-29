import user from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createUser = async (userObj) => {
  const lastUser = await user.findOne().sort({ _id: -1 });
  if (lastUser) {
    const lastUserId = lastUser.userId;
    const lastUserIdNumber = parseInt(lastUserId.substring(4));
    const newUserIdNumber = lastUserIdNumber + 1;
    const newUserId = "USER" + newUserIdNumber;
    userObj.userId = newUserId;
  } else {
    userObj.userId = "USER1000000001";
  }

  const emailExists = await user.findOne({ email: userObj.email });
  if (emailExists) {
    throw new Error("Email already exists");
  } else {
    return await user
      .create(userObj)
      .then(async (data) => {
        await data.save();
        return data;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
};

export const signupUser = async (userObj) => {
  const lastUser = await user.findOne().sort({ _id: -1 });
  if (lastUser) {
    const lastUserId = lastUser.userId;
    const lastUserIdNumber = parseInt(lastUserId.substring(4));
    const newUserIdNumber = lastUserIdNumber + 1;
    const newUserId = "USER" + newUserIdNumber;
    userObj.userId = newUserId;
  } else {
    userObj.userId = "USER1000000001";
  }

  const emailExists = await user.findOne({ email: userObj.email });
  if (emailExists) {
    throw new Error("Email already exists");
  } else {
    return await user
      .create(userObj)
      .then(async (data) => {
        await data.save();
        return data;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
};

export const getUser = async (id) => {
  return await user
    .findById(id)
    .then((data) => {
      if (data) {
        return data;
      } else {
        throw new Error("User not found");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

export const getAllUsers = async () => {
  return await user
    .find()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

export const updateUser = async (id, userObj) => {
  return await user
    .findByIdAndUpdate(id, userObj, { new: true })
    .then((data) => {
      if (data) {
        return data;
      } else {
        throw new Error("User not found");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

export const deleteUser = async (id) => {
  return await user
    .findByIdAndDelete(id)
    .then((data) => {
      if (data) {
        return data;
      } else {
        throw new Error("User not found");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

export const loginUser = async (email, password) => {
  return await user
    .findOne({ email })
    .then((data) => {
      if (data) {
        if (bcrypt.compareSync(password, data.password)) {
          const accessToken = jwt.sign(
            {
              _id: data._id,
              email: data.email,
              role: "user",
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          );
          //create response object
          const responseObj = {
            _id: data._id,
            userId: data.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            accessToken: accessToken,
          };
          return responseObj;
        } else {
          throw new Error("Invalid Login Credentials");
        }
      } else {
        throw new Error("Invalid Login Credentials");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

export const verifyUser = async (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw new Error("Invalid token");
    } else {
      return decoded;
    }
  });
};

export const changePassword = async (id, password) => {
  const userObj = await user.findById(id);
  if (bcrypt.compareSync(password.currentPassword, userObj.password)) {
    return await user
      .findByIdAndUpdate(id, { password: password.newPassword }, { new: true })
      .then((data) => {
        if (data) {
          return data;
        } else {
          throw new Error("User not found");
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } else {
    throw new Error("Invalid current password");
  }
};

export const checkEmail = async (email) => {
  return await user
    .findOne({ email: email })
    .then((data) => {
      if (data) {
        return data;
      } else {
        throw new Error("Email not found");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

export default {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
  verifyUser,
  signupUser,
  changePassword,
  checkEmail,
};
