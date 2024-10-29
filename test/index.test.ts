import { expect, test, describe } from '@jest/globals';
import { LoggerService } from '../src';
import path from 'path';
import fs from 'fs';

describe('LoggerService', () => {
  let loggerService: LoggerService;
  const testLogsDir = path.join(process.cwd(), 'logs');
  
    beforeAll(() => {
      loggerService = LoggerService.getInstance();
    });
  
    // afterAll(() => {
    //   if (fs.existsSync(testLogsDir)) {
    //     fs.rmSync(testLogsDir, { recursive: true, force: true });
    //   }
    // });
  
    describe('Singleton instance', () => {
      it('should return the same instance on repeated calls', () => {
        const instance1 = LoggerService.getInstance();
        const instance2 = LoggerService.getInstance();
        expect(instance1).toBe(instance2);
      });
    });
  
    describe('Logging methods', () => {
      it('should create a combined log file with the correct message', () => {
        const logFilePath = path.join(testLogsDir, 'combined.log');
        loggerService.log('info', 'Test log message', { meta: 'test' });
        const fileContent = fs.readFileSync(logFilePath, 'utf8');
        expect(fileContent).toContain('Test log message');
        expect(fileContent).toContain('"meta": "test"');
      });
  
      it('should log an info message in the combined log file', () => {
        const logFilePath = path.join(testLogsDir, 'combined.log');
        loggerService.info('Info message for test');
        const fileContent = fs.readFileSync(logFilePath, 'utf8');
        expect(fileContent).toContain('Info message for test');
      });
  
      it('should log a warning message in the combined log file', () => {
        const logFilePath = path.join(testLogsDir, 'combined.log');
        loggerService.warn('Warning message for test');
        const fileContent = fs.readFileSync(logFilePath, 'utf8');
        expect(fileContent).toContain('Warning message for test');
      });
  
      it('should log an error message in the error log file', () => {
        const errorFilePath = path.join(testLogsDir, 'error.log');
        loggerService.error('Error message for test');
        const fileContent = fs.readFileSync(errorFilePath, 'utf8');
        expect(fileContent).toContain('Error message for test');
      });
    });
  
    describe('File method', () => {
      it('should create a custom log file and write content to it', () => {
        const customLogFileName = 'custom_log';
        const logFilePath = path.join(testLogsDir, 'browser', `${customLogFileName}.log`);
  
        loggerService.file(customLogFileName, 'Custom log content');
        const fileContent = fs.readFileSync(logFilePath, 'utf8');
        expect(fileContent).toContain('Custom log content');
      });
  
      it('should correctly handle JSON object content in custom log file', () => {
        const customLogFileName = 'json_log';
        const logFilePath = path.join(testLogsDir, 'browser', `${customLogFileName}.log`);
  
        const logContent = { event: 'test', status: 'success' };
        loggerService.file(customLogFileName, JSON.stringify(logContent, null, 2));
        const fileContent = fs.readFileSync(logFilePath, 'utf8');
        expect(fileContent).toContain(JSON.stringify(logContent, null, 2));
      });
    });
  });