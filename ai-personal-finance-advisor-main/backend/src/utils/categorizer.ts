import { Category } from '../types';

const categoryKeywords: Record<Category, string[]> = {
  Food: ['restaurant', 'cafe', 'food', 'dining', 'lunch', 'dinner', 'breakfast', 'pizza', 'burger', 'sushi'],
  Transport: ['uber', 'lyft', 'taxi', 'bus', 'train', 'metro', 'fuel', 'gas', 'parking', 'toll'],
  Utilities: ['electricity', 'water', 'gas', 'internet', 'phone', 'mobile', 'broadband'],
  Shopping: ['amazon', 'store', 'mall', 'shop', 'retail', 'clothing', 'fashion', 'electronics'],
  Entertainment: ['movie', 'cinema', 'netflix', 'spotify', 'game', 'concert', 'theater', 'streaming'],
  Healthcare: ['hospital', 'doctor', 'pharmacy', 'medical', 'clinic', 'health', 'medicine', 'dental'],
  Education: ['school', 'university', 'course', 'tuition', 'books', 'education', 'training'],
  Bills: ['bill', 'payment', 'insurance', 'subscription', 'membership'],
  Rent: ['rent', 'lease', 'housing', 'apartment', 'mortgage'],
  Groceries: ['grocery', 'supermarket', 'walmart', 'target', 'costco', 'market'],
  Travel: ['hotel', 'flight', 'airline', 'booking', 'airbnb', 'vacation', 'trip'],
  Miscellaneous: []
};

export const categorizeTransaction = (description: string): Category => {
  const lowerDesc = description.toLowerCase();

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => lowerDesc.includes(keyword))) {
      return category as Category;
    }
  }

  return 'Miscellaneous';
};

export const detectAnomaly = (amount: number, categoryAverage: number): boolean => {
  const threshold = 2.5;
  return amount > categoryAverage * threshold;
};
