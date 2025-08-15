# Cyclist Performance Data Visualization

A professional D3.js scatterplot visualization analyzing doping allegations in professional bicycle racing, featuring the 35 fastest times up Alpe d'Huez normalized to 13.8km distance.

![Cyclist Data Scatterplot](https://img.shields.io/badge/D3.js-Visualization-orange) ![React](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-cyan)

<img width="1920" height="1422" alt="image" src="https://github.com/user-attachments/assets/a26e030f-6cd2-44be-a62e-b20af3486cc9" />


## 📊 Features

- **Interactive Scatterplot**: D3.js-powered visualization with smooth animations and transitions
- **Data-Driven Insights**: Visual analysis of cyclist performance data with doping allegations context
- **Responsive Design**: Optimized for all screen sizes and devices
- **Professional UI**: Clean, modern interface with intuitive color coding
- **Interactive Tooltips**: Detailed information on hover with cyclist statistics
- **Accessibility**: Proper semantic markup and keyboard navigation support

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Data Visualization**: D3.js v7
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Code Quality**: ESLint with TypeScript support

## 📈 Data Visualization Features

### Chart Components
- **X-Axis**: Years (1994-2015) with proper tick formatting
- **Y-Axis**: Race times in MM:SS format using D3 time scales
- **Data Points**: Color-coded circles representing individual cyclist performances
- **Legend**: Clear distinction between clean records and doping allegations
- **Tooltips**: Contextual information including cyclist name, nationality, year, time, and allegations

### Color Coding
- 🟢 **Green**: Clean records (no doping allegations)
- 🟠 **Orange**: Riders with documented doping allegations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ayokanmi-Adejola/cyclist-data-visualization.git
   cd cyclist-data-visualization
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   └── ScatterplotChart.tsx    # Main D3.js visualization component
├── App.tsx                     # Main application component
├── main.tsx                    # Application entry point
└── index.css                   # Global styles with Tailwind
```

## 🎯 Technical Implementation

### D3.js Integration
- **Scales**: Linear scale for years, time scale for race times
- **Axes**: Automatically generated with proper tick formatting
- **Data Binding**: Efficient data-driven DOM manipulation
- **Animations**: Smooth transitions for interactive elements

### React Integration
- **Hooks**: useEffect for D3 lifecycle management
- **Refs**: Direct DOM access for D3 operations
- **State Management**: React state for data loading and error handling

### Performance Optimizations
- **Efficient Rendering**: Minimal re-renders with proper dependency arrays
- **Memory Management**: Cleanup functions for D3 event listeners
- **Responsive Design**: CSS-based responsiveness with D3 scale adjustments

## 📊 Data Source

The visualization uses cyclist performance data from freeCodeCamp's reference dataset:
- **Source**: [Cyclist Data JSON](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json)
- **Content**: 35 fastest times up Alpe d'Huez
- **Time Period**: 1994-2015
- **Normalization**: All times normalized to 13.8km distance

## 🧪 Testing

This project passes all freeCodeCamp Data Visualization certification tests:

- ✅ Proper DOM structure with required IDs
- ✅ D3.js axis generation with tick marks
- ✅ Correct data attribute formatting
- ✅ Interactive tooltip functionality
- ✅ Legend implementation
- ✅ Responsive axis scaling

Run tests using the freeCodeCamp test suite included in the application.

## 🎨 Design Philosophy

- **Clean Aesthetics**: Minimalist design focusing on data clarity
- **Professional Typography**: Consistent font hierarchy and spacing
- **Intuitive Color Scheme**: Meaningful color coding with accessibility in mind
- **Smooth Interactions**: Subtle animations enhancing user experience
- **Mobile-First**: Responsive design principles throughout

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- **freeCodeCamp**: For providing the dataset and project requirements
- **D3.js Community**: For excellent documentation and examples
- **React Team**: For the robust frontend framework
- **Tailwind CSS**: For the utility-first CSS framework
