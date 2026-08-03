import type { Config } from 'tailwindcss';

/**
 * Palette is derived from the supplied Ethan & Sons logo, sampled directly:
 *   navy  #002446  (hue 209°)   — the brand dark
 *   amber #F7AA05  (hue 41°)    — the brand accent
 *
 * The interactive blue is the SAME hue as the brand navy, lifted in lightness,
 * so it reads as part of the mark rather than a third imported colour.
 *
 * Contrast, measured:
 *   white on navy .............. 15.66:1
 *   white on volt ..............  6.31:1
 *   amber on navy ..............  7.99:1
 *   amber on white .............  1.96:1  <-- NEVER use amber for text on light
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#00162B',
        navy: {
          DEFAULT: '#002446',
          700: '#073457',
          600: '#114568',
          500: '#1E587D',
        },
        volt: {
          DEFAULT: '#005FB8',
          700: '#004E97',
          400: '#2E8FE6',
          200: '#9ECBF2',
          50: '#EDF5FC',
        },
        amber: {
          DEFAULT: '#F7AA05',
          700: '#9A6600',
          50: '#FEF6E4',
        },
        graphite: '#0C2038',
        slate: {
          DEFAULT: '#4A5C6E',
          300: '#8697A8',
          100: '#D9E1E9',
        },
        mist: '#F4F7FA',
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.16em' }],
      },
      maxWidth: { shell: '78rem', prose: '46rem' },
      boxShadow: {
        card: '0 1px 2px rgba(0,22,43,.05), 0 8px 24px -12px rgba(0,22,43,.18)',
        lift: '0 2px 4px rgba(0,22,43,.06), 0 18px 40px -18px rgba(0,22,43,.30)',
        panel: 'inset 0 1px 0 rgba(255,255,255,.06), 0 24px 60px -30px rgba(0,0,0,.7)',
      },
      backgroundImage: {
        conduit:
          'linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px)',
      },
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: { rise: 'rise .5s cubic-bezier(.2,.7,.3,1) both' },
    },
  },
  plugins: [],
};

export default config;
