import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly repo: Repository<User>,
	) {}

	async create(email: string, password: string) {
		const hashed = await bcrypt.hash(password, 10);

		return this.repo.save({
			email,
			password: hashed,
		});
	}
}
