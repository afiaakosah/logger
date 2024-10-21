# @nodesandbox/logger

`@nodesandbox/logger` is a singleton logging utility for Node.js applications built using the `winston` library. It provides structured logging formats, supports multiple transports, and offers a simple API for logging messages at different levels.

## Features

- **Singleton Pattern**: Ensures only one instance of the logger is created.
- **Custom Log Format**: Combines timestamps, error stack traces, and other relevant information into structured logs.
- **Multiple Transports**: Logs to both the console and files (error logs and combined logs).
- **Exception Handling**: Automatically logs uncaught exceptions to a separate file.
- **File Logging**: Supports writing specific log messages to individual files.

## Installation

You can install `@nodesandbox/logger` via npm:

```bash
npm install @nodesandbox/logger
```

## Usage

```typescript
import { LoggerService } from '@nodesandbox/logger';

const logger = LoggerService.getInstance();

// Logging at different levels
logger.info('Application has started');
logger.warn('This is a warning message');
logger.error('An error occurred', new Error('Sample error'));

// Logging to a specific file
logger.file('custom-log', 'This is a log message for a custom log file');
```

## Configuration

### Log Levels

You can use the following log levels:
- `info`: General information messages
- `warn`: Warning messages
- `error`: Error messages with optional stack trace

### File Structure

By default, logs are saved in the `logs` directory:
- `logs/error.log`: Contains error messages
- `logs/combined.log`: Contains all messages
- `logs/exceptions.log`: Contains uncaught exceptions
- `logs/browser`: Contains custom logs

## License

This project is licensed under the [MIT License](LICENSE).