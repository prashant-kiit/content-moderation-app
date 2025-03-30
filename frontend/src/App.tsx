import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, XCircle, AlertTriangle, BarChart } from 'lucide-react';

interface ModeratedContent {
  id: string;
  content: string;
  status: 'approved' | 'rejected';
  timestamp: Date;
}

function App() {
  const [currentContent, setCurrentContent] = useState('');
  const [moderatedContent, setModeratedContent] = useState<ModeratedContent[]>([]);

  const stats = {
    total: moderatedContent.length,
    approved: moderatedContent.filter(c => c.status === 'approved').length,
    rejected: moderatedContent.filter(c => c.status === 'rejected').length,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentContent.trim()) return;

    const newContent: ModeratedContent = {
      id: Date.now().toString(),
      content: currentContent,
      status: Math.random() > 0.5 ? 'approved' : 'rejected', // Simulate random moderation decision
      timestamp: new Date(),
    };

    setModeratedContent([newContent, ...moderatedContent]);
    setCurrentContent('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-blue-600" size={24} />
          <h1 className="text-xl font-semibold">Content Moderation System</h1>
        </div>
      </header>

      <div className="flex-1 flex gap-4 p-4">
        {/* Main Content Area */}
        <div className="flex-1 space-y-4">
          {/* Input Form */}
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm">
            <textarea
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value)}
              placeholder="Enter content for moderation..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
            />
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={!currentContent.trim()}
              >
                Submit for Review
              </button>
            </div>
          </form>

          {/* Moderated Content List */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Recent Moderation Results</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {moderatedContent.map((content) => (
                <div key={content.id} className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {content.status === 'approved' ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : (
                      <XCircle className="text-red-600" size={20} />
                    )}
                    <span className={`font-medium ${
                      content.status === 'approved' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {content.status === 'approved' ? 'Content Approved' : 'Content Rejected'}
                    </span>
                    <span className="text-sm text-gray-500 ml-auto">
                      {content.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{content.content}</p>
                </div>
              ))}
              {moderatedContent.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No content has been moderated yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="w-80 bg-white rounded-lg shadow-sm h-fit">
          <div className="p-4 space-y-6">
            <div className="flex items-center gap-2">
              <BarChart className="text-blue-600" size={20} />
              <h2 className="text-lg font-semibold">Moderation Results</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Reviews</div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-1">
                    <CheckCircle size={16} className="text-green-600" />
                    <div className="text-xl font-bold text-green-600">{stats.approved}</div>
                  </div>
                  <div className="text-sm text-green-700">Approved</div>
                </div>

                <div className="flex-1 bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center gap-1">
                    <AlertTriangle size={16} className="text-red-600" />
                    <div className="text-xl font-bold text-red-600">{stats.rejected}</div>
                  </div>
                  <div className="text-sm text-red-700">Rejected</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-900 mb-2">Success Rate</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ 
                      width: `${stats.total > 0 ? (stats.approved / stats.total) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}% Success
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;