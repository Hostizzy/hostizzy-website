import { NextResponse } from 'next/server';

// Standard error response
export const errorResponse = (message, status = 500) => {
  return NextResponse.json({ error: message }, { status });
};

// Standard success response
export const successResponse = (data, status = 200) => {
  return NextResponse.json(data, { status });
};

// Get request body safely
export const getRequestBody = async (request) => {
  try {
    return await request.json();
  } catch (e) {
    return null;
  }
};

// Get query parameters from URL
export const getQueryParams = (request) => {
  const { searchParams } = new URL(request.url);
  return Object.fromEntries(searchParams.entries());
};

// Filter array based on query parameters
export const filterByQuery = (items, query) => {
  let filtered = [...items];

  if (query.category && query.category !== 'All') {
    filtered = filtered.filter(item =>
      item.type?.toLowerCase() === query.category.toLowerCase()
    );
  }

  if (query.location && query.location !== 'All') {
    filtered = filtered.filter(item =>
      item.location?.includes(query.location)
    );
  }

  return filtered;
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString();
};

// Validate required fields
export const validateRequired = (data, fields) => {
  const missing = fields.filter(field => !data[field]);
  if (missing.length > 0) {
    return { valid: false, missing };
  }
  return { valid: true };
};
