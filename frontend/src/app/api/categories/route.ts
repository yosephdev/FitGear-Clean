import { NextResponse } from 'next/server';

const categories = [
  'Strength Training',
  'Cardio Equipment',
  'Fitness Accessories',
  'Yoga & Pilates',
  'Sports Nutrition'
];

export async function GET() {
  return NextResponse.json({
    categories,
    status: 'success'
  });
}
