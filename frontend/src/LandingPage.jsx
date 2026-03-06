import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import DoctorDashboardPreview from './components/DoctorDashboardPreview';
import AIRecommendationSystem from './components/AIRecommendationSystem';
import PatientDashboardPreview from './components/PatientDashboardPreview';
import KeyFeatures from './components/KeyFeatures';
import PriorityCalculation from './components/PriorityCalculation';
import CTA from './components/CTA';
import Footer from './components/Footer';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <ProblemSection />
            <SolutionSection />
            <DoctorDashboardPreview />
            <AIRecommendationSystem />
            <PatientDashboardPreview />
            <KeyFeatures />
            <PriorityCalculation />
            <CTA />
            <Footer />
        </div>
    );
};

export default LandingPage;
