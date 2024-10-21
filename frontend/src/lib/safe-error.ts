class SafeError extends Error {
  statusCode?: number;

  constructor(message?: string, statusCode?: number) {
    super(
      message ??
        "An error occurred on our end. Choose from one of the options below to continue. If this error persists, please contact support.",
    );
    this.name = "SafeError";
    this.statusCode = statusCode;
  }

  get hasStatusCode() {
    return !!this.statusCode;
  }

  get status() {
    return this.statusCode;
  }
}

export default SafeError;
