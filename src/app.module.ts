import { applyRawBodyOnlyTo } from "@golevelup/nestjs-webhooks";
import type { MiddlewareConsumer, NestModule } from "@nestjs/common";
import { Module, RequestMethod } from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";

// import { SentryInterceptor } from "@ntegral/nestjs-sentry";
import { CustomThrottlerGuard } from "@common/guards";
import { ClearCacheInterceptor, HttpCacheInterceptor } from "@common/interceptors";
import { ClearCacheMiddleware, RealIpMiddleware } from "@common/middlewares";
import { NestCacheModule } from "@lib/cache";
import { SharedModule } from "@modules/shared/shared.module";
import { AppController } from "app.controller";

@Module({
  controllers: [AppController],
  imports: [SharedModule, NestCacheModule],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: SentryInterceptor,
    // },
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClearCacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    applyRawBodyOnlyTo(consumer, {
      method: RequestMethod.ALL,
      path: "stripe/webhook",
    });
    consumer
      .apply(RealIpMiddleware, ClearCacheMiddleware)
      .exclude(
        { path: "stripe/webhook", method: RequestMethod.ALL },
        { path: "doc", method: RequestMethod.ALL },
      )
      .forRoutes({
        path: "*",
        method: RequestMethod.ALL,
      });
  }
}
