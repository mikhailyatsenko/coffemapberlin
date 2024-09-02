import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DetailedPaceCard } from 'widgets/DetailedPaceCard';
import { routeConfig } from '../../../../shared/config/routeConfig/routeConfig';

export const AppRouter = () => {
  return (
    <Suspense fallback={'Loading...'}>
      <Routes>
        {Object.values(routeConfig).map(({ element, path }) => {
          if (path === '/')
            return (
              <Route key={path} path={path} element={<div className="page-wrapper">{element}</div>}>
                <Route path="details" element={<DetailedPaceCard />} />
              </Route>
            );
          return <Route key={path} path={path} element={<div className="page-wrapper">{element}</div>} />;
        })}
      </Routes>
    </Suspense>
  );
};
