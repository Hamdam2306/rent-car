import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router';
import { Router } from './routes/routes';
import Sidebar from './admin/components/sidebar';


createRoot(document.getElementById('root')!).render(
	<StrictMode>
	   <BrowserRouter>
         <div className='flex justify-end'>
			<Sidebar/>
			<Router />
		 </div>
	   </BrowserRouter>
	</StrictMode>
);