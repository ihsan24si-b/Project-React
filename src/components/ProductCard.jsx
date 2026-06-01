import React from 'react';
import Card from './Card';

export default function ProductCard({ image, title, category, price, description }) {
  return (
    <Card className="max-w-md">
      <div className="space-y-4">
        {image && <img src={image} alt={title} className="h-48 w-full rounded-2xl object-cover" />}
        <div>
          <p className="text-sm text-blue-600 font-semibold">{category}</p>
          <h4 className="text-2xl font-bold mt-2">{title}</h4>
          <p className="text-slate-600 mt-2">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-green-600">{price}</span>
          <button className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">View</button>
        </div>
      </div>
    </Card>
  );
}
