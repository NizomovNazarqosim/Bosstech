"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt = require("jsonwebtoken");
const verifyToken = (token) => {
    return jwt.verify(token, '1q2w3e4r', function (err, decoded) {
        if (err)
            return err;
        return decoded;
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt_verify.js.map