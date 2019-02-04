import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
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

        const errorsDescription = errors.map((error: any) => {
            return error.constraints[Object.keys(error.constraints)[0]];
        });

        if (errors.length > 0) {
            throw new BadRequestException(errorsDescription);
        }
        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}
