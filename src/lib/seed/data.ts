// ── Demo seed data for hackathon personas ─────────────────────────────

export const PERSONAS = {
  tenant:      { id: 'sarah', name: 'Sarah Mitchell', role: 'tenant',      avatar: '👩', subtitle: 'Tenant · Manchester' },
  landlord:    { id: 'david', name: 'David Thompson', role: 'landlord',    avatar: '🏠', subtitle: 'Landlord · Essex' },
  tradesperson:{ id: 'raj',   name: 'Raj Patel',      role: 'tradesperson', avatar: '⚡', subtitle: 'Electrician · London' },
}

// ── Sarah: Tenant ─────────────────────────────────────────────────────
export const TENANT_DATA = {
  monthlyIncome:   2667,
  rent:            1050,
  balance:          843,
  savingsBuffer:     120,
  shortfallRisk:    true,
  daysToRent:          7,
  shortfallAmount:   207,

  budgetBreakdown: [
    { category: 'Rent',          amount: 1050, icon: '🏠', color: '#006a4d',  pct: 39 },
    { category: 'Council Tax',   amount:  142, icon: '🏛️', color: '#00856b',  pct:  5 },
    { category: 'Energy',        amount:  167, icon: '⚡', color: '#f5a623',  pct:  6 },
    { category: 'Broadband',     amount:   42, icon: '📶', color: '#1565c0',  pct:  2 },
    { category: 'Subscriptions', amount:   58, icon: '📱', color: '#9c27b0',  pct:  2 },
    { category: 'Groceries',     amount:  320, icon: '🛒', color: '#e65100',  pct: 12 },
    { category: 'Transport',     amount:  180, icon: '🚂', color: '#455a64',  pct:  7 },
    { category: 'Eating out',    amount:  210, icon: '🍽️', color: '#d84315',  pct:  8 },
    { category: 'Other',         amount:  380, icon: '💳', color: '#607d8b',  pct: 14 },
  ],

  cashFlow: [
    { label: 'W1', income: 667, spend: 580, balance: 930 },
    { label: 'W2', income: 667, spend: 720, balance: 877 },
    { label: 'W3', income: 667, spend: 490, balance: 1054 },
    { label: 'W4', income: 666, spend: 1540, balance: 180 },  // rent week
    { label: '+7', income: 667, spend: 620, balance: 227 },
    { label: '+14',income: 667, spend: 590, balance: 304 },
  ],

  transactions: [
    { id: 't1', date: '20 Mar', merchant: 'Tesco Extra',      category: 'Groceries',    amount: -67.40, icon: '🛒' },
    { id: 't2', date: '19 Mar', merchant: 'Spotify',          category: 'Subscription', amount: -11.99, icon: '🎵' },
    { id: 't3', date: '19 Mar', merchant: 'Deliveroo',        category: 'Eating out',   amount: -28.50, icon: '🍽️' },
    { id: 't4', date: '18 Mar', merchant: 'TfL',              category: 'Transport',    amount: -14.20, icon: '🚇' },
    { id: 't5', date: '17 Mar', merchant: 'Salary - ACME Ltd',category: 'Income',       amount: 2667,   icon: '💰' },
    { id: 't6', date: '15 Mar', merchant: 'Octopus Energy',   category: 'Energy',       amount: -167,   icon: '⚡' },
    { id: 't7', date: '15 Mar', merchant: 'Sky Broadband',    category: 'Broadband',    amount: -42,    icon: '📶' },
    { id: 't8', date: '01 Mar', merchant: 'D. Thompson (Rent)', category: 'Rent',       amount: -1050,  icon: '🏠' },
  ],

  recommendations: [
    { title: 'Cancel unused subscriptions',  saving: 22,  icon: '📱', action: 'Review' },
    { title: 'Switch energy to Octopus Flux', saving: 34, icon: '⚡', action: 'Switch' },
    { title: 'Start a rent buffer fund',      saving: 0,   icon: '🐷', action: 'Set up' },
  ],

  rentReliabilityProfile: {
    onTimeStreak:     11,
    incomeStability:  'High',
    bufferAfterRent:  'Low',
    score:             78,
  },
}

