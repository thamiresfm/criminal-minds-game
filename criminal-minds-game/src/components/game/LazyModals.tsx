import { lazy } from 'react';

// Lazy load modal components for better performance
export const DetailsModal = lazy(() => 
  import('./modals/DetailsModal').then(module => ({ default: module.DetailsModal }))
);

export const AccusationModal = lazy(() => 
  import('./modals/AccusationModal').then(module => ({ default: module.AccusationModal }))
);

export const LabResultsModal = lazy(() => 
  import('./modals/LabResultsModal').then(module => ({ default: module.LabResultsModal }))
);

export const AllLabResultsModal = lazy(() => 
  import('./modals/AllLabResultsModal').then(module => ({ default: module.AllLabResultsModal }))
);

export const GameOverModal = lazy(() => 
  import('./modals/GameOverModal').then(module => ({ default: module.GameOverModal }))
);

export const ExitModal = lazy(() => 
  import('./modals/ExitModal').then(module => ({ default: module.ExitModal }))
);

export const AnalysisModal = lazy(() => 
  import('./modals/AnalysisModal').then(module => ({ default: module.AnalysisModal }))
); 