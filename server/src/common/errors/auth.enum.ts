export enum AuthError {
    USER_INVALID_CREDENTIALS = 'Invalid credentials',
    USER_EMAIL_NOT_FOUND = 'User with this email does not exist',
    USER_PASSWORDS_NOT_MATCH = 'Password do not match confirm password',
    USER_NOT_FOUND = 'User not found',
    USER_OLD_PASSWORD_INVALID = 'Old password is not valid',
    USER_PHONE_ALREADY_EXISTS = 'This phone number is already registered',
}
