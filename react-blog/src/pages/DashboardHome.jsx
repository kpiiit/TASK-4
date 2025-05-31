import React from 'react';
import { lazy, Suspense, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const LazySection = lazy(() => import('./LazySection'));
export default function DashboardHome() {
  const [showSection, setShowSection] = useState(false);

  const handleClick = () => {
    setShowSection(true);
  };
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to your dashboard!
      </Typography>
      <Typography variant="body1">
        Here’s a quick overview of your recent activity, stats, and updates. Use the sidebar to navigate through your projects, users, and settings.
      </Typography>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleClick}
      >
        Show More
      </button>

     
      {showSection && (
        <Suspense fallback={<div>Loading section...</div>}>
          <LazySection />
        </Suspense>
      )}
    </Box>
  );
}
