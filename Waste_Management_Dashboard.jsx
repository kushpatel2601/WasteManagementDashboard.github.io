import React, { useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDropzone } from 'react-dropzone';

// --- Helper Components ---

const NavLink = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      active
        ? 'bg-gray-900 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {children}
  </button>
);

// --- Main Pages ---

const Dashboard = () => {
  const data = [
    { name: 'Jan', waste: 4000 },
    { name: 'Feb', waste: 3000 },
    { name: 'Mar', waste: 2000 },
    { name: 'Apr', waste: 2780 },
    { name: 'May', waste: 1890 },
    { name: 'Jun', waste: 2390 },
    { name: 'Jul', waste: 3490 },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Waste Prediction</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
          <XAxis dataKey="name" stroke="#a0aec0" />
          <YAxis stroke="#a0aec0" />
          <Tooltip
            contentStyle={{ backgroundColor: '#2d3748', border: 'none' }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Legend wrapperStyle={{ color: '#e2e8f0' }} />
          <Line type="monotone" dataKey="waste" stroke="#48bb78" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const MapView = () => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-white mb-4">Optimized Route</h2>
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.596118435767!2d72.78440031493508!3d21.168478985923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e29a334e299%3A0x522340f1a3b9346c!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1662105377074!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg"
      ></iframe>
    </div>
  </div>
);

const ImageClassifier = () => {
    const [files, setFiles] = useState([]);
    const [classification, setClassification] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        // Simulate classification
        setTimeout(() => setClassification('Recyclable: Plastic Bottle'), 1000);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

    const thumbs = files.map(file => (
        <div key={file.name} className="inline-flex border-2 border-gray-600 rounded-lg p-2 mt-4">
            <div className="flex min-w-0 overflow-hidden">
                <img
                    src={file.preview}
                    className="block w-auto h-48 rounded"
                    alt={`Preview of ${file.name}`}
                />
            </div>
        </div>
    ));

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Image Classifier</h2>
            <div
                {...getRootProps()}
                className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-200 ${isDragActive ? 'border-green-400 bg-gray-700' : 'border-gray-600 hover:border-green-400'}`}
            >
                <input {...getInputProps()} />
                <p className="text-gray-400">Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                {thumbs}
            </aside>
            {classification && (
                <div className="mt-4 p-4 bg-green-800 text-white rounded-lg">
                    <h3 className="font-bold">Classification Result:</h3>
                    <p>{classification}</p>
                </div>
            )}
        </div>
    );
};


// --- App Component ---

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Map View':
        return <MapView />;
      case 'Image Classifier':
        return <ImageClassifier />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-white">WasteWise</div>
            <div className="flex space-x-4">
              <NavLink active={activePage === 'Dashboard'} onClick={() => setActivePage('Dashboard')}>
                Dashboard
              </NavLink>
              <NavLink active={activePage === 'Map View'} onClick={() => setActivePage('Map View')}>
                Map View
              </NavLink>
              <NavLink active={activePage === 'Image Classifier'} onClick={() => setActivePage('Image Classifier')}>
                Image Classifier
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto p-6">
        {renderPage()}
      </main>

      <footer className="bg-gray-800 mt-12 py-4">
          <div className="container mx-auto text-center text-gray-400 text-sm">
              <p>&copy; 2025 WasteWise Hackathon. All Rights Reserved.</p>
          </div>
      </footer>
    </div>
  );
}
