'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">Accrue Design Studio</h1>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Template Gallery</h2>
            <div className="grid grid-cols-2 gap-4">
              {['Bold Statement', 'Quick Tips', 'Before/After', 'Quote Card'].map((name) => (
                <div key={name} className="border-2 border-gray-200 rounded p-4 hover:border-blue-500 cursor-pointer">
                  <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded mb-2"></div>
                  <p className="text-sm font-medium">{name}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Preview</h2>
            <div className="aspect-square bg-gradient-to-br from-blue-900 to-blue-600 rounded flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="text-3xl font-bold mb-2">ACCRUE</h3>
                <p className="text-lg">Now you know it&apos;s right.™</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
