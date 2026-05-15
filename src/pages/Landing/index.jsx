import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Recycle, ScanLine, BarChart3, Coins, ArrowRight } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/ui/Button';

/**
 * Landing page — public, shown to unauthenticated users.
 * Responsive design (no separate Desktop/Mobile for landing — handled via CSS).
 */
export default function LandingPage() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleCTA() {
    navigate(isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN);
  }

  const features = [
    {
      icon: ScanLine,
      title: t('landing.feature_1_title'),
      desc: t('landing.feature_1_desc'),
      gradient: 'from-eco-500 to-eco-600',
    },
    {
      icon: BarChart3,
      title: t('landing.feature_2_title'),
      desc: t('landing.feature_2_desc'),
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Coins,
      title: t('landing.feature_3_title'),
      desc: t('landing.feature_3_desc'),
      gradient: 'from-coin-500 to-coin-600',
    },
  ];

  return (
    <>
      <Helmet>
        <title>EcoScan V2 — AI-Powered Waste Classification</title>
        <meta
          name="description"
          content="Scan waste with AI, track your eco-impact, and earn EcoCoins. Free, fast, and accurate waste classification powered by ResNet50."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-surface-950 via-surface-900 to-eco-950">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 sm:px-12 py-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-eco-500 to-eco-600 flex items-center justify-center">
              <Recycle className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">EcoScan</span>
          </div>
          <Button onClick={handleCTA} variant="ghost" className="text-white border-surface-600 hover:bg-surface-800">
            {isAuthenticated ? t('nav.dashboard') : 'Sign In'}
          </Button>
        </nav>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 sm:px-12 py-20 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eco-500/10 border border-eco-500/20 text-eco-400 text-sm font-medium mb-8">
            <Recycle className="w-4 h-4" />
            AI-Powered Waste Classification
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 whitespace-pre-line">
            {t('landing.hero_title')}
          </h1>

          <p className="text-lg sm:text-xl text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('landing.hero_subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={handleCTA} className="text-base px-8 py-4">
              {t('landing.cta_primary')}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-md mx-auto">
            {[
              { label: 'Classes', value: '13' },
              { label: 'Accuracy', value: '95%+' },
              { label: 'Free', value: '100%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-surface-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-6 sm:px-12 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card p-6 group hover:scale-[1.02] transition-transform duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-surface-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-surface-800 px-6 py-8 text-center">
          <p className="text-sm text-surface-500">
            © 2026 EcoScan V2. Built with 🌱 for a greener planet.
          </p>
        </footer>
      </div>
    </>
  );
}
