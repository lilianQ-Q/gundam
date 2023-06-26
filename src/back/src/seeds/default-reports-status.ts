import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {

    const existingStatus = await prisma.status.findMany();
    
    if (existingStatus.length !== 0)
    {
        console.log("Status already exists !");
        return;
    }

    const statuses = [
        { name: 'pending' },
        { name: 'success' },
        { name: 'failed' },
    ];

    const newStatus = await prisma.status.createMany({
        data: statuses
    });

    console.log(newStatus);
}

main().then(async() => {
	await prisma.$disconnect()	
}).catch(async(e) => {
	console.log(e);
	await prisma.$disconnect();
	process.exit(1);
})