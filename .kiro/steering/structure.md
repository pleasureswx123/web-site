# Project Structure & Organization

## Directory Structure

```
arknights-clone/
├── .kiro/                     # Kiro IDE configuration
├── public/                    # Static assets (42 official files)
│   ├── audio/                # Background music (bgm.mp3)
│   ├── fonts/                # Official fonts (7 files, ~15MB)
│   ├── images/               # Official images (~25MB)
│   │   ├── backgrounds/      # Main background images
│   │   ├── banners/          # News and event banners
│   │   ├── characters/       # Character artwork and portraits
│   │   ├── icons/            # UI icons and logos
│   │   ├── logos/            # Brand logos
│   │   └── more/             # Additional content images
│   └── videos/               # Video assets
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── globals.css       # Global styles and font definitions
│   │   ├── layout.tsx        # Root layout with metadata
│   │   └── page.tsx          # Main page with section routing
│   ├── components/           # React components
│   │   ├── layout/           # Layout components
│   │   ├── sections/         # Main page sections
│   │   └── ui/               # Reusable UI components
│   ├── data/                 # Static data and content
│   ├── hooks/                # Custom React hooks
│   ├── styles/               # Additional stylesheets
│   └── utils/                # Utility functions
├── scripts/                  # Build and utility scripts
└── [config files]           # Next.js, Tailwind, TypeScript configs
```

## Component Architecture

### Section Components (`src/components/sections/`)
- **ImprovedIndexSection.tsx** - Game introduction and download links
- **ImprovedInformationSection.tsx** - News, announcements, and events
- **OperatorSection.tsx** - Character profiles and switching system
- **WorldSection.tsx** - Game world and lore content
- **MediaSection.tsx** - Multimedia content (music, images, videos)
- **MoreSection.tsx** - Additional features and community links

### Layout Components (`src/components/layout/`)
- **LoadingScreen.tsx** - Initial loading animation
- **Navigation.tsx** - Top navigation bar
- **Footer.tsx** - Site footer
- **OriginalNavigation.tsx** - Pixel-perfect navigation recreation

### UI Components (`src/components/ui/`)
- **BackgroundMusic.tsx** - Audio player with controls
- **CanvasBackground.tsx** - Particle effects and animations
- **ScrollIndicator.tsx** - Page scroll progress indicator

## Naming Conventions

### CSS Classes
- **Original Classes**: Preserved from source website (e.g., `_2a56b767`, `_c629adb0`)
- **Tailwind Classes**: Modern utility classes for responsive design
- **Custom Classes**: Prefixed with `ak-` for Arknights-specific styles

### File Naming
- **Components**: PascalCase (e.g., `ImprovedIndexSection.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Assets**: kebab-case (e.g., `bg-video.mp4`, `character-amiya.png`)

### Component Structure
```tsx
'use client' // Client component directive when needed

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ComponentName() {
  // Hooks and state
  // Event handlers
  // Render logic with original CSS classes
  return (
    <div className="_original_class modern-tailwind-class">
      {/* Component content */}
    </div>
  )
}
```

## Asset Organization

### Images (`/public/images/`)
- **Backgrounds**: Main site backgrounds (desktop/mobile variants)
- **Characters**: High-resolution character artwork
- **Banners**: News and event promotional images
- **Icons**: UI elements and platform icons
- **Logos**: Brand and feature logos

### Fonts (`/public/fonts/`)
- **SourceHanSansSC**: Primary Chinese font (Regular, Bold)
- **Novecentosanswide**: Title font (Medium, Bold)
- **Oswald**: Secondary English font (Medium)
- **Bender**: Accent font (Regular, Bold)

## State Management Patterns

### Local State
- Component-specific state using `useState`
- Form state and UI interactions
- Animation states and transitions

### Global State (Zustand)
- Current section/page state
- Background music state (playing, volume)
- User preferences and settings

### URL State
- Hash-based routing (`#index`, `#information`, etc.)
- Browser history integration
- Deep linking support

## Development Workflow

### File Creation
1. Create component in appropriate directory
2. Use TypeScript with proper typing
3. Follow existing naming conventions
4. Preserve original CSS class structure
5. Add Tailwind utilities for responsive behavior

### Asset Integration
1. Place assets in appropriate `/public` subdirectory
2. Use Next.js Image component for optimization
3. Maintain original file names when possible
4. Optimize for web delivery while preserving quality