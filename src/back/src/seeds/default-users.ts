import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {
	const hashed = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

	const gundamAdmin = await prisma.user.upsert({
		where: {email: 'lilianux@everate.fr'},
		update: {

		},
		create: {
			email: 'lilianux@everate.fr',
			displayName: 'Lilianux',
			hash: hashed
		}
	});

	console.log(gundamAdmin);
}

main().then(async() => {
	await prisma.$disconnect()	
}).catch(async(e) => {
	console.log(e);
	await prisma.$disconnect();
	process.exit(1);
})