export interface BaseValidator {
  required?: boolean
  message?: string
}

interface BaseArrayValidator {
  arrayMaxSize?: number
  arrayMinSize?: number
  each?: boolean
}

export interface StringFieldOptions extends BaseValidator, BaseArrayValidator {
  trim?: boolean
  regex?: RegExp
  minLength?: number
  maxLength?: number
  sanitize?: boolean
}

export interface NumberFieldOptions extends BaseValidator, BaseArrayValidator {
  min?: number
  max?: number
  int?: boolean
  positive?: boolean
}

export interface FileValidator {
  fileType?: RegExp | string
  fileSize?: number
  required?: boolean
}

export type MinMaxLengthOptions = Pick<StringFieldOptions, "each" | "minLength" | "maxLength">;

export type DateFieldOptions = BaseValidator & BaseArrayValidator;

export type EnumFieldOptions = DateFieldOptions;
export type EmailFieldOptions = DateFieldOptions;
export type UUIDFieldOptions = DateFieldOptions;
