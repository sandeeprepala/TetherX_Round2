import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="bg-medical-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-medical-200">
                    {/* Decorative shapes */}
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                            Improve Patient Care with <br /> AI-Powered Prioritization
                        </h2>
                        <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                            Join 500+ hospitals transforming their patient intake and diagnostic workflows with MediPriority.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/signup" className="px-8 py-4 bg-white text-medical-600 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-xl shadow-black/10 active:scale-95 text-center">Get Started Now</Link>
                            <Link to="/login" className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all active:scale-95 text-center">Contact Sales</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
