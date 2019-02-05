/*
 * File: validation.pipe.ts
 * Project: opds-server
 * File Created: Monday, 4th February 2019 8:17:02 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Tuesday, 5th February 2019 8:34:53 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2018 - 2019 tennai.com
 */

import { PipeTransform
    , Injectable
    , ArgumentMetadata
    , BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass, Type } from 'class-transformer';
import { JSON } from 'ta-json-x';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const parsed = JSON.deserialize(value, metatype);

        const object = plainToClass(metatype, parsed);
        const errors = await validate(object);

        const errorsDescription = errors;
        /*
        const errorsDescription = errors.map((error: any) => {
            return error.constraints[Object.keys(error.constraints)[0]];
        });
        */

        if (errors.length > 0) {
            throw new BadRequestException(errorsDescription);
        }

        return parsed;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}
