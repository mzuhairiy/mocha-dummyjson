import { faker } from '@faker-js/faker';
import jwt from 'jsonwebtoken';

/**
 * Helper class for generating various types of invalid tokens
 * Useful for negative testing scenarios
 */
class InvalidTokenHelper {
    
    /**
     * Generate a completely random string (not a valid JWT)
     */
    static randomString(length = 32) {
        return faker.string.alphanumeric(length);
    }
    
    /**
     * Generate an empty token
     */
    static emptyToken() {
        return "";
    }
    
    /**
     * Generate null token
     */
    static nullToken() {
        return null;
    }
    
    /**
     * Generate undefined token
     */
    static undefinedToken() {
        return undefined;
    }
    
    /**
     * Generate a malformed JWT (missing parts)
     */
    static malformedJWT() {
        const options = [
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', // Only header
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.', // Header with dot
            '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ', // Missing header
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..signature', // Missing payload
            'invalid.jwt.format', // Invalid base64
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0', // Missing signature
        ];
        return faker.helpers.arrayElement(options);
    }
    
    /**
     * Generate an expired JWT token
     */
    static expiredJWT(secretKey = 'test-secret') {
        const payload = {
            sub: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            iat: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
            exp: Math.floor(Date.now() / 1000) - 1800   // 30 minutes ago (expired)
        };
        
        try {
            return jwt.sign(payload, secretKey);
        } catch (error) {
            // Fallback if jwt is not available
            return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZXhwIjoxNTE2MjM5MDIyfQ.expired';
        }
    }
    
    /**
     * Generate a JWT with invalid signature
     */
    static invalidSignatureJWT() {
        // Valid JWT structure but with wrong signature
        const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
        const payload = btoa(JSON.stringify({
            sub: faker.string.uuid(),
            name: faker.person.fullName(),
            exp: Math.floor(Date.now() / 1000) + 3600
        }));
        const invalidSignature = faker.string.alphanumeric(43);
        
        return `${header}.${payload}.${invalidSignature}`;
    }
    
    /**
     * Generate a JWT with tampered payload
     */
    static tamperedPayloadJWT(originalToken) {
        if (!originalToken || typeof originalToken !== 'string') {
            return this.invalidSignatureJWT();
        }
        
        const parts = originalToken.split('.');
        if (parts.length !== 3) {
            return this.malformedJWT();
        }
        
        try {
            // Decode payload
            const payload = JSON.parse(atob(parts[1]));
            
            // Tamper with payload
            payload.role = 'admin';
            payload.userId = faker.string.uuid();
            payload.exp = Math.floor(Date.now() / 1000) + 86400; // Extend expiry
            
            // Encode back
            const tamperedPayload = btoa(JSON.stringify(payload));
            
            return `${parts[0]}.${tamperedPayload}.${parts[2]}`;
        } catch (error) {
            return this.invalidSignatureJWT();
        }
    }
    
    /**
     * Generate token with special characters
     */
    static specialCharacterToken() {
        const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '='];
        return faker.helpers.arrayElements(specialChars, 10).join('') + 
               faker.string.alphanumeric(20);
    }
    
    /**
     * Generate extremely long token
     */
    static tooLongToken(length = 2000) {
        return faker.string.alphanumeric(length);
    }
    
    /**
     * Generate token with SQL injection attempt
     */
    static sqlInjectionToken() {
        const sqlPayloads = [
            "'; DROP TABLE users; --",
            "' OR '1'='1' --",
            "' UNION SELECT * FROM users --",
            "admin'--",
            "' OR 1=1#"
        ];
        return faker.helpers.arrayElement(sqlPayloads);
    }
    
    /**
     * Generate token with XSS attempt
     */
    static xssToken() {
        const xssPayloads = [
            "<script>alert('xss')</script>",
            "javascript:alert('xss')",
            "<img src=x onerror=alert('xss')>",
            "';alert('xss');//"
        ];
        return faker.helpers.arrayElement(xssPayloads);
    }
    
    /**
     * Generate a collection of various invalid tokens for comprehensive testing
     */
    static getAllInvalidTokenTypes(originalToken = null) {
        return {
            empty: this.emptyToken(),
            null: this.nullToken(),
            undefined: this.undefinedToken(),
            random: this.randomString(),
            malformed: this.malformedJWT(),
            expired: this.expiredJWT(),
            invalidSignature: this.invalidSignatureJWT(),
            tamperedPayload: this.tamperedPayloadJWT(originalToken),
            specialChars: this.specialCharacterToken(),
            tooLong: this.tooLongToken(),
            sqlInjection: this.sqlInjectionToken(),
            xss: this.xssToken()
        };
    }
    
    /**
     * Get random invalid token for quick testing
     */
    static getRandomInvalid() {
        const methods = [
            () => this.randomString(),
            () => this.malformedJWT(),
            () => this.expiredJWT(),
            () => this.invalidSignatureJWT(),
            () => this.specialCharacterToken()
        ];
        
        const randomMethod = faker.helpers.arrayElement(methods);
        return randomMethod();
    }
    
    /**
     * Generate invalid token based on specific scenario
     */
    static generateByScenario(scenario) {
        const scenarios = {
            'expired': () => this.expiredJWT(),
            'malformed': () => this.malformedJWT(),
            'empty': () => this.emptyToken(),
            'null': () => this.nullToken(),
            'random': () => this.randomString(),
            'invalid-signature': () => this.invalidSignatureJWT(),
            'too-long': () => this.tooLongToken(),
            'special-chars': () => this.specialCharacterToken(),
            'sql-injection': () => this.sqlInjectionToken(),
            'xss': () => this.xssToken()
        };
        
        return scenarios[scenario] ? scenarios[scenario]() : this.getRandomInvalid();
    }
}

export default InvalidTokenHelper;