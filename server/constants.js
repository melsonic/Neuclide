export default {
  ERROR_MESSAGE: {
    JWT_ERROR: 'jwtError',
    JWT_EXTRACT_ERROR: 'error extracting jwt',
    JWT_TOKEN_BLACKLIST_ERROR: 'token is blacklisted, please log in',
    JWT_TOKEN_SEARCH_DB_ERROR: 'error searching token in db',
    JWT_INVALID_TOKEN_ERROR: 'token is invalid | error extracting payload',
    USER_NOT_REGISTERED_ERROR: 'error finding user, user not registered',
    PASSWORD_MATCH_ERROR: 'password didn\'t match',
    USER_FINDING_ERROR: 'error finding user',
    USERNAME_NOT_EXIST_ERROR: 'username doesn\'t exist',
    ACCESS_TOKEN_BLACKLISTING_ERROR: 'error blacklisting a jwt access token',
    PASSWORD_HASH_ERROR: 'error hashing the password',
    CREATE_NEW_USER_ERROR: 'error creating new user',
    ADD_SUBJECT_ERROR: 'error adding subject',
    SAVE_USER_ERROR: 'error saving user',
    DELETE_SUBJECT_ERROR: 'error deleting subject',
    UPDATE_SUBJECT_NAME_ERROR: 'error updating subject name',
    MARK_PRESENT_ERRORR: 'error updating present classes count',
    MARK_ABSENT_ERROR: 'error updating absent classes count',
    HASH_ERROR: 'herror',
    DB_CONNECT_ERROR: 'DB not connected ... '

  },
  RESPONSE_MESSAGE: {
    USER_LOGIN_SUCCESS: 'user logged in successfully',
    USER_LOGOUT_SUCCESS: 'user logged out successfully',
    USERNAME_ALREADY_EXIST: 'username already exists',
    USER_REGISTER_SUCCESS: 'user registered successfully',
    ADD_SUBJECT_SUCCESS: 'subject added successfully',
    DELETE_SUBJECT_SUCCESS: 'subject deleted successfully',
    UPDATE_SUBJECT_NAME_SUCCESS: 'subject name updated successfully',
    MARK_PRESENT_SUCCESS: 'marked present successfully',
    MARK_ABSENT_SUCCESS: 'marked absent successfully',
    DB_CONNECT_SUCCESS: 'DB connected ... ',
    SERVER_LISTENING_SUCCESS: 'app is listening ... '
  },
  JWT_TOKEN_EXPIRE: {
    ONE_HOUR: '1h',
    ONE_DAY: '24h',

  },
  MODEL: {
    SUBJECT: 'Subject',
    USER: 'User',
    BLACK_LISTED_TOKEN: 'BlackListedToken'
  }
}