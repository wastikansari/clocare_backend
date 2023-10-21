import jwt from 'jsonwebtoken';

class JwtService {
    static sign(payload, expiry, secret) {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }

    static verify(token, secret) {
        return jwt.verify(token, secret);
    }
}

export default JwtService;