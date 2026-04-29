/**
 * Initial Patient Data
 * Contains sample patient records for demonstration purposes
 */

export const initialPatients = [
  {
    id: 1,
    name: "Priya Sharma",
    age: 45,
    gender: "Female",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    heartRate: 72,
    bloodPressure: { systolic: 118, diastolic: 78 },
    bloodSugar: 95,
    oxygenLevel: 98,
    sleepHours: 7.5,
    riskLevel: "normal",
    lastCheckup: "2024-01-15",
    status: "active",
    notes: "Regular checkup, all vitals normal",
    trendData: [
      { day: 'Mon', heartRate: 72, sugar: 95 },
      { day: 'Tue', heartRate: 74, sugar: 98 },
      { day: 'Wed', heartRate: 71, sugar: 92 },
      { day: 'Thu', heartRate: 73, sugar: 96 },
      { day: 'Fri', heartRate: 72, sugar: 94 },
      { day: 'Sat', heartRate: 70, sugar: 93 },
      { day: 'Sun', heartRate: 72, sugar: 95 },
    ]
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    age: 52,
    gender: "Male",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43211",
    heartRate: 88,
    bloodPressure: { systolic: 135, diastolic: 85 },
    bloodSugar: 145,
    oxygenLevel: 96,
    sleepHours: 6.2,
    riskLevel: "moderate",
    lastCheckup: "2024-01-14",
    status: "active",
    notes: "Pre-diabetic, monitoring blood sugar",
    trendData: [
      { day: 'Mon', heartRate: 86, sugar: 142 },
      { day: 'Tue', heartRate: 88, sugar: 148 },
      { day: 'Wed', heartRate: 87, sugar: 145 },
      { day: 'Thu', heartRate: 89, sugar: 150 },
      { day: 'Fri', heartRate: 88, sugar: 145 },
      { day: 'Sat', heartRate: 85, sugar: 140 },
      { day: 'Sun', heartRate: 88, sugar: 145 },
    ]
  },
  {
    id: 3,
    name: "Ananya Patel",
    age: 38,
    gender: "Female",
    email: "ananya.patel@email.com",
    phone: "+91 98765 43212",
    heartRate: 105,
    bloodPressure: { systolic: 142, diastolic: 92 },
    bloodSugar: 110,
    oxygenLevel: 97,
    sleepHours: 5.8,
    riskLevel: "high",
    lastCheckup: "2024-01-13",
    status: "warning",
    notes: "Elevated heart rate, stress management recommended",
    trendData: [
      { day: 'Mon', heartRate: 102, sugar: 108 },
      { day: 'Tue', heartRate: 108, sugar: 112 },
      { day: 'Wed', heartRate: 105, sugar: 110 },
      { day: 'Thu', heartRate: 107, sugar: 115 },
      { day: 'Fri', heartRate: 105, sugar: 110 },
      { day: 'Sat', heartRate: 100, sugar: 105 },
      { day: 'Sun', heartRate: 105, sugar: 110 },
    ]
  },
  {
    id: 4,
    name: "Vikram Singh",
    age: 67,
    gender: "Male",
    email: "vikram.singh@email.com",
    phone: "+91 98765 43213",
    heartRate: 78,
    bloodPressure: { systolic: 155, diastolic: 95 },
    bloodSugar: 215,
    oxygenLevel: 94,
    sleepHours: 6.5,
    riskLevel: "critical",
    lastCheckup: "2024-01-12",
    status: "critical",
    notes: "Diabetic, immediate intervention required",
    trendData: [
      { day: 'Mon', heartRate: 76, sugar: 210 },
      { day: 'Tue', heartRate: 80, sugar: 220 },
      { day: 'Wed', heartRate: 78, sugar: 215 },
      { day: 'Thu', heartRate: 79, sugar: 225 },
      { day: 'Fri', heartRate: 78, sugar: 215 },
      { day: 'Sat', heartRate: 75, sugar: 205 },
      { day: 'Sun', heartRate: 78, sugar: 215 },
    ]
  },
  {
    id: 5,
    name: "Neha Gupta",
    age: 29,
    gender: "Female",
    email: "neha.gupta@email.com",
    phone: "+91 98765 43214",
    heartRate: 68,
    bloodPressure: { systolic: 112, diastolic: 72 },
    bloodSugar: 88,
    oxygenLevel: 99,
    sleepHours: 8.2,
    riskLevel: "normal",
    lastCheckup: "2024-01-16",
    status: "active",
    notes: "Excellent health metrics",
    trendData: [
      { day: 'Mon', heartRate: 66, sugar: 86 },
      { day: 'Tue', heartRate: 70, sugar: 90 },
      { day: 'Wed', heartRate: 68, sugar: 88 },
      { day: 'Thu', heartRate: 69, sugar: 89 },
      { day: 'Fri', heartRate: 68, sugar: 88 },
      { day: 'Sat', heartRate: 65, sugar: 85 },
      { day: 'Sun', heartRate: 68, sugar: 88 },
    ]
  },
  {
    id: 6,
    name: "Arjun Reddy",
    age: 41,
    gender: "Male",
    email: "arjun.reddy@email.com",
    phone: "+91 98765 43215",
    heartRate: 92,
    bloodPressure: { systolic: 128, diastolic: 82 },
    bloodSugar: 125,
    oxygenLevel: 97,
    sleepHours: 6.8,
    riskLevel: "moderate",
    lastCheckup: "2024-01-11",
    status: "active",
    notes: "Borderline hypertension, lifestyle changes recommended",
    trendData: [
      { day: 'Mon', heartRate: 90, sugar: 122 },
      { day: 'Tue', heartRate: 94, sugar: 128 },
      { day: 'Wed', heartRate: 92, sugar: 125 },
      { day: 'Thu', heartRate: 93, sugar: 130 },
      { day: 'Fri', heartRate: 92, sugar: 125 },
      { day: 'Sat', heartRate: 88, sugar: 120 },
      { day: 'Sun', heartRate: 92, sugar: 125 },
    ]
  }
];

/**
 * Risk Level Configuration
 * Defines colors and labels for different risk levels
 */
export const riskConfig = {
  critical: {
    label: 'Critical',
    color: 'bg-red-500',
    textColor: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  high: {
    label: 'High Risk',
    color: 'bg-amber-500',
    textColor: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
  },
  moderate: {
    label: 'Moderate',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
  },
  normal: {
    label: 'Normal',
    color: 'bg-green-500',
    textColor: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
  },
};

/**
 * Normal ranges for health metrics
 */
export const normalRanges = {
  heartRate: { min: 60, max: 100, unit: 'bpm' },
  bloodPressure: { systolic: { min: 90, max: 120 }, diastolic: { min: 60, max: 80 }, unit: 'mmHg' },
  bloodSugar: { min: 70, max: 140, unit: 'mg/dL' },
  oxygenLevel: { min: 95, max: 100, unit: '%' },
  sleepHours: { min: 7, max: 9, unit: 'hours' },
};
