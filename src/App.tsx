import { useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { ContentGrid } from './components/ContentGrid';
import { useContentStore } from './store/useContentStore';
import { useUrlState } from './hooks/useUrlState';
import { fetchContentItems } from './services/api';

function App() {
  const { setItems, setLoading } = useContentStore();
  useUrlState();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const items = await fetchContentItems();
        setItems(items);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setItems, setLoading]);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-white font-bold text-xl">CLOSET</h1>
            </div>
            <div className="bg-purple-600 text-white px-3 py-1 rounded text-sm">
              OPTIONAL FEATURE
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <SearchBar />
            <FilterPanel />
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <ContentGrid />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;