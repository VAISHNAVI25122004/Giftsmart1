import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen relative">
            <Navbar />
            <main className="flex-grow bg-gray-50">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
