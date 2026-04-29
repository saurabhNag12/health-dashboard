# MediFlow AI - Health Monitoring Dashboard

A production-ready React health monitoring dashboard with AI-powered insights, patient management, and real-time analytics.

![MediFlow AI Dashboard](https://img.shields.io/badge/MediFlow-AI%20Dashboard-teal)
![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.3-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

## Features

### Professional SaaS UI
- Dark/Light mode toggle with persistent preference
- Glassmorphism card design with backdrop blur effects
- Smooth animations and transitions
- Collapsible sidebar navigation
- Fully responsive design (mobile, tablet, desktop)

### Dashboard Metrics
- Average Heart Rate across all patients
- Average Blood Sugar levels
- Average Oxygen Saturation
- Average Sleep Hours
- Abnormal metric detection

### Patient Management
- Add new patients with form validation
- Edit existing patient records
- Delete patients with confirmation
- Search patients by name, email, or phone
- Filter by risk level (Critical, High, Moderate, Normal)
- Sort by various columns
- Pagination for large datasets

### Interactive Charts
- Heart Rate Trend Line Chart (weekly view)
- Blood Sugar Area Chart with gradient fill
- Risk Distribution Pie Chart
- Recovery Analytics Bar Chart
- Built with Recharts library

### AI Insights
**Logic:**
- If blood sugar > 200 → Critical alert
- If heart rate > 100 → Risk warning
- Pre-diabetic monitoring (140-200 mg/dL)
- Low oxygen detection (<95%)
- Sleep pattern analysis
- Smart recommendations for each case

### Export Reports
- Download patient data as CSV
- Includes all vital statistics
- Timestamped filename

### Data Persistence
- LocalStorage for patient data
- Automatic save on any change
- Loads initial demo data on first visit
- Dark mode preference persistence

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18.3 | UI Framework |
| Vite 5.3 | Build Tool & Dev Server |
| Tailwind CSS 3.4 | Styling |
| Recharts | Data Visualization |
| Lucide React | Icons |
| LocalStorage | Data Persistence |

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx          # Navigation sidebar
│   ├── Navbar.jsx           # Top navigation bar
│   ├── MetricCard.jsx       # Health metric display cards
│   ├── PatientTable.jsx     # Patient records table
│   ├── Charts.jsx           # Analytics charts
│   ├── AIInsights.jsx       # AI analysis and recommendations
│   └── AddPatientModal.jsx  # Patient form modal
├── pages/
│   └── Dashboard.jsx        # Main dashboard page
├── data/
│   └── patients.js          # Initial patient data & configs
├── App.jsx                  # Root component
├── main.jsx                 # Entry point
└── index.css                # Global styles & Tailwind
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open in browser:**
Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder.

## Usage Guide

### Adding a Patient
1. Click the **"Add Patient"** button in the top right
2. Fill in the patient details:
   - Basic info (name, age, gender, email, phone)
   - Vital signs (heart rate, blood sugar, oxygen, blood pressure, sleep)
3. Click **"Save Patient"**
4. Risk level is automatically calculated based on vitals

### Editing/Deleting Patients
- Click the **pencil icon** next to a patient to edit
- Click the **trash icon** to delete (requires confirmation)

### Filtering & Searching
- Use the **search bar** to find patients by name/email/phone
- Click **filter pills** to show only specific risk levels

### Exporting Data
- Click **"Export"** to download all patient data as a CSV file

### Dark Mode
- Toggle the **sun/moon icon** in the top right corner

## AI Risk Calculation Logic

The system automatically calculates risk levels based on these rules:

| Condition | Risk Level | Recommendation |
|-----------|------------|----------------|
| Blood Sugar > 200 mg/dL | **Critical** | Immediate endocrinology consultation |
| Heart Rate > 100 bpm | **High Risk** | ECG screening, cardiac evaluation |
| Blood Sugar 140-200 mg/dL | **Moderate** | Lifestyle modifications, monitoring |
| Oxygen < 95% | **High Risk** | Respiratory evaluation |
| Sleep < 6 hours | **Moderate** | Sleep hygiene, apnea screening |
| All normal | **Normal** | Continue routine monitoring |

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use for personal or commercial projects.

---

Built with ❤️ using React + Vite + Tailwind CSS
