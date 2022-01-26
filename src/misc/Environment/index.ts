import { readFileSync, existsSync } from 'fs';

import { AbstractEnvironment } from '@vyrnn:Zeraph/Main/Environment';

import { FileNotFoundException } from 'Exceptions/FileNotFoundException';

import { EnvironmentNotLoadedException } from 'Misc/Environment/Exceptions/EnvironmentNotLoadedException';
import { EnvironmentNotFoundException } from 'Misc/Environment/Exceptions/EnvironmentNotFoundException';

export class Environment implements AbstractEnvironment {
  private static ENVIRONMENT_FOLDER_PATH = '/home/configuration/vyrnn';
  private static ENVIRONEMNT_FILE_PATH = `${Environment.ENVIRONMENT_FOLDER_PATH}/zeraph-main-env`;

  private static ENVIRONMENT: any;

  private static readEnvironmentFile = () => {
    if (!existsSync(Environment.ENVIRONMENT_FOLDER_PATH)) {
      throw new FileNotFoundException(
        'environment folder not found',
      );
    }

    if (!existsSync(Environment.ENVIRONEMNT_FILE_PATH)) {
      throw new FileNotFoundException(
        'environment file not found',
      );
    }

    const lines = String(
      readFileSync(Environment.ENVIRONEMNT_FILE_PATH),
    ).split(/\n/);

    Environment.ENVIRONMENT = {};

    for (const line of lines) {
      if (/^$/.test(line)) {
        continue;
      }

      var [ key, value ] = line.split(/=/);

      const regex = /\$\{(.*?)\}/g;

      value.match(regex)?.forEach((match) => {
        const environment = match.split(/\{/)[1].split(/\}/)[0];

        value = value.replace(match, Environment.ENVIRONMENT[environment]);
      });

      Environment.ENVIRONMENT[key] = value.replaceAll(
        /("|\n)/g,
        '',
      );
    }
  };
  
  private static get = (key: string): any | undefined => {
    if (!Environment.ENVIRONMENT) {
      Environment.readEnvironmentFile();

      if (!Environment.ENVIRONMENT) {
        throw new EnvironmentNotLoadedException();
      }
    }

    return Environment.ENVIRONMENT[key];
  };

  public static getString = (key: string): string => {
    const value = Environment.getStringOrNull(key);

    if (!value) {
      throw new EnvironmentNotFoundException();
    }

    return value;
  };

  public static getStringOrNull = (key: string): string | undefined | null => {
    const value = Environment.get(key);

    if (!value) {
      return null;
    }

    return String(value);
  };

  public static getInt = (key: string): number => {
    const value = Environment.getIntOrNull(key);

    if (!value) {
      throw new EnvironmentNotFoundException();
    }

    return value;
  };

  public static getIntOrNull = (key: string): number | undefined | null => {
    const value = Environment.get(key);

    if (!value) {
      return null;
    }

    return Number(value);
  };
}
