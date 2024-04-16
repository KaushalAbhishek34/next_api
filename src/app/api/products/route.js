import { PrismaClient } from '../../../../prisma/generated/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { inputData } = reqBody;
    if (!reqBody) {
      return new Response(JSON.stringify({ error: 'Images data is missing' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    inputData.images = JSON.parse(inputData.images);
    const imageData = inputData.images?.map((url) => ({ url }));
    const newData = await prisma.product.create({
      data: {
        title: inputData.title,
        description: inputData.description,
        price: parseInt(inputData.price),
        discountPercentage: parseFloat(inputData.discountPercentage),
        rating: parseFloat(inputData.rating),
        stock: parseInt(inputData.stock),
        brand: inputData.brand,
        category: inputData.category,
        thumbnail: inputData.thumbnail,
        images: {
          create: imageData,
        },
      },
    });

    return new Response(JSON.stringify(newData), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}
