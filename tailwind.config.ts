import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			'ak-primary': '#0099ff',
  			'ak-secondary': '#00ccff',
  			'ak-accent': '#ff6600',
  			'ak-dark': '#0a0a0a',
  			'ak-gray': '#1a1a1a',
  			'ak-light-gray': '#2a2a2a',
  			'ak-text': '#ffffff',
  			'ak-text-secondary': '#cccccc',
  			'ak-border': '#333333',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			'ak-primary': [
  				'var(--font-ak-primary)',
  				'sans-serif'
  			],
  			'ak-secondary': [
  				'var(--font-ak-secondary)',
  				'monospace'
  			],
  			'ak-title': [
  				'var(--font-ak-title)',
  				'sans-serif'
  			],
  			oswald: [
  				'Oswald',
  				'sans-serif'
  			],
  			'source-han': [
  				'SourceHanSansSC',
  				'sans-serif'
  			]
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.6s ease-out',
  			'slide-down': 'slideDown 0.6s ease-out',
  			glow: 'glow 2s ease-in-out infinite alternate',
  			float: 'float 3s ease-in-out infinite',
  			'grid-flow': 'gridFlow 4s ease-in-out infinite',
  			'border-glow': 'borderGlow 3s ease-in-out infinite alternate'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			slideDown: {
  				'0%': {
  					transform: 'translateY(-20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			glow: {
  				'0%': {
  					boxShadow: '0 0 5px #0099ff'
  				},
  				'100%': {
  					boxShadow: '0 0 20px #0099ff, 0 0 30px #0099ff'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			gridFlow: {
  				'0%, 100%': {
  					opacity: '0.05'
  				},
  				'50%': {
  					opacity: '0.15'
  				}
  			},
  			borderGlow: {
  				'0%': {
  					borderColor: 'rgba(0, 153, 255, 0.1)'
  				},
  				'100%': {
  					borderColor: 'rgba(0, 153, 255, 0.3)'
  				}
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'grid-pattern': 'linear-gradient(rgba(0,153,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,153,255,0.1) 1px, transparent 1px)',
  			'ak-gradient': 'linear-gradient(135deg, #0099ff 0%, #00ccff 100%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
