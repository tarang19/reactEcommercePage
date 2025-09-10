import React, { useEffect, useRef, useCallback } from 'react';
import { useContentStore } from '../store/useContentStore';
import { ContentCard } from './ContentCard';
import { SkeletonCard } from './SkeletonCard';

export const ContentGrid: React.FC = () => {
  const { filteredItems, loading, hasMore, loadMore } = useContentStore();
  const observer = useRef<IntersectionObserver>();
  const lastItemRef = useRef<HTMLDivElement>(null);

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  // Display items with pagination simulation
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = React.useState(1);
  const displayedItems = filteredItems.slice(0, itemsPerPage * currentPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredItems]);

  const handleLoadMore = () => {
    if (displayedItems.length < filteredItems.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-medium flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Contents List
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedItems.map((item, index) => (
          <div
            key={item.id}
            ref={index === displayedItems.length - 1 ? lastElementRef : null}
            className="w-full"
          >
            <ContentCard item={item} />
          </div>
        ))}
        
        {/* Skeleton loading cards */}
        {loading && 
          Array.from({ length: 8 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="w-full">
              <SkeletonCard />
            </div>
          ))
        }
      </div>

      {/* Load more trigger */}
      {displayedItems.length < filteredItems.length && (
        <div 
          ref={lastItemRef}
          className="flex justify-center mt-8"
        >
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {filteredItems.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No items found matching your criteria</p>
        </div>
      )}
    </div>
  );
};