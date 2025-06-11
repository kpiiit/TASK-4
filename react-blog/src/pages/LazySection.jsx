import React from 'react';

export default function LazySection() {
  return (
    <section className="mt-6 p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Lazy Loaded Section</h2>
      <p>The content loaded only when we click the "Show More" button.</p>
    </section>
  );
}
