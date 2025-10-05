'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Pricing() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const plans = [
    {
      name: 'Ücretsiz',
      price: '₺0',
      period: 'aylık',
      description: 'Başlangıç için mükemmel',
      features: [
        '5 proje',
        'Temel destek',
        '1GB depolama',
        'Temel şablonlar'
      ],
      buttonText: 'Ücretsiz Başla',
      buttonAction: () => router.push('/auth/signup'),
      popular: false
    },
    {
      name: 'Pro',
      price: '₺29',
      period: 'aylık',
      description: 'Profesyonel kullanım için',
      features: [
        'Sınırsız proje',
        'Öncelikli destek',
        '10GB depolama',
        'Gelişmiş şablonlar',
        'API erişimi',
        'Özel entegrasyonlar'
      ],
      buttonText: 'Pro Planı Başlat',
      buttonAction: handleUpgrade,
      popular: true
    }
  ]

  async function handleUpgrade() {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Fiyatlandırma Planları
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            İhtiyaçlarınıza uygun planı seçin
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 bg-white border rounded-2xl shadow-sm flex flex-col ${
                plan.popular ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-indigo-500 text-white">
                    En Popüler
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="text-xl font-semibold">/{plan.period}</span>
                </p>
                <p className="mt-6 text-gray-500">{plan.description}</p>

                <ul className="mt-6 space-y-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-600">
                          ✓
                        </div>
                      </div>
                      <span className="ml-3 text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  onClick={plan.buttonAction}
                  disabled={isLoading}
                  className={`block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                    plan.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  } disabled:opacity-50`}
                >
                  {isLoading ? 'Yükleniyor...' : plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Tüm planlar 14 gün ücretsiz deneme ile gelir. İstediğiniz zaman iptal edebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  )
}
