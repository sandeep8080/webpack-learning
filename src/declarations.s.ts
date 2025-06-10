// The declaration.d.ts file is a TypeScript declaration file used to define types for things TypeScript doesn't automatically understand,
//  especially for third-party libraries or non-TypeScript modules.

declare var process: {
  env: {
    APP_ENV: 'dev' | 'preprod' | 'prod' | 'qa'
  }
}