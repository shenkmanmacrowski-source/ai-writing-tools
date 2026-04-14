import Link from 'next/link'

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out AI Writing Tools.',
    credits: '100',
    features: [
      '100 credits / month',
      'Rewriter (500 chars/req)',
      'Grammar Checker (500 chars/req)',
      'Summarizer (1000 chars/req)',
      'Citation Generator',
    ],
    cta: 'Get Started',
    href: '/auth#signup',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    description: 'For serious writers, students, and professionals.',
    credits: '2,000',
    features: [
      '2,000 credits / month',
      'All tools, unlimited length',
      'Priority API access',
      'Save history',
      'Advanced AI models (GPT-4o)',
      'Email support',
    ],
    cta: 'Start Pro Trial',
    href: '/auth#signup?plan=pro',
    highlight: true,
  },
  {
    name: 'Team',
    price: '$39',
    period: '/month',
    description: 'For teams and organizations.',
    credits: '10,000',
    features: [
      '10,000 credits / month',
      '5 team members',
      'All Pro features',
      'API access',
      'Admin dashboard',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    href: 'mailto:team@aiwriting.tools',
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-500 text-lg">Start free. Upgrade when you need more.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 ${
                plan.highlight
                  ? 'bg-brand-600 text-white shadow-xl shadow-brand-200 scale-105'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {plan.highlight && (
                <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-white text-xs font-semibold mb-4">
                  ⭐ Most Popular
                </div>
              )}
              <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <div className="flex items-end gap-1 mb-2">
                <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm mb-1 ${plan.highlight ? 'text-brand-100' : 'text-gray-500'}`}>
                  {plan.period}
                </span>
              </div>
              <p className={`text-sm mb-6 ${plan.highlight ? 'text-brand-100' : 'text-gray-500'}`}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className={`text-3xl font-bold ${plan.highlight ? 'text-white' : 'text-brand-600'}`}>
                  {plan.credits}
                </span>
                <span className={`text-sm ${plan.highlight ? 'text-brand-100' : 'text-gray-500'}`}> credits/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className={plan.highlight ? 'text-brand-100' : 'text-brand-500'}>✓</span>
                    <span className={plan.highlight ? 'text-white' : 'text-gray-600'}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-white text-brand-600 hover:bg-brand-50'
                    : 'bg-brand-600 text-white hover:bg-brand-700'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 p-6 bg-white border border-gray-200 rounded-2xl">
          <p className="text-gray-500 text-sm">
            💳 All plans include <strong>no credit card required</strong> to start.
            Monthly subscriptions can be cancelled anytime.
          </p>
        </div>
      </div>
    </div>
  )
}
