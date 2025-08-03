import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ServiceProvider } from './context/ServiceContext';
import { OrderProvider } from './context/OrderContext';
import { NotificationProvider } from './context/NotificationContext';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Order from './pages/Order';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notification from './components/Notification';

function App() {
    return (
        <Router>
            <AuthProvider>
                <ServiceProvider>
                    <OrderProvider>
                        <NotificationProvider>
                            <div className="flex flex-col min-h-screen">
                                <Navbar />
                                <main className="flex-grow">
                                    <Notification />
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/services" element={<Services />} />
                                        <Route path="/services/:platform" element={<Services />} />
                                        <Route path="/service/:id" element={<ServiceDetail />} />
                                        <Route path="/order/:id" element={<Order />} />
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/admin" element={<AdminDashboard />} />
                                    </Routes>
                                </main>
                                <Footer />
                            </div>
                        </NotificationProvider>
                    </OrderProvider>
                </ServiceProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;