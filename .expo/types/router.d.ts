/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/MainStyleSheet` | `/_sitemap` | `/firebase` | `/main` | `/main/` | `/main/learn` | `/main/recipes` | `/signin` | `/signup` | `/start`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
