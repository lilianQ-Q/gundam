import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {

    const existingTypes = await prisma.type.findMany();
    
    if (existingTypes.length !== 0)
    {
        console.log("Report types already exists !");
        return;
    }

    const types = [
        { name: 'automatic' },
        { name: 'manual' },
    ];

    const newType = await prisma.type.createMany({
        data: types
    });

    console.log(newType);
}

main().then(async() => {
	await prisma.$disconnect()	
}).catch(async(e) => {
	console.log(e);
	await prisma.$disconnect();
	process.exit(1);
})