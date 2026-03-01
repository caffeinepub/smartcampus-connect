import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        teal: {
          DEFAULT: 'oklch(var(--teal))',
          light: 'oklch(var(--teal-light))',
        },
        emerald: {
          DEFAULT: 'oklch(var(--emerald))',
          light: 'oklch(var(--emerald-light))',
          100: 'oklch(0.93 0.05 160)',
          700: 'oklch(0.45 0.14 160)',
        },
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))'
        },
        chart: {
          1: 'oklch(var(--chart-1))',
          2: 'oklch(var(--chart-2))',
          3: 'oklch(var(--chart-3))',
          4: 'oklch(var(--chart-4))',
          5: 'oklch(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'oklch(var(--sidebar))',
          foreground: 'oklch(var(--sidebar-foreground))',
          primary: 'oklch(var(--sidebar-primary))',
          'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
          accent: 'oklch(var(--sidebar-accent))',
          'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
          border: 'oklch(var(--sidebar-border))',
          ring: 'oklch(var(--sidebar-ring))'
        },
        // Faculty Hub design tokens
        fhub: {
          bg: 'oklch(var(--fhub-bg))',
          header: 'oklch(var(--fhub-header))',
          card: 'oklch(var(--fhub-card))',
          border: 'oklch(var(--fhub-border))',
          heading: 'oklch(var(--fhub-heading))',
          muted: 'oklch(var(--fhub-muted))',
          accent: 'oklch(var(--fhub-accent))',
          'accent-dark': 'oklch(var(--fhub-accent-dark))',
          'badge-bg': 'oklch(var(--fhub-badge-bg))',
          'ai-badge': 'oklch(var(--fhub-ai-badge))',
        },
        // Institute Intelligence Command Center tokens
        iicc: {
          bg: 'var(--iicc-bg)',
          header: 'var(--iicc-header)',
          card: 'var(--iicc-card)',
          border: 'var(--iicc-border)',
          heading: 'var(--iicc-heading)',
          muted: 'var(--iicc-muted)',
          blue: 'var(--iicc-blue)',
          'blue-dark': 'var(--iicc-blue-dark)',
          'blue-subtle': 'var(--iicc-blue-subtle)',
          silver: 'var(--iicc-silver)',
          'badge-bg': 'var(--iicc-badge-bg)',
        },
        // Parent Insight Portal tokens
        parent: {
          bg: 'var(--parent-bg)',
          header: 'var(--parent-header)',
          card: 'var(--parent-card)',
          border: 'var(--parent-border)',
          heading: 'var(--parent-heading)',
          muted: 'var(--parent-muted)',
          primary: 'var(--parent-primary)',
          'primary-dark': 'var(--parent-primary-dark)',
          'primary-hover': 'var(--parent-primary-hover)',
          'accent-subtle': 'var(--parent-accent-subtle)',
          'badge-bg': 'var(--parent-badge-bg)',
          'connect-bg': 'var(--parent-connect-bg)',
        },
        // Student Dashboard tokens
        student: {
          bg: 'var(--student-bg)',
          header: 'var(--student-header)',
          card: 'var(--student-card)',
          border: 'var(--student-border)',
          heading: 'var(--student-heading)',
          muted: 'var(--student-muted)',
          primary: 'var(--student-primary)',
          'primary-dark': 'var(--student-primary-dark)',
          'primary-hover': 'var(--student-primary-hover)',
          'accent-subtle': 'var(--student-accent-subtle)',
          'badge-bg': 'var(--student-badge-bg)',
        },
        // NIRGRANTHA Welcome Page tokens
        nirgrantha: {
          dark: 'oklch(var(--nirgrantha-dark))',
          teal: 'oklch(var(--nirgrantha-teal))',
          'teal-light': 'oklch(var(--nirgrantha-teal-light))',
          gold: 'oklch(var(--nirgrantha-gold))',
          'gold-light': 'oklch(var(--nirgrantha-gold-light))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        'card-hover': '0 8px 30px -4px oklch(0.52 0.14 185 / 0.18)',
        'nirgrantha-glow': 'var(--nirgrantha-glow)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fadeInUp 0.35s ease-out forwards',
      }
    }
  },
  plugins: [typography, containerQueries, animate],
};
