import { applyDecorators } from "@nestjs/common";
import { ArrayNotEmpty, IsArray, IsDateString, IsNotEmpty, IsOptional } from "class-validator";
import type { DateFieldOptions } from "@common/@types";
import { validationI18nMessage } from "@lib/i18n";

/**
 * It's a decorator that validates that the field is an date
 * @param options_ - DateFieldOptions
 * @returns A decorator function that takes in a target, propertyKey, and descriptor.
 */

export function IsDateField(options_?: DateFieldOptions) {
  const options: DateFieldOptions = {
    each: false,
    required: true,
    arrayMinSize: 0,
    arrayMaxSize: Number.MAX_SAFE_INTEGER,
    ...options_,
  };
  const decoratorsToApply = [
    IsDateString(
      { strict: true },
      {
        message: validationI18nMessage("validation.isDataType", {
          type: "date",
        }),
        each: options.each,
      },
    ),
  ];

  if (options.required) {
    decoratorsToApply.push(
      IsNotEmpty({
        message: validationI18nMessage("validation.isNotEmpty"),
        each: options.each,
      }),
    );

    if (options.each) {
      decoratorsToApply.push(
        ArrayNotEmpty({
          message: validationI18nMessage("validation.isNotEmpty"),
        }),
      );
    }
  }
  else {
    decoratorsToApply.push(IsOptional());
  }

  if (options.each) {
    decoratorsToApply.push(
      IsArray({
        message: validationI18nMessage("validation.isDataType", {
          type: "array",
        }),
      }),
    );
  }

  return applyDecorators(...decoratorsToApply);
}