// ── David: Landlord ───────────────────────────────────────────────────
export const LANDLORD_DATA = {
  totalMonthlyRent:    3150,
  totalMonthlyCosts:    890,
  netMonthlyIncome:    2260,
  portfolioYield:       5.4,
  propertiesCount:         3,

  properties: [
    {
      id: 'p1',
      address: '14 Maple Street, Manchester M14',
      tenant: 'Sarah Mitchell',
      rent: 1050,
      costs: 220,
      net: 830,
      status: 'occupied',
      compliance: [
        { cert: 'Gas Safety',  expiry: '2026-09-12', status: 'ok' },
        { cert: 'EICR',        expiry: '2026-03-28', status: 'urgent' },
        { cert: 'EPC',         expiry: '2028-01-15', status: 'ok' },
      ],
    },
    {
      id: 'p2',
      address: '7 Oak Avenue, Leeds LS6',
      tenant: 'James & Lisa Okafor',
      rent: 1150,
      costs: 340,
      net: 810,
      status: 'occupied',
      compliance: [
        { cert: 'Gas Safety',  expiry: '2026-11-30', status: 'ok' },
        { cert: 'EICR',        expiry: '2027-06-01', status: 'ok' },
        { cert: 'EPC',         expiry: '2027-03-20', status: 'ok' },
      ],
    },
    {
      id: 'p3',
      address: '3 Birch Close, Sheffield S10',
      tenant: null,
      rent: 950,
      costs: 330,
      net: 620,
      status: 'void',
      compliance: [
        { cert: 'Gas Safety',  expiry: '2026-10-05', status: 'ok' },
        { cert: 'EICR',        expiry: '2026-05-20', status: 'warning' },
        { cert: 'EPC',         expiry: '2029-08-11', status: 'ok' },
      ],
    },
  ],

  cashFlowHistory: [
    { month: 'Oct', income: 3150, costs: 890, net: 2260 },
    { month: 'Nov', income: 3150, costs: 1240, net: 1910 },
    { month: 'Dec', income: 3150, costs: 2100, net: 1050 },
    { month: 'Jan', income: 2200, costs: 960, net: 1240 },
    { month: 'Feb', income: 3150, costs: 810, net: 2340 },
    { month: 'Mar', income: 3150, costs: 890, net: 2260 },
  ],

  voidSimulation: {
    monthlyRentLost: 950,
    annualImpact:   11400,
    recommendedReserve: 2850,
  },
}

// ── Raj: Tradesperson ─────────────────────────────────────────────────
export const TRADESPERSON_DATA = {
  name: 'Raj Patel',
  trade: 'Electrician',
  certification: 'NICEIC Approved',
  location: 'Greater London & Essex',
  rating: 4.9,
  reviewCount: 47,
  completedJobs: 312,
  monthlyEarnings: 4200,
  pendingPayments: 780,

  jobs: [
    {
      id: 'j1',
      title: 'EICR Inspection Required',
      landlord: 'David Thompson',
      property: '14 Maple Street, Manchester M14',
      type: 'EICR',
      urgency: 'urgent',
      budget: '£180–£250',
      deadline: '28 Mar 2026',
      description: 'Full EICR inspection on 2-bed flat. Last done 2021. Certificate expires 28 March.',
      status: 'open',
      certRequired: 'NICEIC',
    },
    {
      id: 'j2',
      title: 'EICR + Consumer Unit Upgrade',
      landlord: 'David Thompson',
      property: '3 Birch Close, Sheffield S10',
      type: 'EICR',
      urgency: 'normal',
      budget: '£320–£480',
      deadline: '15 May 2026',
      description: 'EICR inspection + likely consumer unit upgrade. Property vacant — easy access.',
      status: 'open',
      certRequired: 'NICEIC',
    },
    {
      id: 'j3',
      title: 'Outdoor socket installation',
      landlord: 'Emma Clarke',
      property: '22 River Lane, Romford RM1',
      type: 'Installation',
      urgency: 'normal',
      budget: '£120–£160',
      deadline: '10 Apr 2026',
      description: 'Install 2x weatherproof outdoor sockets in garden. RCD protected.',
      status: 'open',
      certRequired: 'NICEIC',
    },
  ],

  quotes: [
    { jobId: 'j1', amount: 220, status: 'submitted', submittedAt: '19 Mar 2026' },
  ],

  payments: [
    { id: 'pay1', job: 'EICR – 9 Elm Road, Barking',      amount: 195, status: 'paid',    date: '15 Mar 2026' },
    { id: 'pay2', job: 'Rewire – 45 High St, Ilford',     amount: 585, status: 'paid',    date: '10 Mar 2026' },
    { id: 'pay3', job: 'EICR – 14 Maple St, Manchester',  amount: 220, status: 'pending', date: 'Due 28 Mar 2026' },
  ],
}
