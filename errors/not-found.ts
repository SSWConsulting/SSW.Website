class NotFoundError extends Error {
  constructor(message: string, status?: number, type?: string) {
    super(message);
  }
}

export default NotFoundError;
