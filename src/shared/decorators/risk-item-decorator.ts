// import {
// 	registerDecorator,
// 	ValidationOptions,
// 	ValidationArguments,
// 	ValidatorConstraint,
// 	ValidatorConstraintInterface
// } from 'class-validator';

// import { RiskLikelihoodType as Likelihood, RiskImpactType as Impact } from '@prisma/client';
// import { PrismaService } from '@/prisma/prisma.service';
// import { Injectable } from '@nestjs/common';

// export function IsLikelihoodScore(property: string, validationOptions?: ValidationOptions) {
// 	return function (object: object, propertyName: string) {
// 		registerDecorator({
// 			name: 'IsLikelihoodScore',
// 			target: object.constructor,
// 			propertyName: propertyName,
// 			constraints: [property],
// 			options: validationOptions,
// 			validator: {
// 				validate(val: any, args: ValidationArguments): boolean {
// 					const btwn = (x: number, min: number, max: number): boolean => {
// 						return x >= min && x <= max;
// 					};
// 					const [relatedPropertyName] = args.constraints;
// 					const likelihood = (args.object as any)[relatedPropertyName];

// 					if (typeof likelihood !== 'string') return false;
// 					if (likelihood == Likelihood.very_likely && !btwn(val, 4.1, 5)) return false;
// 					if (likelihood == Likelihood.likely && !btwn(val, 3.1, 4)) return false;
// 					if (likelihood == Likelihood.moderately_likely && !btwn(val, 2.1, 3)) return false;
// 					if (likelihood == Likelihood.unlikely && !btwn(val, 1.1, 2)) return false;
// 					if (likelihood == Likelihood.very_unlikely && !btwn(val, 0.1, 1)) return false;
// 					return true;
// 				},
// 				defaultMessage(args: ValidationArguments) {
// 					const [relatedPropertyName] = args.constraints;
// 					const likelihood = (args.object as any)[relatedPropertyName];

// 					if (likelihood == Likelihood.very_likely)
// 						return 'likelihood of Very Likely must be between 4.1 and 5';
// 					if (this.likelihood == Likelihood.likely)
// 						return 'likelihood of Likely  must be between 3.1 and 4   ';
// 					if (this.likelihood == Likelihood.moderately_likely)
// 						return 'likelihood of Moderately Likely must be between 2.1 and 3';
// 					if (this.likelihood == Likelihood.unlikely)
// 						return 'likelihood of Unlikely must be between 1.1 and 2';
// 					if (this.likelihood == Likelihood.very_unlikely)
// 						return 'likelihood of Very Unlikely must be between 0.1 and 1';
// 				}
// 			}
// 		});
// 	};
// }

// export function IsImpactScore(property: string, validationOptions?: ValidationOptions) {
// 	return function (object: object, propertyName: string) {
// 		registerDecorator({
// 			name: 'IsImpactScore',
// 			target: object.constructor,
// 			propertyName: propertyName,
// 			constraints: [property],
// 			options: validationOptions,
// 			validator: {
// 				validate(val: any, args: ValidationArguments): boolean {
// 					const btwn = (x: number, min: number, max: number): boolean => {
// 						return x >= min && x <= max;
// 					};
// 					const [relatedPropertyName] = args.constraints;
// 					const impact = (args.object as any)[relatedPropertyName];

// 					if (typeof impact !== 'string') return false;
// 					if (impact == Impact.critical && !btwn(val, 4.1, 5)) return false;
// 					if (impact == Impact.major && !btwn(val, 3.1, 4)) return false;
// 					if (impact == Impact.moderate && !btwn(val, 2.1, 3)) return false;
// 					if (impact == Impact.minor && !btwn(val, 1.1, 2)) return false;
// 					if (impact == Impact.insignificant && !btwn(val, 0.1, 1)) return false;
// 					return true;
// 				},
// 				defaultMessage(args: ValidationArguments) {
// 					const [relatedPropertyName] = args.constraints;
// 					const impact = (args.object as any)[relatedPropertyName];

// 					if (impact == Impact.critical)
// 						return 'impact Score  of Critical must be between 4.1 and 5     ';
// 					if (impact == Impact.major)
// 						return 'impact Score  of Major  must be between 3.1 and 4      ';
// 					if (impact == Impact.moderate)
// 						return 'impact Score of Moderate must be between 2.1 and 3     ';
// 					if (impact == Impact.minor)
// 						return 'impact Score  of Minor must be between 1.1 and 2     ';
// 					if (impact == Impact.insignificant)
// 						return 'impact Score of Insignificant must be between 0.1 and 1';
// 				}
// 			}
// 		});
// 	};
// }

// @ValidatorConstraint({ async: true, name: 'IsUserExistConstraint' })
// @Injectable()
// export class IsUserExistConstraint implements ValidatorConstraintInterface {
// 	constructor(private prisma: PrismaService) {}
// 	async validate(username: string): Promise<boolean> {
// 		const isuser = await this.prisma.party.findUnique({
// 			where: {
// 				username: username
// 			}
// 		});

// 		if (isuser) {
// 			return true;
// 		} else {
// 			false;
// 		}
// 	}
// 	defaultMessage(args: ValidationArguments) {
// 		return `user with username  does not exist`;
// 	}
// }

// export function IsUser(property: string, validationOptions?: ValidationOptions) {
// 	return function (object: object, propertyName: string) {
// 		registerDecorator({
// 			name: 'IsUser',
// 			target: object.constructor,
// 			propertyName: propertyName,
// 			constraints: [property],
// 			options: validationOptions,
// 			validator: IsUserExistConstraint
// 		});
// 	};
// }
