import { InjectableProxy } from 'nestjs-cls';

@InjectableProxy()
export class UserProxy {
	id: number;
	email: string;
	phone: string | null;
	name: string;
	lastLoginAt: Date | null;
	createdAt: Date;
	updatedAt: Date;

	// ✅ Full name (proxy-তে আলাদা ফিল্ড লাগবে না)
	get fullName(): string {
		return this.name;
	}
}
