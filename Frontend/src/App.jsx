import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AppLayout from './ui/AppLayout';
import HomePage from './pages/HomePage';
import Search from './pages/Search';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import CreateNewBlog from './pages/CreateNewBlog';
import UpdateBlog from './pages/UpdateBlog';

// Creating a react query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/login',
        element: <LogIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/createNewBlog',
        element: <CreateNewBlog />,
      },
      {
        // Here, 'id' is a params
        path: '/updateBlog/:id',
        element: <UpdateBlog />,
      },
    ],
  },
]);

function App() {
  return (
    // Providing react query to our application
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-center" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
