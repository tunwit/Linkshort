import { NextResponse } from "next/server";
import {z} from "zod";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const createvalidation = z.object({
    origin:z.string()
})

const deletevalidation = z.object({
    id:z.string()
})


async function generateUniqueId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueId = '';
    for (let i = 0; i < length; i++) {
      uniqueId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    // Check if the generated ID already exists in the database
    const existingItem = await prisma.linkcontainer.findUnique({
      where: {
        uniqueID:uniqueId
      },
    });
  
    // If the ID already exists, generate a new one recursively
    if (existingItem) {
      return generateUniqueId(length);
    }
    return uniqueId;
  }

export async function POST(req) { //create new shorten link
    const request = await req.json();
    const validate = createvalidation.safeParse(request)
    if(!validate.success){
        return NextResponse.json({"message":"Bad Request"}, { status: 400 })
    }
    const create = await prisma.linkcontainer.create({
        data:{
            origin:request.origin,
            uniqueID:await generateUniqueId(5)
        }
    })

    return NextResponse.json({"message":"ok","data":create}, { status: 201 })
}

export async function GET(req) { //Get all shorten link
    const result = await prisma.linkcontainer.findMany({})
    return NextResponse.json({"message":"ok","data":result}, { status: 200 })
}

export async function DELETE(req,res) { //Get all shorten link
    const request = await req.json();
    const validate = deletevalidation.safeParse(request)
    if(!validate.success){
        return NextResponse.json({"message":"Bad Request"}, { status: 400 })
    }
    const create = await prisma.linkcontainer.delete({
        where:{
            uniqueID:request.id
        }
    })

    return NextResponse.json({"message":"ok","data":create}, { status: 200 })
}
