import * as jwt from 'jsonwebtoken'

export const verifyToken = (token: string): any => {
   return jwt.verify(token, '1q2w3e4r', function(err: unknown, decoded: any) {
    if(err) return err
    return decoded
   })
}