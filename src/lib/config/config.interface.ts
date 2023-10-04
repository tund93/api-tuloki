import type { ConfigType } from "@nestjs/config";
import type {
  app,
  cloudinary,
  database,
  facebookOauth,
  googleOauth,
  jwt,
  mail,
  rabbitmq,
  redis,
  sentry,
  stripe,
  throttle,
  twilio,
} from "./configs";

export interface Config {
  throttle: ConfigType<typeof throttle>
  redis: ConfigType<typeof redis>
  database: ConfigType<typeof database>
  app: ConfigType<typeof app>
  rabbitmq: ConfigType<typeof rabbitmq>
  jwt: ConfigType<typeof jwt>
  twilio: ConfigType<typeof twilio>
  cloudinary: ConfigType<typeof cloudinary>
  mail: ConfigType<typeof mail>
  stripe: ConfigType<typeof stripe>
  facebookOauth: ConfigType<typeof facebookOauth>
  googleOauth: ConfigType<typeof googleOauth>
  sentry: ConfigType<typeof sentry>
}
