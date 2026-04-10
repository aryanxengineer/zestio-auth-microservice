export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
} as const;

export const TOKEN_TYPE = {
  ACCESS: "access",
  REFRESH: "refresh",
} as const;