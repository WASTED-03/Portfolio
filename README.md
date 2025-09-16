# Portfolio Website

A modern, animated portfolio website built with React, Vite, TailwindCSS, and Framer Motion. Inspired by award-winning portfolio designs with smooth animations and interactions.

## Features

- 🎨 **Modern Design**: Clean, minimal design with beautiful typography and spacing
- ⚡ **Smooth Animations**: Framer Motion powered animations and transitions
- 📱 **Responsive**: Fully responsive design for all devices
- 🎯 **Interactive**: Hover effects, scroll animations, and micro-interactions
- 🚀 **Fast**: Built with Vite for lightning-fast development and builds
- 🎭 **Parallax**: Parallax scrolling effects and scroll-triggered animations
- 📄 **Case Studies**: Detailed project case studies with sticky navigation
- 📧 **Contact Form**: Animated contact form with validation

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation component
│   ├── Hero.jsx        # Hero section
│   ├── About.jsx       # About section
│   ├── Projects.jsx    # Projects showcase
│   ├── Contact.jsx     # Contact form
│   ├── Loader.jsx      # Loading animation
│   └── ScrollToTop.jsx # Scroll to top button
├── pages/              # Page components
│   └── CaseStudy.jsx   # Case study template
├── App.jsx             # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Customization

### Colors

Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your primary colors
  },
  accent: {
    // Your accent colors
  }
}
```

### Content

1. **Hero Section**: Update the title, subtitle, and social links in `src/components/Hero.jsx`
2. **About Section**: Modify the story and skills in `src/components/About.jsx`
3. **Projects**: Add your projects in `src/components/Projects.jsx`
4. **Contact**: Update contact information in `src/components/Contact.jsx`

### Case Studies

Add your case studies by updating the `projectData` object in `src/pages/CaseStudy.jsx`.

## Animation Customization

### Framer Motion Variants

Create custom animation variants in your components:

```javascript
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}
```

### Scroll Animations

Use the `RevealOnScroll` component for scroll-triggered animations:

```jsx
<RevealOnScroll direction="up" delay={0.2}>
  <h2>Animated Heading</h2>
</RevealOnScroll>
```

## Performance Optimization

- Images are optimized for web delivery
- Animations use `transform` and `opacity` for better performance
- Lazy loading for images and components
- Code splitting with React Router

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Design inspiration from award-winning portfolio websites
- Icons by [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)
